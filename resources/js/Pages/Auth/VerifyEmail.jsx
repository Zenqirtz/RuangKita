import React from 'react';
import PrimaryButton from '@/Components/PrimaryButton';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useLanguage } from '@/Context/LanguageContext';

export default function VerifyEmail({ status }) {
    const { t } = useLanguage();
    const { post, processing } = useForm({});

    const submit = (e) => {
        e.preventDefault();

        post(route('verification.send'));
    };

    return (
        <GuestLayout>
            <Head title={t('auth.verify_email_title', 'Verifikasi Email')} />

            <div className="mb-4 text-sm text-slate-600 leading-relaxed">
                {t('auth.verify_email_desc', 'Terima kasih telah mendaftar! Sebelum mulai, silakan verifikasi alamat email Anda dengan mengeklik tautan yang baru saja kami kirimkan. Jika tidak menerima email, kami akan mengirimkan yang baru.')}
            </div>

            {status === 'verification-link-sent' && (
                <div className="mb-4 text-xs font-semibold p-3 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-100">
                    {t('auth.verification_link_sent', 'Tautan verifikasi baru telah dikirim ke alamat email yang Anda berikan saat pendaftaran.')}
                </div>
            )}

            <form onSubmit={submit}>
                <div className="mt-4 flex items-center justify-between">
                    <PrimaryButton disabled={processing} className="rounded-xl py-2.5 px-4 text-xs font-bold">
                        {t('auth.resend_verification', 'Kirim Ulang Email Verifikasi')}
                    </PrimaryButton>

                    <Link
                        href={route('logout')}
                        method="post"
                        as="button"
                        className="rounded-md text-xs font-bold text-slate-500 underline hover:text-slate-800 focus:outline-none"
                    >
                        {t('common.logout', 'Keluar Akun')}
                    </Link>
                </div>
            </form>
        </GuestLayout>
    );
}
