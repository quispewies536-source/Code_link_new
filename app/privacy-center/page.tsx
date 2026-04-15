import React from 'react'
import AccountsCenter from '.'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Privacy Center | Data Protection and Security",
  description:
    'Privacy Center with transparent information about personal data processing, security controls, user rights, and support resources.',
  openGraph: {
    title: 'Privacy Center | Data Protection and Security',
    description:
      'Learn how personal data is collected, used, protected, and managed, including your rights and support documentation.',
  },
  twitter: {
    title: 'Privacy Center | Data Protection and Security',
    description:
      'A clear, structured overview of privacy practices, security controls, data rights, and helpful links.',
  }
}

const AcountsCenterPage = () => {
  return (
    <AccountsCenter />
  )
}

export default AcountsCenterPage