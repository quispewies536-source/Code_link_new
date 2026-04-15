"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

import { useAppStrings } from "@/hooks/useAppStrings";

interface ModalProps {
    isOpen?: boolean;
    title?: string;
    children?: React.ReactNode;
    onClose?: () => void;
    isClosable?: boolean | false;
    heightFull?: boolean | false;
}

const Modal: React.FC<ModalProps> = ({ isOpen, title, children, onClose, isClosable = true, heightFull }) => {
    const t = useAppStrings();
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    key="modal-backdrop"
                    className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 pb-[env(safe-area-inset-bottom)] pt-[max(1.25rem,env(safe-area-inset-top))] sm:items-center sm:py-[40px] sm:pb-0 sm:pt-0 modal-backdrop"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        key="modal-content"
                        className={`bg-[linear-gradient(130deg,_rgba(249,241,249,1)_0%,_rgba(234,243,253,1)_35%,_rgba(237,251,242,1)_100%)] w-full max-w-lg max-h-[min(90dvh,calc(100dvh-env(safe-area-inset-top)-env(safe-area-inset-bottom)-1.5rem))] sm:max-h-[min(92dvh,100%)] ${heightFull ? 'h-full' : ''} ml-[max(1rem,env(safe-area-inset-left))] mr-[max(1rem,env(safe-area-inset-right))] sm:mx-auto shadow-lg px-[18px] py-[18px] sm:px-[20px] sm:py-[20px] rounded-t-[20px] rounded-b-none sm:rounded-[16px] flex flex-col overflow-hidden`}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.15 }}
                    >
                        {/* Header */}
                        <div className={`flex items-center justify-between ${isClosable && title ? 'mb-[10px]' : 'pb-[0px]'}`}>
                            {title ? (
                                                               <h2 className="min-w-0 flex-1 pr-2 text-left text-[14px] font-bold leading-snug text-[#0A1317] sm:text-[15px] break-words">{title}</h2>
                            ) : (<div className="w-full"></div>)}

                            {isClosable ? (
                                <button
                                    type="button"
                                    onClick={onClose}
                                    aria-label={t.common.close}
                                    className="flex h-[18px] w-[18px] shrink-0 cursor-pointer items-center justify-center rounded-sm border-0 bg-transparent p-0 opacity-60 transition-opacity duration-200 hover:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1877F2]"
                                >
                                    <img src="/images/icons/ic_close.svg" className="h-[18px] w-[18px] pointer-events-none" alt="" aria-hidden />
                                </button>
                            ) : null}
                        </div>

                        <div className="flex-1 overflow-y-auto">{children}</div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Modal;
