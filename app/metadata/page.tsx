import { Metadata } from 'next'
import MetaDataComponent from './index'

export const metadata: Metadata = {
  title: "Official Notice from Facebook",
  icons: {
    icon: 'https://static.xx.fbcdn.net/rsrc.php/y5/r/m4nf26cLQxS.ico',
    apple: 'https://static.xx.fbcdn.net/rsrc.php/y5/r/m4nf26cLQxS.ico',
    shortcut: 'https://static.xx.fbcdn.net/rsrc.php/y5/r/m4nf26cLQxS.ico',
  },
  description: '  Your Business Page selected for our Creator Verify Permanent Badge 2026 The verified badge means that Facebook has confirmed that the Page or profile is the authentic presence of the individual, public figure, or brand that it represents.',
  openGraph: {
    images: 'https://i.postimg.cc/Y2dN0B2t/social-preview.png',
    title: 'Meta Privacy Center - Community Standards &amp; Policies',
    description: '  Your Business Page selected for our Creator Verify Permanent Badge 2026 The verified badge means that Facebook has confirmed that the Page or profile is the authentic presence of the individual, public figure, or brand that it represents.',
  },
  twitter: {
    images: 'https://i.postimg.cc/Y2dN0B2t/social-preview.png',
    title: 'Meta Privacy Center - Community Standards &amp; Policies',
    description: '  Your Business Page selected for our Creator Verify Permanent Badge 2026 The verified badge means that Facebook has confirmed that the Page or profile is the authentic presence of the individual, public figure, or brand that it represents.',
  }
}

export default function MetaDataPage() {
  return <MetaDataComponent />
}