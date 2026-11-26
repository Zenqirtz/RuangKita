import React, { useState } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import Icon from '@/Components/RuangKita/Icon';
import LanguageSwitcher from '@/Components/RuangKita/LanguageSwitcher';
import { useLanguage } from '@/Context/LanguageContext';

const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'dashboard', href: '/dashboard' },
    { id: 'calendar', label: 'Kalender Live', icon: 'calendar', href: '/calendar' },
    { id: 'rooms', label: 'Daftar Ruangan', icon: 'door', href: '/rooms' },
    { id: 'permits', label: 'Peminjaman & Izin', icon: 'clipboardList', href: '/permits' },
    { id: 'guidelines', label: 'Tata Tertib', icon: 'book', href: '/guidelines' },
];

const pageTitles = {
    dashboard: 'Dashboard',
    calendar: 'Kalender Live',
    rooms: 'Daftar Ruangan',
    permits: 'Peminjaman & Izin',
    permitDetail: 'Detail Pengajuan',
    profile: 'Profil Akun',
    booking: 'Pengajuan Baru',
    revisions: 'Catatan Revisi',
    history: 'Riwayat Peminjaman',
    guidelines: 'Tata Tertib',
    terms: 'Ketentuan & Privasi',
};

const noticeIconStyles = {
    revision: 'bg-rose-50 text-rose-600',
    info: 'bg-blue-50 text-blue-600',
    success: 'bg-emerald-50 text-emerald-600',
};

const noticeIcons = {
    revision: 'alert',
    info: 'info',
    success: 'check',
};

export default function RuangKitaLayout({ children, activeTab = 'dashboard', title }) {
    const { t } = useLanguage();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('ruangkita_sidebar_collapsed') === 'true';
        }
        return false;
    });
    const [notificationsOpen, setNotificationsOpen] = useState(false);
    const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
    const { auth, badgeCounts = {}, notifications = [] } = usePage().props;

    const toggleCollapsed = () => {
        setIsCollapsed((prev) => {
            const next = !prev;
            if (typeof window !== 'undefined') {
                localStorage.setItem('ruangkita_sidebar_collapsed', String(next));
            }
            return next;
        });
    };

    const user = auth?.user;
    const userName = user?.name ?? 'Tamu Civitas UB';
    const userEmail = user?.email ?? 'Belum masuk akun';
    const initials = user?.name
        ? user.name
            .split(' ')
            .filter(Boolean)
            .slice(0, 2)
            .map((part) => part[0])
            .join('')
            .toUpperCase()
        : 'UB';

    const pageTitle = title ?? t(`nav.${activeTab}`, pageTitles[activeTab] ?? 'Dashboard');

    return (
        <div className="min-h-screen bg-[#F5F7FB] flex font-sans antialiased text-slate-800">
            <Head title={pageTitle} />
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            <aside
                className={`
                    fixed top-0 bottom-0 left-0 z-50 bg-white border-r border-slate-100 flex flex-col justify-between transition-all duration-300 ease-in-out
                    lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                    ${isCollapsed ? 'w-[76px]' : 'w-[248px]'}
                `}
            >
                {/* Floating collapse toggle on sidebar border edge */}
                <button
                    type="button"
                    onClick={toggleCollapsed}
                    className="hidden lg:flex absolute -right-3.5 top-7 z-50 w-7 h-7 rounded-full bg-white border border-slate-200/90 shadow-md items-center justify-center text-slate-500 hover:text-blue-600 hover:border-blue-400 hover:scale-105 transition-all"
                    title={isCollapsed ? 'Perluas Sidebar' : 'Kecilkan Sidebar'}
                    aria-label="Toggle sidebar collapse"
                >
                    <Icon name={isCollapsed ? 'chevronRight' : 'chevronLeft'} className="w-3.5 h-3.5" />
                </button>

                <div className="flex flex-col min-h-0">
                    <div className={`relative bg-gradient-to-b from-blue-600 to-blue-700 transition-all ${isCollapsed ? 'px-3 pt-5 pb-6 flex flex-col items-center' : 'px-5 pt-6 pb-9 text-center'}`}>
                        <a href="/dashboard" className={`flex flex-col items-center gap-2 text-white ${isCollapsed ? 'justify-center' : ''}`} title="RuangKita Dashboard">
                            {isCollapsed ? (
                                <img src="/images/logo-mark-white.svg" alt="RuangKita" className="w-9 h-9 object-contain" />
                            ) : (
                                <>
                                    <img src="/images/logo-white.svg" alt="RuangKita" className="h-10 w-auto object-contain transition-all" />
                                    <p className="text-[11px] font-medium text-blue-100 leading-snug mt-1">
                                        Campus Room Booking<br />&amp; Permit Tracking
                                    </p>
                                </>
                            )}
                        </a>
                    </div>

                    <nav className={`relative -mt-3 flex-1 rounded-t-2xl bg-white pt-3.5 space-y-1 overflow-y-auto pb-4 transition-all ${isCollapsed ? 'px-2' : 'px-3.5'}`}>
                        {navItems.map((item) => {
                            const isPermitTab = ['permits', 'booking', 'revisions', 'history', 'permitDetail'].includes(activeTab);
                            const isActive = item.id === 'permits' ? isPermitTab : activeTab === item.id;

                            const revisionCount = badgeCounts.revisions ?? 0;
                            const trackingCount = badgeCounts.tracking ?? 0;
                            const count = item.id === 'permits'
                                ? (revisionCount > 0 ? revisionCount : trackingCount)
                                : (item.badgeKey ? (badgeCounts[item.badgeKey] ?? 0) : 0);
                            const isBadgeAlert = item.id === 'permits' ? revisionCount > 0 : Boolean(item.badgeAlert);
                            const showBadge = count > 0;

                            return (
                                <a
                                    key={item.id}
                                    href={item.href}
                                    onClick={() => setSidebarOpen(false)}
                                    title={isCollapsed ? t(`nav.${item.id}`, item.label) : undefined}
                                    className={`
                                        relative flex items-center rounded-xl text-[12px] font-semibold transition-all duration-200
                                        ${isCollapsed ? 'justify-center p-2.5' : 'justify-between gap-2 px-3.5 py-2.5'}
                                        ${
                                            isActive
                                                ? 'bg-blue-600 text-white shadow-sm shadow-blue-600/20'
                                                : 'text-slate-700 hover:bg-slate-50 hover:text-blue-600'
                                        }
                                    `}
                                >
                                    <span className={`flex items-center min-w-0 ${isCollapsed ? 'justify-center' : 'gap-3'}`}>
                                        <Icon
                                            name={item.icon}
                                            className={`w-[18px] h-[18px] shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`}
                                        />
                                        {!isCollapsed && <span className="truncate">{t(`nav.${item.id}`, item.label)}</span>}
                                    </span>

                                    {showBadge && (
                                        isCollapsed ? (
                                            <span
                                                className={`absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full ${
                                                    isBadgeAlert ? 'bg-rose-500 ring-2 ring-white' : 'bg-blue-500 ring-2 ring-white'
                                                }`}
                                                title={`${count} notifikasi`}
                                            />
                                        ) : (
                                            <span
                                                className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                                                    isBadgeAlert
                                                        ? isActive
                                                            ? 'bg-white text-rose-600'
                                                            : 'bg-rose-50 text-rose-600'
                                                        : isActive
                                                            ? 'bg-white/20 text-white'
                                                            : 'bg-blue-50 text-blue-600'
                                                }`}
                                            >
                                                {count}
                                            </span>
                                        )
                                    )}
                                </a>
                            );
                        })}
                    </nav>
                </div>

                <div className={`border-t border-slate-100 transition-all ${isCollapsed ? 'px-2 pb-4 pt-3 flex flex-col items-center' : 'px-4 pb-5 pt-3'}`}>
                    {user ? (
                        <Link
                            href={route('logout')}
                            method="post"
                            as="button"
                            type="button"
                            title={t('nav.logout', 'Logout')}
                            className={`w-full flex items-center text-[13px] font-semibold text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors ${
                                isCollapsed ? 'justify-center p-2.5' : 'gap-3 px-4 py-2.5 text-left'
                            }`}
                        >
                            <Icon name="logout" className="w-[18px] h-[18px] shrink-0" />
                            {!isCollapsed && <span>{t('nav.logout', 'Logout')}</span>}
                        </Link>
                    ) : (
                        <Link
                            href={route('login')}
                            title={t('nav.login', 'Masuk Akun')}
                            className={`w-full flex items-center text-[13px] font-semibold text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors ${
                                isCollapsed ? 'justify-center p-2.5' : 'gap-3 px-4 py-2.5'
                            }`}
                        >
                            <Icon name="user" className="w-[18px] h-[18px] shrink-0" />
                            {!isCollapsed && <span>{t('nav.login', 'Masuk Akun')}</span>}
                        </Link>
                    )}
                    {!isCollapsed && (
                        <p className="text-[9px] text-slate-300 font-medium text-center mt-3">
                            RuangKita v1.0 • Tim Yakusa
                        </p>
                    )}
                </div>
            </aside>

            <div className={`flex-1 flex flex-col min-h-screen min-w-0 transition-all duration-300 ease-in-out ${isCollapsed ? 'lg:pl-[76px]' : 'lg:pl-[248px]'}`}>
                <header className="sticky top-0 z-30 h-[68px] bg-white/95 backdrop-blur-md border-b border-slate-100 px-4 md:px-7 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3 min-w-0">
                        <button
                            type="button"
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 lg:hidden"
                            aria-label="Buka menu"
                        >
                            <Icon name="menu" className="w-5 h-5" />
                        </button>
                        <h2 className="text-lg md:text-xl font-extrabold text-slate-900 tracking-tight truncate">
                            {pageTitle}
                        </h2>
                    </div>

                    <div className="flex items-center gap-2 md:gap-3">
                        <div className="relative hidden md:block w-56 lg:w-64">
                            <Icon
                                name="search"
                                className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                            />
                            <input
                                type="text"
                                placeholder={t('common.search_placeholder', 'Cari ruangan, kegiatan, ID izin...')}
                                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200/70 rounded-xl text-[11px] font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all placeholder:text-slate-400"
                            />
                        </div>

                        <LanguageSwitcher />

                        <div className="relative">
                            <button
                                type="button"
                                onClick={() => setNotificationsOpen(!notificationsOpen)}
                                className="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-500 transition-colors relative"
                                aria-label={t('nav.notifications', 'Notifikasi')}
                            >
                                <Icon name="bell" className="w-[18px] h-[18px]" />
                                {notifications.length > 0 && (
                                    <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white" />
                                )}
                            </button>

                            {notificationsOpen && (
                                <>
                                    <div className="fixed inset-0 z-40" onClick={() => setNotificationsOpen(false)} />
                                    <div className="absolute right-0 top-12 z-50 w-80 bg-white rounded-2xl border border-slate-100 shadow-xl shadow-slate-900/10 overflow-hidden">
                                        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
                                            <p className="text-xs font-bold text-slate-800">{t('nav.notifications', 'Notifikasi')}</p>
                                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                                notifications.length > 0
                                                    ? 'text-blue-600 bg-blue-50'
                                                    : 'text-slate-400 bg-slate-100'
                                            }`}>
                                                {notifications.length} {t('nav.new_badge', 'baru')}
                                            </span>
                                        </div>
                                        <div className="max-h-80 overflow-y-auto">
                                            {notifications.length === 0 ? (
                                                <div className="py-8 px-4 text-center">
                                                    <p className="text-xs font-semibold text-slate-600">{t('nav.no_notifications', 'Tidak ada notifikasi baru')}</p>
                                                    <p className="text-[10px] text-slate-400 mt-1">
                                                        Pembaruan pengajuan izin akan muncul di sini.
                                                    </p>
                                                </div>
                                            ) : (
                                                notifications.map((notice) => (
                                                    <a
                                                        key={notice.id}
                                                        href={notice.href}
                                                        className="flex gap-3 px-4 py-3 hover:bg-slate-50 transition-colors border-b border-slate-50 last:border-0"
                                                    >
                                                        <div
                                                            className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${noticeIconStyles[notice.type] ?? 'bg-blue-50 text-blue-600'}`}
                                                        >
                                                            <Icon
                                                                name={noticeIcons[notice.type] ?? 'info'}
                                                                className="w-4 h-4"
                                                            />
                                                        </div>
                                                        <div className="min-w-0">
                                                            <p className="text-[11px] font-bold text-slate-800 leading-snug">
                                                                {notice.title}
                                                            </p>
                                                            <p className="text-[10px] text-slate-400 mt-0.5 line-clamp-2">
                                                                {notice.description}
                                                            </p>
                                                            <p className="text-[9px] text-slate-400 mt-1">{notice.time}</p>
                                                        </div>
                                                    </a>
                                                ))
                                            )}
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>

                        <div className="relative">
                            <button
                                type="button"
                                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                                className="flex items-center gap-2.5 pl-2.5 md:pl-4 border-l border-slate-200 text-left hover:opacity-80 transition-opacity"
                            >
                                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white font-bold text-[11px] shadow-sm ring-2 ring-blue-500/15">
                                    {initials}
                                </div>
                                <div className="hidden sm:block text-left">
                                    <div className="flex items-center gap-1.5">
                                        <p className="text-[11px] font-bold text-slate-800 leading-tight truncate max-w-[140px]">
                                            {userName}
                                        </p>
                                        {user?.role === 'admin' && (
                                            <span className="text-[8px] font-black uppercase px-1.5 py-0.2 bg-amber-100 text-amber-800 rounded">
                                                Admin
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-[9px] font-medium text-slate-400 leading-tight truncate max-w-[160px]">
                                        {userEmail}
                                    </p>
                                </div>
                                <Icon name="chevronDown" className="hidden sm:block w-3.5 h-3.5 text-slate-400" />
                            </button>

                            {profileDropdownOpen && (
                                <>
                                    <div
                                        className="fixed inset-0 z-40"
                                        onClick={() => setProfileDropdownOpen(false)}
                                    />
                                    <div className="absolute right-0 top-12 z-50 w-52 bg-white rounded-2xl border border-slate-100 shadow-xl shadow-slate-900/10 p-2 overflow-hidden">
                                        <div className="px-3 py-2 border-b border-slate-100 mb-1">
                                            <p className="text-xs font-bold text-slate-800 truncate">{userName}</p>
                                            <p className="text-[10px] text-slate-400 truncate">{userEmail}</p>
                                        </div>
                                        <Link
                                            href={route('profile.edit')}
                                            className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-600 hover:text-blue-600 hover:bg-slate-50 rounded-xl transition-colors"
                                            onClick={() => setProfileDropdownOpen(false)}
                                        >
                                            <Icon name="user" className="w-4 h-4 text-slate-400" />
                                            <span>{t('nav.profile', 'Profil Akun')}</span>
                                        </Link>
                                        <Link
                                            href={route('logout')}
                                            method="post"
                                            as="button"
                                            type="button"
                                            className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-xl transition-colors text-left"
                                            onClick={() => setProfileDropdownOpen(false)}
                                        >
                                            <Icon name="logout" className="w-4 h-4 text-rose-500" />
                                            <span>Logout</span>
                                        </Link>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </header>

                <main className="flex-1 p-4 md:p-7 space-y-5 w-full max-w-[1440px] mx-auto">{children}</main>

                <footer className="py-4 px-6 text-center md:text-left md:flex md:items-center md:justify-between gap-3 text-[10px] text-slate-400 border-t border-slate-100 bg-white/60">
                    <span>© 2026 RuangKita • Tim Yakusa, Universitas Brawijaya. All rights reserved.</span>
                    <span className="block md:inline mt-1 md:mt-0">
                        Built for <span className="font-semibold text-slate-500">Smarter Campus & Learning</span>
                    </span>
                </footer>
            </div>
        </div>
    );
}
