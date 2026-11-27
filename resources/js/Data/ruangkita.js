export const approvalStages = [
    {
        key: 'submitted',
        label: 'Diajukan',
        title: 'Pengajuan Diterima',
        description: 'Dokumen dan jadwal berhasil dikirim ke sistem.',
        icon: 'send',
    },
    {
        key: 'admin',
        label: 'Verifikasi Admin',
        title: 'Verifikasi Admin Fakultas',
        description: 'Admin memeriksa kelengkapan dokumen dan bentrok jadwal.',
        icon: 'clipboard',
    },
    {
        key: 'leadership',
        label: 'Persetujuan Pimpinan',
        title: 'Persetujuan Pimpinan',
        description: 'Wakil Dekan III menandatangani izin penggunaan ruangan.',
        icon: 'pen',
    },
    {
        key: 'approved',
        label: 'Disetujui',
        title: 'Izin Disetujui',
        description: 'Surat izin resmi dapat diunduh dan ruangan terkunci.',
        icon: 'check',
    },
];

export const stageStyles = {
    submitted: {
        label: 'Diajukan',
        badge: 'bg-sky-50 text-sky-700 border-sky-200',
        dot: 'bg-sky-500',
        icon: 'send',
        progress: 'bg-sky-500',
        progressValue: 25,
    },
    admin: {
        label: 'Verifikasi Admin',
        badge: 'bg-violet-50 text-violet-700 border-violet-200',
        dot: 'bg-violet-500',
        icon: 'clipboard',
        progress: 'bg-violet-500',
        progressValue: 50,
    },
    leadership: {
        label: 'Persetujuan Pimpinan',
        badge: 'bg-amber-50 text-amber-700 border-amber-200',
        dot: 'bg-amber-500',
        icon: 'clock',
        progress: 'bg-amber-500',
        progressValue: 75,
    },
    approved: {
        label: 'Disetujui',
        badge: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        dot: 'bg-emerald-500',
        icon: 'checkSmall',
        progress: 'bg-emerald-500',
        progressValue: 100,
    },
    revision: {
        label: 'Perlu Revisi',
        badge: 'bg-rose-50 text-rose-700 border-rose-200',
        dot: 'bg-rose-500',
        icon: 'alert',
        progress: 'bg-rose-500',
        progressValue: 25,
    },
    rejected: {
        label: 'Ditolak',
        badge: 'bg-slate-100 text-slate-700 border-slate-300',
        dot: 'bg-slate-500',
        icon: 'x',
        progress: 'bg-slate-400',
        progressValue: 100,
    },
};

export const rooms = [
    { id: 1, code: 'VOK-KLS-A', name: 'Ruang Kelas A (1–6)', shortName: 'Kelas A (1–6)', category: 'Ruang Kelas & Diskusi', campus: 'Kampus Veteran', floor: 'Gedung Vokasi Veteran', capacity: 45, accent: 'blue' },
    { id: 2, code: 'VOK-KLS-B', name: 'Ruang Kelas B (1–6)', shortName: 'Kelas B (1–6)', category: 'Ruang Kelas & Diskusi', campus: 'Kampus Veteran', floor: 'Gedung Vokasi Veteran', capacity: 45, accent: 'sky' },
    { id: 3, code: 'VOK-306-310', name: 'Ruang Kuliah 306–307 & 309–310', shortName: 'Ruang 306–310', category: 'Ruang Kelas & Diskusi', campus: 'Kampus Veteran', floor: 'Lantai 3 • Kampus Veteran', capacity: 40, accent: 'emerald' },
    { id: 4, code: 'VOK-DISKUSI', name: 'Ruang Diskusi & Seminar', shortName: 'Diskusi & Seminar', category: 'Ruang Kelas & Diskusi', campus: 'Kampus Veteran', floor: 'Gedung Vokasi Veteran', capacity: 80, accent: 'violet' },
    { id: 5, code: 'LAB-KOM-301', name: 'Lab Komputer 301 (1–5)', shortName: 'Lab Kom 301', category: 'Laboratorium & Studio', campus: 'Kampus Veteran', floor: 'Lantai 3 • Kampus Veteran', capacity: 40, accent: 'blue' },
    { id: 6, code: 'LAB-KOM-303', name: 'Lab Komputer 303 (1–4)', shortName: 'Lab Kom 303', category: 'Laboratorium & Studio', campus: 'Kampus Veteran', floor: 'Lantai 3 • Kampus Veteran', capacity: 36, accent: 'sky' },
    { id: 7, code: 'LAB-KOM-304', name: 'Lab Komputer 304 (1–4)', shortName: 'Lab Kom 304', category: 'Laboratorium & Studio', campus: 'Kampus Veteran', floor: 'Lantai 3 • Kampus Veteran', capacity: 36, accent: 'emerald' },
    { id: 8, code: 'LAB-DESAIN', name: 'Lab Desain (1–6)', shortName: 'Lab Desain (1–6)', category: 'Laboratorium & Studio', campus: 'Kampus Veteran', floor: 'Gedung Vokasi Veteran', capacity: 35, accent: 'rose' },
    { id: 9, code: 'STD-GAMBAR', name: 'Studio Gambar Desain (1–4)', shortName: 'Studio Gambar', category: 'Laboratorium & Studio', campus: 'Kampus Veteran', floor: 'Gedung Vokasi Veteran', capacity: 30, accent: 'amber' },
    { id: 10, code: 'LAB-MOTION', name: 'Lab Motion Graphic (1–4)', shortName: 'Lab Motion Graphic', category: 'Laboratorium & Studio', campus: 'Kampus Veteran', floor: 'Gedung Vokasi Veteran', capacity: 30, accent: 'violet' },
    { id: 11, code: 'LAB-SI', name: 'Lab Sistem Informasi (1–3)', shortName: 'Lab Sistem Informasi', category: 'Laboratorium & Studio', campus: 'Kampus Veteran', floor: 'Gedung Vokasi Veteran', capacity: 35, accent: 'blue' },
    { id: 12, code: 'LAB-IOT-HCD', name: 'Lab IoT & Human Centered Design (1–2)', shortName: 'Lab IoT & HCD', category: 'Laboratorium & Studio', campus: 'Kampus Veteran', floor: 'Gedung Vokasi Veteran', capacity: 28, accent: 'emerald' },
    { id: 13, code: 'LAB-HOTEL', name: 'Lab Kamar Hotel (1–4)', shortName: 'Lab Kamar Hotel', category: 'Laboratorium & Studio', campus: 'Kampus Dieng', floor: 'Gedung Vokasi Dieng', capacity: 20, accent: 'amber' },
    { id: 14, code: 'LAB-COFFEE', name: 'Lab Coffee & Beverage (1–2)', shortName: 'Lab Coffee & Beverage', category: 'Laboratorium & Studio', campus: 'Kampus Dieng', floor: 'Gedung Vokasi Dieng', capacity: 24, accent: 'rose' },
    { id: 15, code: 'LAB-BANK', name: 'Lab Mini Bank (1–6)', shortName: 'Lab Mini Bank', category: 'Laboratorium & Studio', campus: 'Kampus Veteran', floor: 'Gedung Vokasi Veteran', capacity: 30, accent: 'emerald' },
    { id: 16, code: 'LAB-RISET', name: 'Lab Riset Vokasi', shortName: 'Lab Riset', category: 'Laboratorium & Studio', campus: 'Kampus Veteran', floor: 'Gedung Vokasi Veteran', capacity: 25, accent: 'violet' },
    { id: 17, code: 'VOK-PODCAST', name: 'Ruang Podcast VIP (1–6)', shortName: 'Podcast VIP (1–6)', category: 'Ruang Penunjang', campus: 'Kampus Veteran', floor: 'Gedung Vokasi Veteran', capacity: 10, accent: 'rose' },
    { id: 18, code: 'VOK-MEETING', name: 'Ruang Meeting (1–4)', shortName: 'Ruang Meeting (1–4)', category: 'Ruang Penunjang', campus: 'Kampus Veteran', floor: 'Gedung Vokasi Veteran', capacity: 20, accent: 'blue' },
    { id: 19, code: 'VOK-RAPAT', name: 'Ruang Rapat Utama', shortName: 'Ruang Rapat', category: 'Ruang Penunjang', campus: 'Kampus Veteran', floor: 'Gedung Vokasi Veteran', capacity: 35, accent: 'sky' },
    { id: 20, code: 'VOK-WORKSPACE', name: 'Workspace & Mini Library (Dieng)', shortName: 'Workspace Dieng', category: 'Ruang Penunjang', campus: 'Kampus Dieng', floor: 'Gedung Vokasi Dieng', capacity: 40, accent: 'sky' },
    { id: 21, code: 'VOK-BACA', name: 'Ruang Baca Vokasi', shortName: 'Ruang Baca', category: 'Ruang Penunjang', campus: 'Kampus Veteran', floor: 'Gedung Vokasi Veteran', capacity: 35, accent: 'emerald' },
];

export const roomStatusStyles = {
    available: { label: 'Tersedia', badge: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
    booked: { label: 'Terpakai', badge: 'bg-rose-50 text-rose-700 border-rose-200' },
    pending: { label: 'Menunggu Verifikasi', badge: 'bg-amber-50 text-amber-700 border-amber-200' },
};

export const quickAccess = [
    {
        label: 'Ajukan Ruangan',
        description: 'Upload proposal',
        translationKey: 'qa.book_room',
        descriptionKey: 'qa.book_room_desc',
        icon: 'fileUp',
        href: '/bookings/create',
        accent: 'blue',
    },
    {
        label: 'Kalender Live',
        description: 'Cek slot kosong',
        translationKey: 'qa.live_calendar',
        descriptionKey: 'qa.live_calendar_desc',
        icon: 'calendar',
        href: '/calendar',
        accent: 'emerald',
    },
    {
        label: 'Lacak Izin',
        description: '4 tahap approval',
        translationKey: 'qa.track_permit',
        descriptionKey: 'qa.track_permit_desc',
        icon: 'clock',
        href: '/permits',
        accent: 'violet',
    },
    {
        label: 'Daftar Ruangan',
        description: '5 ruang fakultas',
        translationKey: 'qa.manage_rooms',
        descriptionKey: 'qa.manage_rooms_desc',
        icon: 'door',
        href: '/rooms',
        accent: 'amber',
    },
    {
        label: 'Riwayat',
        description: 'Peminjaman selesai',
        translationKey: 'qa.history',
        descriptionKey: 'qa.history_desc',
        icon: 'history',
        href: '/history',
        accent: 'sky',
    },
    {
        label: 'Tata Tertib',
        description: 'Aturan peminjaman',
        translationKey: 'qa.guidelines',
        descriptionKey: 'qa.guidelines_desc',
        icon: 'book',
        href: '/guidelines',
        accent: 'rose',
    },
];

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
