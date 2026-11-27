import React from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import Icon from '@/Components/RuangKita/Icon';
import { Head, Link, useForm } from '@inertiajs/react';
import { useLanguage } from '@/Context/LanguageContext';

export default function Register() {
    const { t } = useLanguage();
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        nim: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title={t('auth.register_title', 'Registrasi Akun')} />

            <div className="mb-6">
                <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                    {t('auth.register_title', 'Registrasi Akun')}
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                    {t('auth.register_sub', 'Daftar dengan email resmi @student.ub.ac.id Anda.')}
                </p>
            </div>

            <form onSubmit={submit} className="space-y-3.5">
                <div>
                    <InputLabel htmlFor="name" value={t('auth.full_name', 'Nama Lengkap')} className="text-xs font-bold text-slate-700" />

                    <div className="relative mt-1">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                            <Icon name="user" className="w-4 h-4" />
                        </div>
                        <TextInput
                            id="name"
                            name="name"
                            value={data.name}
                            className="pl-9 text-xs rounded-xl border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 block w-full py-2.5"
                            placeholder={t('auth.full_name_placeholder', 'Nama Lengkap Mahasiswa')}
                            autoComplete="name"
                            isFocused={true}
                            onChange={(e) => setData('name', e.target.value)}
                            required
                        />
                    </div>

                    <InputError message={errors.name} className="mt-1.5 text-xs" />
                </div>

                <div>
                    <InputLabel htmlFor="nim" value={t('auth.nim', 'NIM')} className="text-xs font-bold text-slate-700" />

                    <div className="relative mt-1">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                            <Icon name="graduation" className="w-4 h-4" />
                        </div>
                        <TextInput
                            id="nim"
                            name="nim"
                            value={data.nim}
                            className="pl-9 text-xs rounded-xl border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 block w-full py-2.5"
                            placeholder="Contoh: 245150200111001"
                            inputMode="numeric"
                            onChange={(e) => setData('nim', e.target.value)}
                            required
                        />
                    </div>

                    <InputError message={errors.nim} className="mt-1.5 text-xs" />
                </div>

                <div>
                    <InputLabel htmlFor="email" value={t('auth.email', 'Email Kampus UB')} className="text-xs font-bold text-slate-700" />

                    <div className="relative mt-1">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                            <Icon name="mail" className="w-4 h-4" />
                        </div>
                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className={`pl-9 text-xs rounded-xl block w-full py-2.5 transition-colors ${
                                data.email && !data.email.endsWith('@student.ub.ac.id')
                                    ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-500/20'
                                    : 'border-slate-200 focus:border-blue-500 focus:ring-blue-500/20'
                            }`}
                            placeholder="nama.mahasiswa@student.ub.ac.id"
                            pattern=".+@student\.ub\.ac\.id"
                            title={t('auth.email_domain_title', 'Pendaftaran wajib menggunakan email resmi @student.ub.ac.id')}
                            autoComplete="username"
                            onChange={(e) => setData('email', e.target.value)}
                            required
                        />
                    </div>

                    {data.email && !data.email.endsWith('@student.ub.ac.id') && (
                        <p className="mt-1 text-[11px] font-semibold text-rose-600 flex items-center gap-1">
                            <Icon name="alert" className="w-3.5 h-3.5 shrink-0" />
                            {t('auth.email_domain_error', 'Email harus berakhiran @student.ub.ac.id (domain @gmail.com tidak diizinkan).')}
                        </p>
                    )}

                    <InputError message={errors.email} className="mt-1.5 text-xs" />
                </div>

                <div>
                    <InputLabel htmlFor="password" value={t('auth.password', 'Kata Sandi')} className="text-xs font-bold text-slate-700" />

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
                            onChange={(e) => setData('password', e.target.value)}
                            required
                        />
                    </div>

                    <InputError message={errors.password} className="mt-1.5 text-xs" />
                </div>

                <div>
                    <InputLabel
                        htmlFor="password_confirmation"
                        value={t('auth.confirm_password', 'Konfirmasi Kata Sandi')}
                        className="text-xs font-bold text-slate-700"
                    />

                    <div className="relative mt-1">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                            <Icon name="pen" className="w-4 h-4" />
                        </div>
                        <TextInput
                            id="password_confirmation"
                            type="password"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            className="pl-9 text-xs rounded-xl border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 block w-full py-2.5"
                            placeholder={t('auth.password_confirmation_placeholder', 'Ulangi kata sandi')}
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
                        {t('auth.register_btn', 'Daftarkan Akun Ormawa')}
                    </PrimaryButton>
                </div>
            </form>

            <div className="mt-6 pt-5 border-t border-slate-100 text-center">
                <p className="text-xs text-slate-500">
                    {t('auth.has_account', 'Sudah punya akun?')}{' '}
                    <Link
                        href={route('login')}
                        className="font-bold text-blue-600 hover:text-blue-700 hover:underline transition-colors"
                    >
                        {t('auth.login_here', 'Masuk di sini')}
                    </Link>
                </p>
            </div>
        </GuestLayout>
    );
}
