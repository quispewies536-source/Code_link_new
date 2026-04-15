import Link from 'next/link';
import {
    ArrowUpRight,
    Database,
    FileClock,
    Lock,
    MessageSquare,
    ShieldCheck,
    UserRoundCheck
} from 'lucide-react';

const sections = [
    {
        title: 'Thong tin chung ve xu ly du lieu',
        icon: ShieldCheck,
        points: [
            'Du lieu ca nhan duoc xu ly theo nguyen tac minh bach, gioi han muc dich va toi thieu hoa du lieu.',
            'He thong uu tien bao mat theo thiet ke (privacy by design) va bao mat theo mac dinh (privacy by default).',
            'Chinh sach duoc cap nhat dinh ky de phu hop voi yeu cau phap ly va chuan van hanh hien hanh.'
        ]
    },
    {
        title: 'Du lieu chung toi co the thu thap',
        icon: Database,
        points: [
            'Thong tin tai khoan va lien he: ten, email, thong tin xac thuc tai khoan.',
            'Du lieu ky thuat: dia chi IP, thong tin trinh duyet, thiet bi, nhat ky he thong.',
            'Du lieu tuong tac dich vu: cac hanh dong su dung tinh nang, cau hinh nguoi dung, thong tin phan hoi.'
        ]
    },
    {
        title: 'Muc dich su dung du lieu',
        icon: UserRoundCheck,
        points: [
            'Cung cap, van hanh va cai tien chat luong dich vu.',
            'Bao ve tai khoan, phat hien hanh vi gian lan va giam sat rui ro bao mat.',
            'Dap ung nghia vu phap ly, giai quyet khieu nai va ho tro nguoi dung.'
        ]
    },
    {
        title: 'Bao mat va luu tru du lieu',
        icon: Lock,
        points: [
            'Du lieu duoc ma hoa khi truyen tai va co the duoc ma hoa khi luu tru tuy theo nhom du lieu.',
            'Kiem soat truy cap duoc ap dung theo vai tro va nguyen tac it quyen nhat.',
            'Thoi gian luu tru du lieu duoc xac dinh theo muc dich xu ly va nghia vu phap ly.'
        ]
    },
    {
        title: 'Chia se du lieu voi ben thu ba',
        icon: FileClock,
        points: [
            'Chi chia se trong pham vi can thiet voi nha cung cap dich vu, doi tac ky thuat hoac co quan co tham quyen.',
            'Moi ben nhan du lieu deu phai tuan thu cac cam ket bao mat va quy dinh ve xu ly du lieu.',
            'Khong ban du lieu ca nhan cho ben thu ba vi muc dich thuong mai khong lien quan.'
        ]
    }
];

const faqs = [
    {
        question: 'Lam sao de yeu cau truy cap hoac xoa du lieu ca nhan?',
        answer:
            'Ban co the gui yeu cau qua trang ho tro du lieu hoac lien he bo phan ho tro. Chung toi se xac minh danh tinh va phan hoi trong thoi han theo quy dinh phap ly.'
    },
    {
        question: 'Du lieu duoc luu trong bao lau?',
        answer:
            'Thoi gian luu tru phu thuoc vao loai du lieu, muc dich xu ly va yeu cau tuan thu. Khi khong con can thiet, du lieu se duoc xoa hoac an danh hoa an toan.'
    },
    {
        question: 'Neu co su co bao mat, nguoi dung co duoc thong bao khong?',
        answer:
            'Co. Neu su co anh huong den du lieu ca nhan, chung toi se thong bao theo quy trinh ung pho su co va theo yeu cau cua phap luat hien hanh.'
    },
    {
        question: 'Toi co the dieu chinh tuy chon quyen rieng tu o dau?',
        answer:
            'Ban co the cap nhat trong trang cai dat tai khoan va trung tam quyen rieng tu. Cac tuy chon bao gom quyen truy cap, sua, han che xu ly va quan ly thong bao.'
    }
];

const supportLinks = [
    {
        label: 'Privacy Policy',
        href: 'https://www.facebook.com/privacy/policy'
    },
    {
        label: 'Help Center',
        href: 'https://www.facebook.com/help'
    },
    {
        label: 'GDPR Information',
        href: 'https://commission.europa.eu/law/law-topic/data-protection_en'
    },
    {
        label: 'CCPA Overview',
        href: 'https://oag.ca.gov/privacy/ccpa'
    }
];

const PrivacyCenter = () => {
    return (
        <main className="min-h-screen bg-slate-50 text-slate-800">
            <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
                <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                    <div className="bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 px-6 py-10 text-white sm:px-10">
                        <p className="mb-3 inline-flex items-center rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide">
                            Privacy Center
                        </p>
                        <h1 className="text-3xl font-bold leading-tight sm:text-4xl">
                            Trung tam quyen rieng tu va bao mat du lieu
                        </h1>
                        <p className="mt-4 max-w-3xl text-sm text-blue-50 sm:text-base">
                            Trang nay tong hop thong tin quan trong ve cach du lieu ca
                            nhan duoc thu thap, xu ly, bao ve va quyen cua nguoi dung.
                            Muc tieu la giup ban de dang tim thay thong tin can thiet va
                            ra quyet dinh minh bach.
                        </p>
                    </div>

                    <div className="px-6 py-8 sm:px-10">
                        <div className="grid gap-5 md:grid-cols-2">
                            {sections.map((section) => {
                                const Icon = section.icon;
                                return (
                                    <article
                                        key={section.title}
                                        className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md"
                                    >
                                        <div className="mb-4 flex items-center gap-3">
                                            <span className="rounded-xl bg-blue-50 p-2 text-blue-600">
                                                <Icon size={20} />
                                            </span>
                                            <h2 className="text-lg font-semibold text-slate-900">
                                                {section.title}
                                            </h2>
                                        </div>
                                        <ul className="list-disc space-y-2 pl-5 text-sm leading-6 text-slate-700">
                                            {section.points.map((point) => (
                                                <li key={point}>{point}</li>
                                            ))}
                                        </ul>
                                    </article>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-6xl px-4 pb-8 sm:px-6 lg:px-8">
                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                    <div className="mb-6 flex items-center gap-3">
                        <span className="rounded-xl bg-emerald-50 p-2 text-emerald-600">
                            <MessageSquare size={20} />
                        </span>
                        <h2 className="text-2xl font-bold text-slate-900">
                            Cau hoi thuong gap (FAQ)
                        </h2>
                    </div>

                    <div className="space-y-3">
                        {faqs.map((item) => (
                            <details
                                key={item.question}
                                className="group rounded-xl border border-slate-200 bg-slate-50 p-4"
                            >
                                <summary className="cursor-pointer list-none font-medium text-slate-900">
                                    {item.question}
                                </summary>
                                <p className="mt-3 text-sm leading-6 text-slate-700">
                                    {item.answer}
                                </p>
                            </details>
                        ))}
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-6xl px-4 pb-12 sm:px-6 lg:px-8">
                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                    <h2 className="text-2xl font-bold text-slate-900">
                        Tai lieu ho tro va lien ket tham khao
                    </h2>
                    <p className="mt-2 text-sm text-slate-600">
                        Cac lien ket duoi day dan den tai lieu ho tro va thong tin chinh
                        sach de ban tim hieu them.
                    </p>

                    <div className="mt-5 grid gap-3 sm:grid-cols-2">
                        {supportLinks.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
                            >
                                <span>{item.label}</span>
                                <ArrowUpRight size={16} />
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
};

export default PrivacyCenter;