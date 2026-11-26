import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import RuangKitaLayout from '@/Layouts/RuangKitaLayout';
import Icon from '@/Components/RuangKita/Icon';
import { useLanguage } from '@/Context/LanguageContext';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

export default function Edit({ mustVerifyEmail, status }) {
    const { t } = useLanguage();
    const user = usePage().props.auth.user;
    const initials = user.name
        .split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0])
        .join('')
        .toUpperCase();

    return (
        <RuangKitaLayout activeTab="profile">
            <Head title={t('profile.title', 'Profil Akun')} />

            <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700 px-6 py-7 text-white shadow-lg shadow-blue-900/10 md:px-8">
                <div className="absolute -right-12 -top-16 h-56 w-56 rounded-full bg-white/10 blur-2xl" />
                <div className="absolute -bottom-20 left-1/3 h-48 w-48 rounded-full bg-indigo-400/20 blur-2xl" />
                <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center">
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/15 text-xl font-extrabold ring-1 ring-white/25 shadow-lg shadow-blue-900/15">
                        {initials}
                    </div>
                    <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                            <h1 className="text-xl font-extrabold tracking-tight md:text-2xl">{user.name}</h1>
                            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-[10px] font-bold text-white/95">
                                <Icon name={user.role === 'admin' ? 'shield' : 'graduation'} className="h-3.5 w-3.5" />
                                {user.role === 'admin' ? t('profile.role_admin', 'Admin Kemahasiswaan') : t('profile.role_user', 'Mahasiswa Vokasi UB')}
                            </span>
                        </div>
                        <p className="mt-1 truncate text-sm text-blue-100">{user.email}</p>
                        <p className="mt-3 max-w-xl text-xs leading-relaxed text-blue-100/90">
                            {t('profile.subtitle', 'Kelola identitas, email terdaftar, dan keamanan akun Anda.')}
                        </p>
                    </div>
                    <div className="inline-flex w-fit items-center gap-2 rounded-xl border border-emerald-300/25 bg-emerald-400/15 px-3 py-2 text-[11px] font-semibold text-emerald-50">
                        <Icon name="checkSmall" className="h-4 w-4" />
                        {user.email_verified_at
                            ? t('profile.account_verified', 'Akun Terverifikasi')
                            : t('profile.unverified_email', 'Email belum terverifikasi')}
                    </div>
                </div>
            </section>

            <div className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1fr)_340px]">
                <div className="space-y-5">
                    <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm md:p-6">
                        <div className="mb-5 flex items-start gap-3 border-b border-slate-100 pb-4">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                                <Icon name="user" className="h-5 w-5" />
                            </div>
                            <div>
                                <h2 className="text-sm font-extrabold text-slate-900">{t('profile.info_title', 'Informasi Profil')}</h2>
                                <p className="mt-1 text-[11px] leading-relaxed text-slate-500">{t('profile.info_desc', 'Perbarui nama lengkap dan alamat email yang terdaftar di RuangKita.')}</p>
                            </div>
                        </div>
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                        />
                    </section>

                    <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm md:p-6">
                        <div className="mb-5 flex items-start gap-3 border-b border-slate-100 pb-4">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                                <Icon name="lock" className="h-5 w-5" />
                            </div>
                            <div>
                                <h2 className="text-sm font-extrabold text-slate-900">{t('profile.password_title', 'Perbarui Kata Sandi')}</h2>
                                <p className="mt-1 text-[11px] leading-relaxed text-slate-500">{t('profile.password_desc', 'Gunakan kata sandi yang kuat dan aman untuk melindungi akun peminjaman Anda.')}</p>
                            </div>
                        </div>
                        <UpdatePasswordForm />
                    </section>
                </div>

                <aside className="space-y-5">
                    <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm md:p-6">
                        <div className="flex items-start gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-rose-50 text-rose-600">
                                <Icon name="alert" className="h-5 w-5" />
                            </div>
                            <div>
                                <h2 className="text-sm font-extrabold text-slate-900">{t('profile.danger_title', 'Hapus Akun')}</h2>
                                <p className="mt-1 text-[11px] leading-relaxed text-slate-500">{t('profile.danger_desc', 'Setelah akun dihapus, seluruh data riwayat dan perizinan akan dihapus secara permanen.')}</p>
                            </div>
                        </div>
                        <div className="mt-5 border-t border-slate-100 pt-4">
                            <DeleteUserForm />
                        </div>
                    </section>

                    <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm md:p-6">
                        <div className="flex items-start gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                                <Icon name="file" className="h-5 w-5" />
                            </div>
                            <div>
                                <h2 className="text-sm font-extrabold text-slate-900">Ketentuan &amp; Privasi</h2>
                                <p className="mt-1 text-[11px] leading-relaxed text-slate-500">
                                    Pelajari syarat penggunaan layanan dan kebijakan privasi pengelolaan data di RuangKita.
                                </p>
                            </div>
                        </div>
                        <div className="mt-4 border-t border-slate-100 pt-4">
                            <Link
                                href={route('terms-privacy')}
                                className="inline-flex w-full items-center justify-between rounded-xl border border-slate-200 bg-slate-50/70 px-3.5 py-2.5 text-xs font-bold text-slate-700 transition-colors hover:border-blue-200 hover:bg-blue-50/60 hover:text-blue-700"
                            >
                                <span>Lihat Syarat &amp; Kebijakan Privasi</span>
                                <Icon name="chevronRight" className="h-4 w-4" />
                            </Link>
                        </div>
                    </section>
                </aside>
            </div>
        </RuangKitaLayout>
    );
}
