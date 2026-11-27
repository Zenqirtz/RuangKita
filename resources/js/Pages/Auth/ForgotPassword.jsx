import React from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import Icon from '@/Components/RuangKita/Icon';
import { Head, Link, useForm } from '@inertiajs/react';
import { useLanguage } from '@/Context/LanguageContext';

export default function ForgotPassword({ status }) {
    const { t } = useLanguage();
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <GuestLayout>
            <Head title={t('auth.forgot_password_title', 'Lupa Kata Sandi')} />

            <div className="mb-6">
                <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                    {t('auth.forgot_password_title', 'Lupa Kata Sandi')}
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                    {t('auth.forgot_password_desc', 'Masukkan email akun Anda. Kami akan mengirimkan tautan reset kata sandi jika email terdaftar.')}
                </p>
            </div>

            {status && (
                <div className="mb-4 text-xs font-semibold p-3 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-100">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="space-y-4">
                <div>
                    <InputLabel htmlFor="email" value={t('auth.registered_email_label', 'Email Terdaftar')} className="text-xs font-bold text-slate-700" />

                    <div className="relative mt-1">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                            <Icon name="mail" className="w-4 h-4" />
                        </div>
                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="pl-9 text-xs rounded-xl border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 block w-full py-2.5"
                            placeholder={t('auth.registered_email_placeholder', 'nama@student.ub.ac.id atau email admin')}
                            isFocused={true}
                            onChange={(e) => setData('email', e.target.value)}
                            required
                        />
                    </div>

                    <InputError message={errors.email} className="mt-1.5 text-xs" />
                </div>

                <div className="pt-2">
                    <PrimaryButton
                        className="w-full justify-center py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-xs font-bold shadow-md shadow-blue-600/25 active:scale-[0.99] transition-all"
                        disabled={processing}
                    >
                        {t('auth.send_reset_link', 'Kirim Tautan Reset Sandi')}
                    </PrimaryButton>
                </div>
            </form>

            <div className="mt-6 pt-5 border-t border-slate-100 text-center">
                <Link
                    href={route('login')}
                    className="text-xs font-bold text-blue-600 hover:text-blue-700"
                >
                    {t('auth.back_to_login', 'Kembali ke Halaman Masuk')}
                </Link>
            </div>
        </GuestLayout>
    );
}
