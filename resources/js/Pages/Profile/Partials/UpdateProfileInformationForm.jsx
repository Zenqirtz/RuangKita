import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { Link, useForm, usePage } from '@inertiajs/react';
import { useLanguage } from '@/Context/LanguageContext';

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = '',
}) {
    const { t } = useLanguage();
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name,
            email: user.email,
        });

    const submit = (e) => {
        e.preventDefault();

        patch(route('profile.update'));
    };

    return (
        <section className={className}>
            <form onSubmit={submit} className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-xs font-bold text-slate-700">
                        {t('profile.name', 'Nama Lengkap')}
                    </label>

                    <input
                        id="name"
                        type="text"
                        className="mt-1.5 block w-full rounded-xl border border-slate-200 bg-slate-50/60 px-3.5 py-2.5 text-xs font-semibold text-slate-800 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        autoComplete="name"
                    />

                    <InputError className="mt-1.5 text-xs text-rose-500 font-medium" message={errors.name} />
                </div>

                <div>
                    <label htmlFor="email" className="block text-xs font-bold text-slate-700">
                        {t('profile.email', 'Alamat Email (@student.ub.ac.id)')}
                    </label>

                    <input
                        id="email"
                        type="email"
                        className="mt-1.5 block w-full rounded-xl border border-slate-200 bg-slate-50/60 px-3.5 py-2.5 text-xs font-semibold text-slate-800 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        autoComplete="username"
                    />

                    <InputError className="mt-1.5 text-xs text-rose-500 font-medium" message={errors.email} />
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs">
                        <p className="text-amber-800 font-medium">
                            {t('profile.unverified_email', 'Alamat email Anda belum terverifikasi.')}{' '}
                            <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                className="font-bold underline hover:text-amber-950 transition-colors"
                            >
                                {t('profile.resend_verification', 'Kirim ulang email verifikasi')}
                            </Link>
                        </p>

                        {status === 'verification-link-sent' && (
                            <div className="mt-2 text-xs font-bold text-emerald-700">
                                {t('profile.verification_sent', 'Tautan verifikasi baru telah dikirim ke alamat email Anda.')}
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-3 pt-2">
                    <button
                        type="submit"
                        disabled={processing}
                        className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white text-xs font-bold shadow-sm shadow-blue-600/20 transition-all disabled:opacity-50"
                    >
                        {t('profile.save', 'Simpan Perubahan')}
                    </button>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out duration-200"
                        enterFrom="opacity-0 translate-x-1"
                        enterTo="opacity-100 translate-x-0"
                        leave="transition ease-in-out duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-lg">
                            ✓ {t('profile.saved', 'Tersimpan.')}
                        </span>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
