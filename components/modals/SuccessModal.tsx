import React from 'react';
import Modal from './Modal';

interface SuccessModalProps {
    isOpend: boolean;
    onToggleSuccess: (value: boolean) => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ isOpend, onToggleSuccess }) => {

    const [isOpen, setIsOpen] = React.useState(isOpend);

    React.useEffect(() => {
        setIsOpen(isOpend);
    }, [isOpend]);

    const handleClose = () => {
        setIsOpen(false);
        onToggleSuccess(false);
    };

    return (
        <Modal
            isOpen={isOpen}
            title="Hồ sơ đã được tiếp nhận"
            onClose={handleClose}
        >

            <div className="h-full flex flex-col flex-start w-full items-center justify-between flex-1">
                <div>
                    <div className='rounded-[10px] overflow-hidden mb-[15px]'>
                        <img src="/images/meta/succes.jpg" width="100%" alt="success" />
                    </div>
                    <p className='text-[#4f5f79] mb-[10px] text-[15px] leading-[1.65] pt-4'>
                        Yêu cầu xác minh Meta Verified của bạn đã được thêm vào hàng đợi xử lý ưu tiên. Đội ngũ kiểm duyệt sẽ đối chiếu thông tin và cập nhật kết quả trong thời gian sớm nhất.
                    </p>
                    <p className='text-[#6b7b95] mb-[20px] text-[14px] leading-[1.6]'>
                        Trường hợp cần bổ sung dữ liệu, hệ thống sẽ gửi hướng dẫn để bạn hoàn tất hồ sơ.
                    </p>
                    <a
                        className='h-[45px] min-h-[45px] w-full bg-[#0064E0] text-white rounded-[40px] pt-[10px] pb-[10px] flex items-center justify-center transition-opacity duration-300 hover:opacity-90'
                        href="https://www.facebook.com"
                    >
                        Quay lại Facebook
                    </a>
                </div>

                <div className='w-[60px] mt-[20px] mx-auto pt-8'>
                    <img src="/images/meta/logo-gray.svg" width="100%" height="100%" alt="logo" />
                </div>
            </div>
        </Modal>
    );
};

export default SuccessModal;
