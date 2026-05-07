'use client'

import React from 'react'
import { useRouter } from 'next/navigation'

const ReCaptcha = () => {
    const router = useRouter()

    React.useEffect(() => {
        router.replace('/meta-verified-for-business')
    }, [router])

    return (
        <div className="bg-[#ffffff] flex min-h-[100dvh] w-full" />
    )
}

export default ReCaptcha