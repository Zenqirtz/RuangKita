import React, { useState } from 'react';
import { 
    LayoutDashboard, 
    Calendar, 
    DoorOpen, 
    FileText, 
    Clock, 
    AlertCircle, 
    History, 
    HelpCircle, 
    LogOut, 
    Menu, 
    Search, 
    Bell, 
    Building2,
    CheckCircle2
} from 'lucide-react';

export default function RuangKitaLayout({ children, activeTab = 'dashboard' }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const navItems = [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
        { id: 'calendar', label: 'Live Calendar', icon: Calendar, href: '#calendar' },
        { id: 'rooms', label: 'Daftar Ruangan', icon: DoorOpen, href: '#rooms' },
        { id: 'permit-tracker', label: 'Tracking Izin', icon: Clock, href: '#tracker', badge: '3' },
        { id: 'bookings', label: 'Pengajuan Baru', icon: FileText, href: '#booking' },
        { id: 'revisions', label: 'Catatan Revisi', icon: AlertCircle, href: '#revisions', badgeAlert: '1' },
        { id: 'history', label: 'Riwayat Peminjaman', icon: History, href: '#history' },
        { id: 'guidelines', label: 'Tata Tertib', icon: HelpCircle, href: '#guidelines' },
    ];

    return (
        <div className="min-h-screen bg-[#F4F7FB] flex font-sans antialiased text-slate-800">
            {/* Sidebar Overlay for Mobile */}
            {sidebarOpen && (
                <div 
                    className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Left Sidebar */}
            <aside className={`
                fixed top-0 bottom-0 left-0 z-50 w-64 bg-white border-r border-slate-100 flex flex-col justify-between transition-transform duration-300 ease-in-out
                lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                <div>
                    {/* Top Branding Block */}
                    <div className="m-4 p-5 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-lg shadow-blue-500/20 text-center relative overflow-hidden">
                        <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-white/10 rounded-full blur-sm" />
                        <div className="flex items-center justify-center w-12 h-12 mx-auto mb-3 bg-white/15 backdrop-blur-md rounded-2xl border border-white/20">
                            <Building2 className="w-7 h-7 text-white" />
                        </div>
                        <h1 className="text-xl font-black tracking-wide">RUANGKITA</h1>
                        <p className="text-[11px] font-medium text-blue-100 uppercase tracking-wider mt-0.5">
                            Fakultas • Universitas Brawijaya
                        </p>
                    </div>

                    {/* Navigation Items */}
                    <nav className="px-3.5 space-y-1.5 mt-2">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = activeTab === item.id;
                            return (
                                <a
                                    key={item.id}
                                    href={item.href}
                                    className={`
                                        flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200
                                        ${isActive 
                                            ? 'bg-blue-600 text-white shadow-md shadow-blue-600/25 translate-x-1' 
                                            : 'text-slate-600 hover:bg-slate-50 hover:text-blue-600'
                                        }
                                    `}
                                >
                                    <div className="flex items-center gap-3">
                                        <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                                        <span>{item.label}</span>
                                    </div>
                                    {item.badge && (
                                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${isActive ? 'bg-white/20 text-white' : 'bg-blue-100 text-blue-700'}`}>
                                            {item.badge}
                                        </span>
                                    )}
                                    {item.badgeAlert && (
                                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${isActive ? 'bg-red-400 text-white' : 'bg-rose-100 text-rose-600'}`}>
                                            {item.badgeAlert}
                                        </span>
                                    )}
                                </a>
                            );
                        })}
                    </nav>
                </div>

                {/* Bottom Logout */}
                <div className="p-4 border-t border-slate-100">
                    <button 
                        onClick={() => {}}
                        className="flex items-center gap-3 w-full px-4 py-2.5 text-sm font-semibold text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                    >
                        <LogOut className="w-4 h-4" />
                        <span>Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 lg:pl-64 flex flex-col min-h-screen">
                {/* Top Header Navbar */}
                <header className="sticky top-0 z-30 h-16 bg-white/90 backdrop-blur-md border-b border-slate-100 px-6 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <button 
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 lg:hidden"
                        >
                            <Menu className="w-5 h-5" />
                        </button>
                        <h2 className="text-xl font-bold text-slate-800 tracking-tight">Dashboard</h2>
                    </div>

                    <div className="flex items-center gap-4">
                        {/* Search Input Bar */}
                        <div className="relative hidden md:block w-72">
                            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input 
                                type="text"
                                placeholder="Cari ruangan, event, id surat..."
                                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200/80 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-slate-400"
                            />
                        </div>

                        {/* Notification Icon */}
                        <div className="relative">
                            <button className="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-600 transition-colors relative">
                                <Bell className="w-4 h-4" />
                                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white" />
                            </button>
                        </div>

                        {/* User Profile Pill */}
                        <div className="flex items-center gap-3 pl-3 border-l border-slate-200">
                            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white font-bold text-sm shadow-sm ring-2 ring-blue-500/20">
                                DA
                            </div>
                            <div className="hidden sm:block text-left">
                                <p className="text-xs font-bold text-slate-800 leading-tight">Daffa Ahmad Al Attas</p>
                                <p className="text-[10px] font-medium text-slate-400 leading-tight">Ormawa Yakusa • @student.ub.ac.id</p>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Main Dynamic View */}
                <main className="flex-1 p-6 md:p-8 space-y-6 max-w-7xl w-full mx-auto">
                    {children}
                </main>

                {/* Footer */}
                <footer className="py-4 px-8 text-center text-xs text-slate-400 border-t border-slate-100 bg-white/50">
                    © 2026 RuangKita • Tim Yakusa (Universitas Brawijaya). Built for Smarter Campus & Learning.
                </footer>
            </div>
        </div>
    );
}
