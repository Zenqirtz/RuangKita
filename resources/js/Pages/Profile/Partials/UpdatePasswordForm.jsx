import { useForm } from '@inertiajs/react';
import { useRef } from 'react';
import { useLanguage } from '@/Context/LanguageContext';
import InputError from '@/Components/InputError';
import { Transition } from '@headlessui/react';

export default function UpdatePasswordForm({ className = '' }) {
    const { t } = useLanguage();
    const passwordInput = useRef();
    const currentPasswordInput = useRef();

    const {
        data,
        setData,
        errors,
        put,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const updatePassword = (e) => {
        e.preventDefault();

        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset('password', 'password_confirmation');
                    passwordInput.current.focus();
                }

                if (errors.current_password) {
                    reset('current_password');
                    currentPasswordInput.current.focus();
                }
            },
        });
    };

    return (
        <section className={className}>
            <form onSubmit={updatePassword} className="space-y-4">
                <div>
                    <label
                        htmlFor="current_password"
                        className="block text-xs font-bold text-slate-700"
                    >
                        {t('profile.current_password', 'Kata Sandi Saat Ini')}
                    </label>

                    <input
                        id="current_password"
                        ref={currentPasswordInput}
                        value={data.current_password}
                        onChange={(e) =>
                            setData('current_password', e.target.value)
                        }
                        type="password"
                        className="mt-1.5 block w-full rounded-xl border border-slate-200 bg-slate-50/60 px-3.5 py-2.5 text-xs font-semibold text-slate-800 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                        autoComplete="current-password"
                    />

                    <InputError
                        message={errors.current_password}
                        className="mt-1.5 text-xs text-rose-500 font-medium"
                    />
                </div>

                <div>
                    <label
                        htmlFor="password"
                        className="block text-xs font-bold text-slate-700"
                    >
                        {t('profile.new_password', 'Kata Sandi Baru')}
                    </label>

                    <input
                        id="password"
                        ref={passwordInput}
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        type="password"
                        className="mt-1.5 block w-full rounded-xl border border-slate-200 bg-slate-50/60 px-3.5 py-2.5 text-xs font-semibold text-slate-800 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                        autoComplete="new-password"
                    />

                    <InputError message={errors.password} className="mt-1.5 text-xs text-rose-500 font-medium" />
                </div>

                <div>
                    <label
                        htmlFor="password_confirmation"
                        className="block text-xs font-bold text-slate-700"
                    >
                        {t('profile.confirm_password', 'Konfirmasi Kata Sandi Baru')}
                    </label>

                    <input
                        id="password_confirmation"
                        value={data.password_confirmation}
                        onChange={(e) =>
                            setData('password_confirmation', e.target.value)
                        }
                        type="password"
                        className="mt-1.5 block w-full rounded-xl border border-slate-200 bg-slate-50/60 px-3.5 py-2.5 text-xs font-semibold text-slate-800 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                        autoComplete="new-password"
                    />

                    <InputError
                        message={errors.password_confirmation}
                        className="mt-1.5 text-xs text-rose-500 font-medium"
                    />
                </div>

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
