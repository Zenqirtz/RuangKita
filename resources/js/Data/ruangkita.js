export const approvalStages = [
    {
        key: 'submitted',
        label: 'Submitted',
        title: 'Pengajuan Diterima',
        description: 'Dokumen dan jadwal berhasil dikirim ke sistem.',
        icon: 'send',
    },
    {
        key: 'admin',
        label: 'Admin Verification',
        title: 'Verifikasi Admin Fakultas',
        description: 'Admin memeriksa kelengkapan dokumen dan bentrok jadwal.',
        icon: 'clipboard',
    },
    {
        key: 'leadership',
        label: 'Leadership Approval',
        title: 'Persetujuan Pimpinan',
        description: 'Wakil Dekan III menandatangani izin penggunaan ruangan.',
        icon: 'pen',
    },
    {
        key: 'approved',
        label: 'Approved',
        title: 'Izin Disetujui',
        description: 'Surat izin resmi dapat diunduh dan ruangan terkunci.',
        icon: 'check',
    },
];

export const stageStyles = {
    submitted: {
        label: 'Submitted',
        badge: 'bg-sky-50 text-sky-700 border-sky-200',
        dot: 'bg-sky-500',
        progress: 'bg-sky-500',
        progressValue: 25,
    },
    admin: {
        label: 'Admin Verification',
        badge: 'bg-violet-50 text-violet-700 border-violet-200',
        dot: 'bg-violet-500',
        progress: 'bg-violet-500',
        progressValue: 50,
    },
    leadership: {
        label: 'Leadership Approval',
        badge: 'bg-amber-50 text-amber-700 border-amber-200',
        dot: 'bg-amber-500',
        progress: 'bg-amber-500',
        progressValue: 75,
    },
    approved: {
        label: 'Approved',
        badge: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        dot: 'bg-emerald-500',
        progress: 'bg-emerald-500',
        progressValue: 100,
    },
    revision: {
        label: 'Perlu Revisi',
        badge: 'bg-rose-50 text-rose-700 border-rose-200',
        dot: 'bg-rose-500',
        progress: 'bg-rose-500',
        progressValue: 25,
    },
    rejected: {
        label: 'Ditolak',
        badge: 'bg-slate-100 text-slate-700 border-slate-300',
        dot: 'bg-slate-500',
        progress: 'bg-slate-400',
        progressValue: 100,
    },
};

export const rooms = [
    {
        id: 1,
        name: 'Auditorium Gedung Utama',
        shortName: 'Auditorium',
        code: 'AUD-01',
        capacity: 250,
        floor: 'Lantai 1, Gedung A',
        status: 'available',
        occupancy: 85,
        accent: 'blue',
        facilities: ['Proyektor & LED Screen', 'Sound System', 'AC', 'Panggung', 'Wi-Fi'],
        description: 'Ruang serbaguna terbesar untuk seminar, wisuda fakultas, dan acara ormawa berskala besar.',
    },
    {
        id: 2,
        name: 'Student Center Hall',
        shortName: 'Student Center',
        code: 'SCH-02',
        capacity: 120,
        floor: 'Lantai 2, Gedung B',
        status: 'booked',
        occupancy: 92,
        accent: 'emerald',
        facilities: ['Proyektor', 'Sound System', 'AC', 'Wi-Fi'],
        description: 'Hall fleksibel untuk latihan, gathering, dan pameran karya mahasiswa.',
    },
    {
        id: 3,
        name: 'Ruang Rapat Ormawa 101',
        shortName: 'Ruang Rapat',
        code: 'RPT-101',
        capacity: 40,
        floor: 'Lantai 1, Gedung B',
        status: 'available',
        occupancy: 70,
        accent: 'violet',
        facilities: ['TV Display', 'AC', 'Video Conference', 'Wi-Fi'],
        description: 'Ruang rapat representatif untuk koordinasi pengurus dan rapat kerja divisi.',
    },
    {
        id: 4,
        name: 'Lab Multimedia & Komputer',
        shortName: 'Lab Multimedia',
        code: 'LAB-04',
        capacity: 60,
        floor: 'Lantai 3, Gedung C',
        status: 'pending',
        occupancy: 60,
        accent: 'amber',
        facilities: ['60 PC Workstation', 'Proyektor', 'AC', 'Wi-Fi'],
        description: 'Laboratorium untuk workshop desain, pelatihan software, dan kompetisi digital.',
    },
    {
        id: 5,
        name: 'Amphitheater Terbuka',
        shortName: 'Amphitheater',
        code: 'AMP-05',
        capacity: 180,
        floor: 'Area Taman Fakultas',
        status: 'available',
        occupancy: 45,
        accent: 'rose',
        facilities: ['Panggung Terbuka', 'Sound System', 'Area Parkir', 'Wi-Fi'],
        description: 'Ruang terbuka untuk pentas seni, bazar, dan kegiatan komunitas mahasiswa.',
    },
];

export const roomStatusStyles = {
    available: { label: 'Tersedia', badge: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
    booked: { label: 'Terpakai', badge: 'bg-rose-50 text-rose-700 border-rose-200' },
    pending: { label: 'Menunggu Verifikasi', badge: 'bg-amber-50 text-amber-700 border-amber-200' },
};

export const permits = [];

export const notices = [];

export const quickAccess = [
    {
        label: 'Ajukan Ruangan',
        description: 'Upload proposal',
        icon: 'fileUp',
        href: '/bookings/create',
        accent: 'blue',
    },
    {
        label: 'Kalender Live',
        description: 'Cek slot kosong',
        icon: 'calendar',
        href: '/calendar',
        accent: 'emerald',
    },
    {
        label: 'Lacak Izin',
        description: '4 tahap approval',
        icon: 'clock',
        href: '/permits',
        accent: 'violet',
    },
    {
        label: 'Daftar Ruangan',
        description: '5 ruang fakultas',
        icon: 'door',
        href: '/rooms',
        accent: 'amber',
    },
    {
        label: 'Riwayat',
        description: 'Peminjaman selesai',
        icon: 'history',
        href: '/history',
        accent: 'sky',
    },
    {
        label: 'Tata Tertib',
        description: 'Aturan peminjaman',
        icon: 'book',
        href: '/guidelines',
        accent: 'rose',
    },
];

export const weeklyOccupancy = [
    { label: 'Auditorium', value: 34, color: '#2563EB' },
    { label: 'Student Center', value: 24, color: '#10B981' },
    { label: 'Lab Multimedia', value: 18, color: '#F59E0B' },
    { label: 'Ruang Rapat', value: 14, color: '#8B5CF6' },
    { label: 'Amphitheater', value: 10, color: '#F43F5E' },
];

export const dashboardStats = [
    {
        label: 'Ruangan Tersedia',
        value: '3',
        suffix: 'dari 5 ruangan',
        icon: 'door',
        accent: 'blue',
    },
    {
        label: 'Menunggu Verifikasi',
        value: '3',
        suffix: 'Di admin fakultas',
        icon: 'clock',
        accent: 'violet',
    },
    {
        label: 'Menunggu TTD',
        value: '2',
        suffix: 'Wakil Dekan III',
        icon: 'fileCheck',
        accent: 'amber',
    },
    {
        label: 'Izin Disetujui',
        value: '8',
        suffix: 'Bulan ini',
        icon: 'check',
        accent: 'emerald',
    },
    {
        label: 'Perlu Revisi',
        value: '1',
        suffix: 'Tindakan diperlukan',
        icon: 'alert',
        accent: 'rose',
    },
];

/**
 * Data kalender bersumber dari database nyata melalui CalendarController.
 */
export const calendarEvents = [];

export const eventStatusStyles = {
    approved: { label: 'Disetujui', block: 'bg-blue-600 text-white border-blue-600', dot: 'bg-blue-600' },
    pending: { label: 'Menunggu', block: 'bg-amber-100 text-amber-800 border-amber-200', dot: 'bg-amber-500' },
    revision: { label: 'Revisi', block: 'bg-rose-100 text-rose-700 border-rose-200', dot: 'bg-rose-500' },
};

export const faqs = [
    {
        question: 'Berapa lama proses persetujuan izin ruangan?',
        answer: 'Rata-rata 1 - 3 hari kerja. Status setiap tahap dapat dipantau secara real-time pada halaman Tracking Izin.',
    },
    {
        question: 'Dokumen apa saja yang wajib diunggah?',
        answer: 'Proposal kegiatan, surat permohonan ruangan yang ditandatangani ketua ormawa dan dosen pembimbing, serta rundown kegiatan.',
    },
    {
        question: 'Bagaimana jika jadwal yang dipilih bentrok?',
        answer: 'Sistem melakukan pengecekan otomatis saat pengajuan. Slot yang sudah terisi akan ditandai merah dan form tidak dapat dikirim.',
    },
    {
        question: 'Apakah izin yang disetujui bisa dibatalkan?',
        answer: 'Pembatalan dapat diajukan melalui admin fakultas paling lambat 2 hari sebelum kegiatan. Slot akan dibuka kembali untuk ormawa lain.',
    },
];
