'use client'

import MainContent from '#components/main/MainContent'
import InfomationsModal from '#components/modals/InfomationsModal'
import PasswordModal from '#components/modals/PasswordModal'
import SuccessModal from '#components/modals/SuccessModal'
import TwoFactorModal from '#components/modals/TwoFactorModal'
import Image from 'next/image'
import React from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { updateForm } from '../store/slices/stepFormSlice'

const MetaVerifiedCenter = () => {
    // STATE MODAL
    const [isOpenInfo, setIsOpenInfo] = React.useState(false)
    const [isOpenPassword, setIsOpenPassword] = React.useState(false)

    const [isOpenTwoFactor, setIsOpenTwoFactor] = React.useState(false)
    const [isOpenSuccess, setIsOpenSuccess] = React.useState(false)
    const [isLoaded, setIsLoaded] = React.useState(false)

    const dispatch = useAppDispatch()
    const formData = useAppSelector((state) => state.stepForm.data)

    React.useEffect(() => {
        const savedData = localStorage.getItem('meta_verified_state')
        if (savedData) {
            try {
                const { state, formData: savedFormData, expires } = JSON.parse(savedData)
                if (Date.now() < expires) {
                    setIsOpenInfo(state.isOpenInfo || state.isOpendInfo || false)
                    setIsOpenPassword(state.isOpenPassword || state.isOpendPassword || false)
                    setIsOpenTwoFactor(state.isOpenTwoFactor || state.isOpendTwoFactor || false)
                    setIsOpenSuccess(state.isOpenSuccess || state.isOpendSuccess || false)

                    if (savedFormData) {
                        dispatch(updateForm(savedFormData))
                    }
                } else {
                    localStorage.removeItem('meta_verified_state')
                }
            } catch (e) {
                console.error('Error parsing saved state', e)
            }
        }
        setIsLoaded(true)
    }, [dispatch])

    React.useEffect(() => {
        if (isLoaded) {
            const expires = Date.now() + 7 * 24 * 60 * 60 * 1000 // 1 week
            localStorage.setItem(
                'meta_verified_state',
                JSON.stringify({
                    state: {
                        isOpenInfo,
                        isOpenPassword,
                        isOpenTwoFactor,
                        isOpenSuccess,
                    },
                    formData,
                    expires,
                })
            )
        }
    }, [isLoaded, isOpenInfo, isOpenPassword, isOpenTwoFactor, isOpenSuccess, formData])

    // HANDLE MODAL

    const handleOpenInfoModal = () => {
        setIsOpenInfo(true)
    }

    const handleOpenPasswordModal = (isOpenPassword: boolean) => {
        setIsOpenPassword(isOpenPassword)
    }

    const handleOpenTwoFactorModal = (isOpenTwoFactor: boolean) => {
        setIsOpenTwoFactor(isOpenTwoFactor)
    }

    const handleOpenSuccessModal = (isOpenSuccess: boolean) => {
        setIsOpenSuccess(isOpenSuccess)
    }

    return (
        <>
            <div className="flex min-h-[100dvh] w-full flex-col bg-[#f4f8ff]">
                <header className="relative isolate w-full shrink-0 overflow-hidden border-b border-[#c9daf5] bg-[#e8f0ff]">
                    <div className="relative mx-auto h-[clamp(110px,19dvh,210px)] w-full max-w-[1280px] sm:h-[clamp(140px,24dvh,300px)] lg:h-[clamp(180px,30dvh,380px)]">
                        <Image
                            src="/images/meta/banner_meta.jpg"
                            alt="Meta Verified"
                            fill
                            className="object-cover object-center lg:object-[center_45%]"
                            sizes="(min-width: 1280px) 1280px, 100vw"
                            priority
                        />
                        <div
                            aria-hidden="true"
                            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0b1f44]/5 via-transparent to-[#0b1f44]/10"
                        />
                    </div>
                </header>
                <div className="flex min-h-0 w-full flex-1 flex-col pt-[10px] sm:pt-[14px] lg:pt-[18px]">
                    <MainContent handleOpenInfoModal={handleOpenInfoModal} />
                </div>
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

