import { useForm } from '@inertiajs/react';
import { useRef, useState } from 'react';
import Modal from '@/Components/Modal';
import InputError from '@/Components/InputError';
import Icon from '@/Components/RuangKita/Icon';
import { useLanguage } from '@/Context/LanguageContext';

export default function DeleteUserForm({ className = '' }) {
    const { t } = useLanguage();
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef();

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
        clearErrors,
    } = useForm({
        password: '',
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser = (e) => {
        e.preventDefault();

        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);

        clearErrors();
        reset();
    };

    return (
        <section className={className}>
            <button
                type="button"
                onClick={confirmUserDeletion}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 active:scale-[0.98] text-white text-xs font-bold shadow-sm shadow-rose-600/20 transition-all"
            >
                <Icon name="alert" className="w-4 h-4" />
                {t('profile.delete_button', 'Hapus Akun')}
            </button>

            <Modal show={confirmingUserDeletion} onClose={closeModal}>
                <form onSubmit={deleteUser} className="p-6 md:p-7">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
                            <Icon name="alert" className="w-5 h-5" />
                        </div>
                        <div>
                            <h2 className="text-sm font-extrabold text-slate-900">
                                {t('profile.delete_modal_title', 'Konfirmasi Penghapusan Akun')}
                            </h2>
                            <p className="text-[11px] text-slate-400 mt-0.5">
                                {t('profile.delete_button', 'Hapus Akun')}
                            </p>
                        </div>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">
                        {t('profile.delete_modal_desc', 'Tindakan ini tidak dapat dibatalkan. Masukkan kata sandi akun Anda untuk konfirmasi penghapusan permanen.')}
                    </p>

                    <div className="mt-4">
                        <label htmlFor="password" className="sr-only">
                            Password
                        </label>

                        <input
                            id="password"
                            type="password"
                            name="password"
                            ref={passwordInput}
                            value={data.password}
                            onChange={(e) =>
                                setData('password', e.target.value)
                            }
                            className="block w-full rounded-xl border border-slate-200 bg-slate-50/60 px-3.5 py-2.5 text-xs font-semibold text-slate-800 placeholder:text-slate-400 focus:border-rose-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-500/20 transition-all"
                            isFocused
                            placeholder="Password"
                        />

                        <InputError
                            message={errors.password}
                            className="mt-1.5 text-xs text-rose-500 font-medium"
                        />
                    </div>

                    <div className="mt-6 flex justify-end gap-2.5">
                        <button
                            type="button"
                            onClick={closeModal}
                            className="px-4 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 text-xs font-bold transition-colors"
                        >
                            {t('profile.cancel', 'Batal')}
                        </button>

                        <button
                            type="submit"
                            disabled={processing}
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-sm shadow-rose-600/20 transition-all disabled:opacity-50"
                        >
                            {t('profile.delete_button', 'Hapus Akun')}
                        </button>
                    </div>
                </form>
            </Modal>
        </section>
    );
}
