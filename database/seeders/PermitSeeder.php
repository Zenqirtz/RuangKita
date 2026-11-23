<?php

namespace Database\Seeders;

use App\Models\Permit;
use App\Models\PermitHistory;
use App\Models\User;
use Illuminate\Database\Seeder;

class PermitSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $admin = User::where('role', 'admin')->first();

        $today = now();

        $data = [
            [
                'code' => 'RK-2026-081',
                'event' => 'Seminar Nasional Kecerdasan Buatan',
                'ormawa' => 'HMPSTI',
                'pic' => 'Alif Ramadhan',
                'phone' => '0812-3456-7890',
                'room_id' => 1,
                'room_name' => 'Auditorium Gedung Utama',
                'date' => $today->copy()->format('Y-m-d'),
                'start' => '08:00',
                'end' => '12:00',
                'participants' => 180,
                'notes' => 'Butuh sound system aula, 2 wireless mic, dan videotron panggung.',
                'proposal_name' => 'Proposal_Semnas_AI_2026.pdf',
                'letter_name' => 'Surat_Permohonan_Aula_Utama.pdf',
                'stage' => 'approved',
                'admin_notes' => 'Disetujui lengkap oleh Wakil Dekan III.',
                'submitted_at' => $today->copy()->subDays(2),
            ],
            [
                'code' => 'RK-2026-082',
                'event' => 'Latihan Rutin Pentas Seni Vokasi',
                'ormawa' => 'BEM Vokasi UB',
                'pic' => 'Nadia Safitri',
                'phone' => '0821-9876-5432',
                'room_id' => 2,
                'room_name' => 'Student Center Hall',
                'date' => $today->copy()->addDay()->format('Y-m-d'),
                'start' => '13:00',
                'end' => '17:00',
                'participants' => 35,
                'notes' => 'Latihan persiapan pementasan Dies Natalis.',
                'proposal_name' => 'Surat_Jadwal_Latihan.pdf',
                'letter_name' => 'Izin_Penggunaan_Studio.pdf',
                'stage' => 'admin',
                'admin_notes' => 'Sedang diperiksa berkas proposal dan susunan panitia oleh Bagian Kemahasiswaan.',
                'submitted_at' => $today->copy()->subDay(),
            ],
            [
                'code' => 'RK-2026-083',
                'event' => 'Rapat Pleno Ormawa Fakultas',
                'ormawa' => 'HIMA Administrasi Bisnis',
                'pic' => 'Farhan Pratama',
                'phone' => '0857-1122-3344',
                'room_id' => 3,
                'room_name' => 'Ruang Rapat Ormawa 101',
                'date' => $today->copy()->addDays(2)->format('Y-m-d'),
                'start' => '09:00',
                'end' => '13:00',
                'participants' => 25,
                'notes' => 'Rapat koordinasi akhir kepengurusan ormawa.',
                'proposal_name' => 'Agenda_Pleno_Ormawa.pdf',
                'letter_name' => 'Surat_Permohonan_Ruang_Rapat.pdf',
                'stage' => 'leadership',
                'admin_notes' => 'Verifikasi berkas admin lolos, menunggu paraf pimpinan WD III.',
                'submitted_at' => $today->copy()->subHours(8),
            ],
            [
                'code' => 'RK-2026-084',
                'event' => 'Pameran Karya Fotografi & Desain',
                'ormawa' => 'HMPD / HMPDG',
                'pic' => 'Rizky Fadillah',
                'phone' => '0813-8899-7766',
                'room_id' => 5,
                'room_name' => 'Amphitheater Terbuka',
                'date' => $today->copy()->addDays(3)->format('Y-m-d'),
                'start' => '09:00',
                'end' => '16:00',
                'participants' => 90,
                'notes' => 'Pameran karya fotografi terbuka untuk umum se-Fakultas.',
                'proposal_name' => 'Proposal_Pameran_Karya.pdf',
                'letter_name' => 'Surat_Izin_Keramaian.pdf',
                'stage' => 'revision',
                'admin_notes' => 'Lampiran denah tata ruang panel belum disertakan dan rincian kebersihan aula wajib dilampirkan.',
                'submitted_at' => $today->copy()->subDays(3),
            ],
        ];

        foreach ($data as $item) {
            $permit = Permit::updateOrCreate(
                ['code' => $item['code']],
                $item
            );

            PermitHistory::firstOrCreate(
                [
                    'permit_id' => $permit->id,
                    'to_stage' => $item['stage'],
                ],
                [
                    'user_id' => $admin?->id,
                    'actor_name' => $admin?->name ?? 'Admin RuangKita',
                    'from_stage' => 'submitted',
                    'to_stage' => $item['stage'],
                    'action' => match ($item['stage']) {
                        'approved' => 'approved',
                        'revision' => 'revision_requested',
                        'leadership' => 'verified',
                        default => 'submitted',
                    },
                    'notes' => $item['admin_notes'] ?? 'Pengajuan masuk ke sistem.',
                ]
            );
        }
    }
}
