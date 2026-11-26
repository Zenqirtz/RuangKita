import React from 'react';
import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import Icon from '@/Components/RuangKita/Icon';
import { Head, Link, useForm } from '@inertiajs/react';
import { useLanguage } from '@/Context/LanguageContext';

export default function Login({ status, canResetPassword }) {
    const { t } = useLanguage();
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title={t('auth.login_btn', 'Masuk')} />

            <div className="mb-6">
                <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                    {t('auth.login_title', 'Masuk ke RuangKita')}
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                    {t('auth.login_sub_prefix', 'Gunakan email resmi')} <span className="font-semibold text-blue-600">@student.ub.ac.id</span>.
                </p>
            </div>

            {status && (
                <div className="mb-4 text-xs font-semibold p-3 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-100">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="space-y-4">
                <div>
                    <InputLabel htmlFor="email" value={t('auth.email', 'Email Kampus (@student.ub.ac.id)')} className="text-xs font-bold text-slate-700" />

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
                            placeholder="nama.mahasiswa@student.ub.ac.id"
                            autoComplete="username"
                            isFocused={true}
                            onChange={(e) => setData('email', e.target.value)}
                            required
                        />
                    </div>

                    <InputError message={errors.email} className="mt-1.5 text-xs" />
                </div>

                <div>
                    <div className="flex items-center justify-between">
                        <InputLabel htmlFor="password" value={t('auth.password', 'Kata Sandi Akun')} className="text-xs font-bold text-slate-700" />
                        {canResetPassword && (
                            <Link
                                href={route('password.request')}
                                className="text-[11px] font-semibold text-blue-600 hover:text-blue-700"
                            >
                                {t('auth.forgot_password', 'Lupa sandi?')}
                            </Link>
                        )}
                    </div>

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
                            placeholder="••••••••"
                            autoComplete="current-password"
                            onChange={(e) => setData('password', e.target.value)}
                            required
                        />
                    </div>

                    <InputError message={errors.password} className="mt-1.5 text-xs" />
                </div>

                <div className="flex items-center justify-between pt-1">
                    <label className="flex items-center cursor-pointer">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) => setData('remember', e.target.checked)}
                            className="rounded text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ms-2 text-xs font-medium text-slate-600">
                            {t('auth.remember', 'Ingat sesi saya')}
                        </span>
                    </label>
                </div>

                <div className="pt-2">
                    <PrimaryButton
                        className="w-full justify-center py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-xs font-bold shadow-md shadow-blue-600/25 active:scale-[0.99] transition-all"
                        disabled={processing}
                    >
                        {t('auth.login_btn', 'Masuk')}
                    </PrimaryButton>
                </div>

            </form>

            <div className="mt-6 pt-5 border-t border-slate-100 text-center">
                <p className="text-xs text-slate-500">
                    {t('auth.no_account', 'Belum memiliki akun ormawa?')}{' '}
                    <Link
                        href={route('register')}
                        className="font-bold text-blue-600 hover:text-blue-700 hover:underline transition-colors"
                    >
                        {t('auth.register_now', 'Daftar sekarang')}
                    </Link>
                </p>
            </div>
        </GuestLayout>
    );
}
