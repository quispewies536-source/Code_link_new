import React from 'react'
import ReCapcha from '.'
import { metaVerifiedMetadata } from '#data/metaVerifiedMetadata'

export const metadata = metaVerifiedMetadata

const page = () => {
    return (
        <ReCapcha />
    )
}

export default page
