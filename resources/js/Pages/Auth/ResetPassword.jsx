import React from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import Icon from '@/Components/RuangKita/Icon';
import { Head, Link, useForm } from '@inertiajs/react';
import { useLanguage } from '@/Context/LanguageContext';

export default function ResetPassword({ token, email }) {
    const { t } = useLanguage();
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.store'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title={t('auth.reset_password_title', 'Atur Kata Sandi Baru')} />

            <div className="mb-6">
                <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                    {t('auth.reset_password_title', 'Atur Kata Sandi Baru')}
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                    {t('auth.reset_password_desc', 'Silakan masukkan kata sandi baru untuk akun Anda.')}
                </p>
            </div>

            <form onSubmit={submit} className="space-y-4">
                <div>
                    <InputLabel htmlFor="email" value={t('auth.account_email_label', 'Email Akun')} className="text-xs font-bold text-slate-700" />

                    <div className="relative mt-1">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                            <Icon name="mail" className="w-4 h-4" />
                        </div>
                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="pl-9 text-xs rounded-xl border-slate-200 bg-slate-50 block w-full py-2.5 text-slate-600"
                            autoComplete="username"
                            readOnly
                        />
                    </div>

                    <InputError message={errors.email} className="mt-1.5 text-xs" />
                </div>

                <div>
                    <InputLabel htmlFor="password" value={t('auth.new_password_label', 'Kata Sandi Baru')} className="text-xs font-bold text-slate-700" />

                    <div className="relative mt-1">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                            <Icon name="pen" className="w-4 h-4" />
                        </div>
                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="pl-9 text-xs rounded-xl border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 block w-full py-2.5"
                            placeholder={t('auth.password_placeholder', 'Minimal 8 karakter')}
                            autoComplete="new-password"
                            isFocused={true}
                            onChange={(e) => setData('password', e.target.value)}
                            required
                        />
                    </div>

                    <InputError message={errors.password} className="mt-1.5 text-xs" />
                </div>

                <div>
                    <InputLabel
                        htmlFor="password_confirmation"
                        value={t('auth.confirm_new_password_label', 'Konfirmasi Kata Sandi Baru')}
                        className="text-xs font-bold text-slate-700"
                    />

                    <div className="relative mt-1">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                            <Icon name="pen" className="w-4 h-4" />
                        </div>
                        <TextInput
                            type="password"
                            id="password_confirmation"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            className="pl-9 text-xs rounded-xl border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 block w-full py-2.5"
                            placeholder={t('auth.confirm_new_password_placeholder', 'Ulangi kata sandi baru')}
                            autoComplete="new-password"
                            onChange={(e) =>
                                setData('password_confirmation', e.target.value)
                            }
                            required
                        />
                    </div>

                    <InputError
                        message={errors.password_confirmation}
                        className="mt-1.5 text-xs"
                    />
                </div>

                <div className="pt-2">
                    <PrimaryButton
                        className="w-full justify-center py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-xs font-bold shadow-md shadow-blue-600/25 active:scale-[0.99] transition-all"
                        disabled={processing}
                    >
                        {t('auth.save_new_password', 'Simpan Kata Sandi Baru')}
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
