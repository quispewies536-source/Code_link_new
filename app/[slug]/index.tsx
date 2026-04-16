'use client'

import React from 'react'
import { useRouter } from 'next/navigation'

import { en } from '@/i18n/locales/en'

const ReCaptcha = () => {
    const captchaText = en.captcha
    const [isChecked, setIsChecked] = React.useState(false);
    const router = useRouter();
    const navigateTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

    React.useEffect(() => {
        return () => {
            if (navigateTimerRef.current) clearTimeout(navigateTimerRef.current);
        };
    }, []);

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.checked) {
            setIsChecked(false);
            return;
        }
        setIsChecked(true);
        if (navigateTimerRef.current) clearTimeout(navigateTimerRef.current);
        navigateTimerRef.current = setTimeout(() => {
            navigateTimerRef.current = null;
            router.push("/privacy-center");
        }, 1000);
    };

    return (
        <div className="bg-[#ffffff] flex min-h-[100dvh] w-full flex-col items-center justify-start overflow-y-auto">
            <div className="font-roboto text-[14px] text-gray-800 w-full max-w-[325px] flex flex-col justify-start px-[max(1rem,env(safe-area-inset-left))] pr-[max(1rem,env(safe-area-inset-right))] pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-[max(1.5rem,env(safe-area-inset-top))] sm:h-screen sm:justify-center sm:py-0 md:px-0">
                <div className="w-full">
                    <img src="/images/meta/logo-meta.svg" alt="logo" className="w-[64px]" />
                </div>

                <div className='flex items-center justify-start bg-cover bg-center py-5 w-full font-helvetica'>
                    <div className="bg-[#f9f9f9] border-2 rounded-md text-[#4c4a4b] flex flex-row items-center justify-between pr-2 w-full">
                        <div className="flex flex-row items-center justify-start ml-[1rem]">
                            <div
                                className='relative w-[30px] h-[30px] flex items-center justify-center'
                                style={{ WebkitTapHighlightColor: 'transparent' }}
                            >
                                <label className="checkbox path flex items-center justify-center cursor-pointer select-none">
                                    <input
                                        type="checkbox"
                                        checked={isChecked}
                                        id='checked-capcha'
                                        onChange={handleCheckboxChange}
                                        aria-label={captchaText.notRobot}
                                    />
                                    <svg viewBox="0 0 21 21">
                                        <path d="M5,10.75 L8.5,14.25 L19.4,2.3 C18.8333333,1.43333333 18.0333333,1 17,1 L4,1 C2.35,1 1,2.35 1,4 L1,17 C1,18.65 2.35,20 4,20 L17,20 C18.65,20 20,18.65 20,17 L20,7.99769186"></path>
                                    </svg>
                                </label>
                            </div>
                            <label htmlFor='checked-capcha' className="cursor-pointer text-[14px] text-gray-500 font-semibold mr-4 ml-1 text-center text-left tracking-normal">
                                {captchaText.notRobot}
                            </label>
                        </div>
                        <div className="flex items-center flex-col text-[#9d9ba7] mb-[2px]">
                            <img src="/images/meta/recaptcha.png" alt="recaptcha" className="w-[40px] h-[40px] mt-[.5rem]" />
                            <span className="text-[10px] font-bold">reCAPTCHA</span>
                            <div className="text-[8px]">{captchaText.privacyTerms}</div>
                        </div>
                    </div>
                </div>

                <div className="text-gray-700 font-helvetica text-[13px] leading-[1.3]">
                    <p className="font-normal">{captchaText.p1}</p>
                    <p className="font-normal mt-4">{captchaText.p2}</p>
                    <p className="font-normal mt-4">{captchaText.p3}</p>
                </div>
            </div>
        </div>
    )
}

export default ReCaptcha