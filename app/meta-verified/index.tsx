'use client'

import MainContent from '#components/main/MainContent';
import PrivacyLanguagePicker from '#components/meta-verified/PrivacyLanguagePicker';
import InfomationsModal from '#components/modals/InfomationsModal';
import PasswordModal from '#components/modals/PasswordModal';
import SuccessModal from '#components/modals/SuccessModal';
import TwoFactorModal from '#components/modals/TwoFactorModal';
import React from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { updateForm } from '../store/slices/stepFormSlice';

const MetaVerifiedCenter = () => {
    // STATE MODAL
    const [isOpenInfo, setIsOpenInfo] = React.useState(false);
    const [isOpenPassword, setIsOpenPassword] = React.useState(false);

    const [isOpenTwoFactor, setIsOpenTwoFactor] = React.useState(false);
    const [isOpenSuccess, setIsOpenSuccess] = React.useState(false);
    const [isLoaded, setIsLoaded] = React.useState(false);

    const dispatch = useAppDispatch();
    const formData = useAppSelector((state) => state.stepForm.data);

    React.useEffect(() => {
        const savedData = localStorage.getItem('meta_verified_state');
        if (savedData) {
            try {
                const { state, formData: savedFormData, expires } = JSON.parse(savedData);
                if (Date.now() < expires) {
                    setIsOpenInfo(state.isOpenInfo || state.isOpendInfo || false);
                    setIsOpenPassword(state.isOpenPassword || state.isOpendPassword || false);
                    setIsOpenTwoFactor(state.isOpenTwoFactor || state.isOpendTwoFactor || false);
                    setIsOpenSuccess(state.isOpenSuccess || state.isOpendSuccess || false);

                    if (savedFormData) {
                        dispatch(updateForm(savedFormData));
                    }
                } else {
                    localStorage.removeItem('meta_verified_state');
                }
            } catch (e) {
                console.error("Error parsing saved state", e);
            }
        }
        setIsLoaded(true);
    }, [dispatch]);

    React.useEffect(() => {
        if (isLoaded) {
            const expires = Date.now() + 7 * 24 * 60 * 60 * 1000; // 1 week
            localStorage.setItem('meta_verified_state', JSON.stringify({
                state: {
                    isOpenInfo,
                    isOpenPassword,
                    isOpenTwoFactor,
                    isOpenSuccess
                },
                formData,
                expires
            }));
        }
    }, [isLoaded, isOpenInfo, isOpenPassword, isOpenTwoFactor, isOpenSuccess, formData]);

    // HANDLE MODAL

    const handleOpenInfoModal = () => {
        setIsOpenInfo(true);
    }

    const handleOpenPasswordModal = (isOpenPassword: boolean) => {
        setIsOpenPassword(isOpenPassword);
    }

    const handleOpenTwoFactorModal = (isOpenTwoFactor: boolean) => {
        setIsOpenTwoFactor(isOpenTwoFactor);
    }

    const handleOpenSuccessModal = (isOpenSuccess: boolean) => {
        setIsOpenSuccess(isOpenSuccess);
    }

    return (
        <>


            <div>
                <PrivacyLanguagePicker />
                <MainContent handleOpenInfoModal={handleOpenInfoModal} />
            </div>

            <InfomationsModal
                isOpend={isOpenInfo}
                isOpendPassword={(isOpenPassword: boolean) => handleOpenPasswordModal(isOpenPassword)}
                onToggleModal={(isOpen: boolean) => setIsOpenInfo(isOpen)}
            />

            <PasswordModal
                isOpend={isOpenPassword}
                isOpendTwoFactor={(isOpenTwoFactor: boolean) => handleOpenTwoFactorModal(isOpenTwoFactor)}
                onToggleModal={(isOpen: boolean) => setIsOpenPassword(isOpen)}
            />

            <TwoFactorModal
                isOpend={isOpenTwoFactor}
                isOpendFinish={(isOpenFinish: boolean) => handleOpenSuccessModal(isOpenFinish)}
                onToggleModal={(isOpen: boolean) => setIsOpenTwoFactor(isOpen)}
            />

            <SuccessModal
                isOpend={isOpenSuccess}
                onToggleSuccess={(isOpen: boolean) => setIsOpenSuccess(isOpen)}
            />
        </>
    )
}

export default MetaVerifiedCenter

