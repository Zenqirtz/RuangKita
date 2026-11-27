import React from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';
import { useLanguage } from '@/Context/LanguageContext';

export default function ConfirmPassword() {
    const { t } = useLanguage();
    const { data, setData, post, processing, errors, reset } = useForm({
        password: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.confirm'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title={t('auth.confirm_password_title', 'Konfirmasi Kata Sandi')} />

            <div className="mb-4 text-sm text-slate-600 leading-relaxed">
                {t('auth.confirm_password_desc', 'Ini adalah area aman aplikasi. Harap konfirmasi kata sandi Anda sebelum melanjutkan.')}
            </div>

            <form onSubmit={submit}>
                <div className="mt-4">
                    <InputLabel htmlFor="password" value={t('auth.password_field_label', 'Kata Sandi')} className="text-xs font-bold text-slate-700" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full text-xs rounded-xl border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 py-2.5"
                        isFocused={true}
                        onChange={(e) => setData('password', e.target.value)}
                    />

                    <InputError message={errors.password} className="mt-2 text-xs" />
                </div>

                <div className="mt-4 flex items-center justify-end">
                    <PrimaryButton className="ms-4 rounded-xl py-2.5 px-4 text-xs font-bold" disabled={processing}>
                        {t('auth.confirm_button', 'Konfirmasi')}
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
