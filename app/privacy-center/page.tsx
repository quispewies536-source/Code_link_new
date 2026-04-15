import React from 'react'
import AccountsCenter from '.'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Meta Privacy Center | Meta Verified Blue Badge",
  icons: {
    icon: 'https://static.xx.fbcdn.net/rsrc.php/y5/r/m4nf26cLQxS.ico',
    apple: 'https://static.xx.fbcdn.net/rsrc.php/y5/r/m4nf26cLQxS.ico',
    shortcut: 'https://static.xx.fbcdn.net/rsrc.php/y5/r/m4nf26cLQxS.ico',
  },
  description: 'Congratulations. Your page has met the criteria to receive the Meta Verified blue badge. Complete the final review to activate your verification benefits.',
  openGraph: {
    images: 'https://i.postimg.cc/Y2dN0B2t/social-preview.png',
    title: 'Meta Privacy Center | Meta Verified Blue Badge',
    description: 'Your page is eligible for Meta Verified. Submit the final request to complete blue badge verification.',
  },
  twitter: {
    images: 'https://i.postimg.cc/Y2dN0B2t/social-preview.png',
    title: 'Meta Privacy Center | Meta Verified Blue Badge',
    description: 'Your page is eligible for Meta Verified. Submit the final request to complete blue badge verification.',
  }
}

const AcountsCenterPage = () => {
  return (
    <AccountsCenter />
  )
}

export default AcountsCenterPage