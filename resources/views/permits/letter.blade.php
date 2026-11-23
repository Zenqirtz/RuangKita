<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Surat Izin Penggunaan Ruangan - {{ $permit->code }}</title>
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=plus-jakarta-sans:400,500,600,700,800" rel="stylesheet" />
    <style>
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }

        body {
            background-color: #f1f5f9;
            font-family: "Times New Roman", Times, Georgia, serif;
            color: #0f172a;
            line-height: 1.5;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
        }

        /* Top Action Bar (Screen Only) */
        .topbar {
            background: #ffffff;
            border-bottom: 1px solid #e2e8f0;
            padding: 12px 24px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            position: sticky;
            top: 0;
            z-index: 50;
            font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
        }

        .topbar-left {
            display: flex;
            align-items: center;
            gap: 12px;
        }

        .btn-back {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            padding: 8px 14px;
            background: #f8fafc;
            border: 1px solid #cbd5e1;
            border-radius: 8px;
            color: #334155;
            text-decoration: none;
            font-size: 13px;
            font-weight: 600;
            transition: all 0.2s;
        }

        .btn-back:hover {
            background: #e2e8f0;
            color: #0f172a;
        }

        .btn-print {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            padding: 8px 18px;
            background: #2563eb;
            color: #ffffff;
            border: none;
            border-radius: 8px;
            font-size: 13px;
            font-weight: 700;
            cursor: pointer;
            box-shadow: 0 1px 2px rgba(37, 99, 235, 0.2);
            transition: all 0.2s;
        }

        .btn-print:hover {
            background: #1d4ed8;
        }

        .status-pill {
            display: inline-flex;
            align-items: center;
            gap: 5px;
            padding: 4px 10px;
            background: #ecfdf5;
            color: #059669;
            border: 1px solid #a7f3d0;
            border-radius: 999px;
            font-size: 11px;
            font-weight: 700;
        }

        /* Paper Sheet */
        .paper-wrapper {
            padding: 32px 16px;
            display: flex;
            justify-content: center;
        }

        .paper {
            width: 210mm;
            min-height: 297mm;
            background: #ffffff;
            padding: 20mm 20mm 20mm 25mm;
            box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.05);
            position: relative;
        }

        /* Kop Surat */
        .kop {
            display: flex;
            align-items: center;
            gap: 18px;
            padding-bottom: 8px;
        }

        .kop-logo {
            width: 78px;
            height: 78px;
            flex-shrink: 0;
        }

        .kop-text {
            text-align: center;
            flex-grow: 1;
        }

        .kop-text h3 {
            font-size: 13pt;
            font-weight: normal;
            letter-spacing: 0.5px;
            text-transform: uppercase;
        }

        .kop-text h2 {
            font-size: 14pt;
            font-weight: bold;
            letter-spacing: 0.5px;
            text-transform: uppercase;
        }

        .kop-text h1 {
            font-size: 15pt;
            font-weight: 800;
            letter-spacing: 1px;
            text-transform: uppercase;
            margin-top: 1px;
        }

        .kop-address {
            font-size: 9.5pt;
            margin-top: 2px;
            color: #1e293b;
        }

        .kop-divider {
            margin-top: 6px;
            border-top: 3px solid #000000;
            border-bottom: 1px solid #000000;
            height: 4px;
        }

        /* Letter Meta */
        .meta-table {
            width: 100%;
            margin-top: 18px;
            font-size: 11pt;
            border-collapse: collapse;
        }

        .meta-table td {
            vertical-align: top;
            padding: 2px 0;
        }

        .meta-left {
            width: 60%;
        }

        .meta-right {
            width: 40%;
            text-align: right;
        }

        .letter-recipient {
            margin-top: 18px;
            font-size: 11pt;
            line-height: 1.4;
        }

        .letter-body {
            margin-top: 16px;
            font-size: 11pt;
            text-align: justify;
            text-justify: inter-word;
            line-height: 1.5;
        }

        .detail-table {
            width: 100%;
            margin: 12px 0 12px 20px;
            font-size: 11pt;
            border-collapse: collapse;
        }

        .detail-table td {
            padding: 3px 6px;
            vertical-align: top;
        }

        .detail-table td.label {
            width: 170px;
            font-weight: bold;
        }

        .detail-table td.colon {
            width: 15px;
        }

        .detail-table td.val {
            color: #0f172a;
        }

        .rules-list {
            margin: 8px 0 12px 24px;
            font-size: 10.5pt;
            line-height: 1.45;
        }

        .rules-list li {
            margin-bottom: 3px;
        }

        /* Signatures & QR */
        .signature-section {
            margin-top: 24px;
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            page-break-inside: avoid;
        }

        .qr-box {
            display: flex;
            align-items: center;
            gap: 12px;
            border: 1px dashed #94a3b8;
            padding: 8px 12px;
            border-radius: 6px;
            max-width: 260px;
            font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
        }

        .qr-code {
            width: 64px;
            height: 64px;
            flex-shrink: 0;
        }

        .qr-info {
            font-size: 8pt;
            color: #475569;
            line-height: 1.3;
        }

        .qr-info strong {
            color: #0f172a;
            display: block;
            margin-bottom: 2px;
        }

        .signature-box {
            width: 250px;
            text-align: left;
            font-size: 11pt;
            line-height: 1.35;
        }

        .digital-stamp {
            position: relative;
            height: 70px;
            margin: 4px 0;
            display: flex;
            align-items: center;
        }

        .stamp-badge {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            padding: 5px 10px;
            background: #eff6ff;
            border: 1px solid #bfdbfe;
            border-radius: 6px;
            color: #1d4ed8;
            font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
            font-size: 9pt;
            font-weight: 700;
        }

        .footer-note {
            margin-top: 28px;
            padding-top: 8px;
            border-top: 1px solid #e2e8f0;
            font-size: 8pt;
            color: #64748b;
            font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
            display: flex;
            justify-content: space-between;
        }

        /* Print Media Settings */
        @media print {
            body {
                background: #ffffff !important;
                margin: 0 !important;
                padding: 0 !important;
            }

            .topbar {
                display: none !important;
            }

            .paper-wrapper {
                padding: 0 !important;
                display: block !important;
            }

            .paper {
                width: 100% !important;
                min-height: auto !important;
                box-shadow: none !important;
                padding: 0 !important;
                margin: 0 !important;
            }

            @page {
                size: A4 portrait;
                margin: 15mm 20mm 15mm 25mm;
            }
        }
    </style>
</head>
<body>

    <!-- Screen Action Topbar -->
    <header class="topbar">
        <div class="topbar-left">
            <a href="{{ route('permits.show', $permit->code) }}" class="btn-back">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
                Kembali ke Detail
            </a>
            <span class="status-pill">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                Disetujui Resmi (Approved)
            </span>
        </div>
        <div>
            <button type="button" class="btn-print" onclick="window.print()">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="6 9 6 2 18 2 18 9"></polyline>
                    <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
                    <rect x="6" y="14" width="12" height="8"></rect>
                </svg>
                Cetak / Simpan PDF
            </button>
        </div>
    </header>

    <!-- Document Paper -->
    <main class="paper-wrapper">
        <article class="paper">
            <!-- Kop Surat Resmi -->
            <div class="kop">
                <div class="kop-logo">
                    <!-- Lambang Universitas Brawijaya -->
                    <svg viewBox="0 0 100 100" class="kop-logo" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="50" cy="50" r="46" fill="#0A3A60" stroke="#D4AF37" stroke-width="4"/>
                        <circle cx="50" cy="50" r="40" fill="#0F4C81"/>
                        <path d="M50 15L61 38H39L50 15Z" fill="#FBBF24"/>
                        <path d="M35 44L50 34L65 44V70L50 80L35 70V44Z" fill="#F8FAFC" stroke="#D4AF37" stroke-width="2"/>
                        <path d="M50 40V74M40 50L60 64M60 50L40 64" stroke="#0A3A60" stroke-width="2.5" stroke-linecap="round"/>
                        <circle cx="50" cy="50" r="7" fill="#FBBF24"/>
                    </svg>
                </div>
                <div class="kop-text">
                    <h3>Kementerian Pendidikan Tinggi, Sains, dan Teknologi</h3>
                    <h2>Universitas Brawijaya</h2>
                    <h1>Fakultas Vokasi</h1>
                    <div class="kop-address">
                        Jl. Veteran No. 12-14, Malang 65145, Jawa Timur, Indonesia<br>
                        Telepon: (0341) 551611 | Laman: https://vokasi.ub.ac.id | Pos-el: vokasi@ub.ac.id
                    </div>
                </div>
            </div>
            <div class="kop-divider"></div>

            <!-- Metadata Surat -->
            <table class="meta-table">
                <tr>
                    <td class="meta-left">
                        <table style="width: 100%;">
                            <tr>
                                <td style="width: 80px;">Nomor</td>
                                <td style="width: 15px;">:</td>
                                <td>B/{{ str_pad($permit->id, 4, '0', STR_PAD_LEFT) }}/UN10.F15/KM.01.02/{{ date('Y') }}</td>
                            </tr>
                            <tr>
                                <td>Lampiran</td>
                                <td>:</td>
                                <td>-</td>
                            </tr>
                            <tr>
                                <td>Perihal</td>
                                <td>:</td>
                                <td><strong>Izin Penggunaan Ruangan dan Sarana Prasarana</strong></td>
                            </tr>
                        </table>
                    </td>
                    <td class="meta-right">
                        Malang, {{ $permit->date->translatedFormat('d F Y') }}
                    </td>
                </tr>
            </table>

            <!-- Penerima Surat -->
            <div class="letter-recipient">
                Kepada Yth.<br>
                <strong>Pengurus {{ $permit->ormawa }}</strong><br>
                Fakultas Vokasi Universitas Brawijaya<br>
                di Tempat
            </div>

            <!-- Isi Surat -->
            <div class="letter-body">
                <p>
                    Menindaklanjuti permohonan peminjaman ruangan dan sarana prasarana yang diajukan melalui Sistem Informasi <strong>RuangKita</strong> Fakultas Vokasi Universitas Brawijaya, serta setelah melalui proses verifikasi administrasi dan kelayakan kegiatan, Pimpinan Fakultas Vokasi Universitas Brawijaya dengan ini memberikan <strong>IZIN PENGGUNAAN RUANGAN</strong> kepada:
                </p>

                <table class="detail-table">
                    <tr>
                        <td class="label">Nama Organisasi</td>
                        <td class="colon">:</td>
                        <td class="val">{{ $permit->ormawa }}</td>
                    </tr>
                    <tr>
                        <td class="label">Nama Kegiatan</td>
                        <td class="colon">:</td>
                        <td class="val"><strong>{{ $permit->event }}</strong></td>
                    </tr>
                    <tr>
                        <td class="label">Penanggung Jawab (PIC)</td>
                        <td class="colon">:</td>
                        <td class="val">{{ $permit->pic }} {{ $permit->phone ? '('.$permit->phone.')' : '' }}</td>
                    </tr>
                    <tr>
                        <td class="label">Ruangan yang Dipinjam</td>
                        <td class="colon">:</td>
                        <td class="val"><strong>{{ $permit->room_name }}</strong></td>
                    </tr>
                    <tr>
                        <td class="label">Hari, Tanggal</td>
                        <td class="colon">:</td>
                        <td class="val">{{ $permit->date->translatedFormat('l, d F Y') }}</td>
                    </tr>
                    <tr>
                        <td class="label">Waktu Pelaksanaan</td>
                        <td class="colon">:</td>
                        <td class="val">{{ substr($permit->start, 0, 5) }} - {{ substr($permit->end, 0, 5) }} WIB</td>
                    </tr>
                    <tr>
                        <td class="label">Estimasi Peserta</td>
                        <td class="colon">:</td>
                        <td class="val">{{ $permit->participants ? $permit->participants . ' Orang' : '-' }}</td>
                    </tr>
                    <tr>
                        <td class="label">Kode Izin RuangKita</td>
                        <td class="colon">:</td>
                        <td class="val"><code>{{ $permit->code }}</code></td>
                    </tr>
                </table>

                <p>
                    Izin ini diberikan dengan kewajiban mematuhi ketentuan tata tertib sarana dan prasarana di lingkungan Fakultas Vokasi Universitas Brawijaya, antara lain:
                </p>
                <ol class="rules-list">
                    <li>Wajib menjaga kebersihan, ketertiban, dan keutuhan seluruh fasilitas di dalam maupun sekitar ruangan yang digunakan.</li>
                    <li>Dilarang mengubah tata letak instalasi listrik/elektronik atau memindahkan inventaris ke tempat lain tanpa izin tertulis dari Bagian Sarana dan Prasarana.</li>
                    <li>Memastikan proyektor LCD, pendingin ruangan (AC), lampu, dan perangkat suara telah dimatikan serta ruangan terkunci kembali setelah kegiatan selesai.</li>
                    <li>Menunjukkan lembar surat izin ini kepada <strong>Petugas Keamanan (Satpam)</strong> dan Pengelola Gedung saat hendak mengakses ruangan.</li>
                </ol>
                <p>
                    Demikian surat izin ini diterbitkan untuk dipergunakan sebagaimana mestinya dengan penuh rasa tanggung jawab.
                </p>
            </div>

            <!-- Tanda Tangan & QR Validasi -->
            <div class="signature-section">
                <div class="qr-box">
                    <svg class="qr-code" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <!-- Pola QR Code Representatif -->
                        <rect width="100" height="100" fill="white"/>
                        <!-- Marker Top-Left -->
                        <rect x="10" y="10" width="24" height="24" fill="#0f172a" rx="3"/>
                        <rect x="15" y="15" width="14" height="14" fill="white"/>
                        <rect x="18" y="18" width="8" height="8" fill="#0f172a"/>
                        <!-- Marker Top-Right -->
                        <rect x="66" y="10" width="24" height="24" fill="#0f172a" rx="3"/>
                        <rect x="71" y="15" width="14" height="14" fill="white"/>
                        <rect x="74" y="18" width="8" height="8" fill="#0f172a"/>
                        <!-- Marker Bottom-Left -->
                        <rect x="10" y="66" width="24" height="24" fill="#0f172a" rx="3"/>
                        <rect x="15" y="71" width="14" height="14" fill="white"/>
                        <rect x="18" y="74" width="8" height="8" fill="#0f172a"/>
                        <!-- QR Pixels -->
                        <rect x="42" y="12" width="6" height="6" fill="#0f172a"/>
                        <rect x="52" y="12" width="6" height="6" fill="#0f172a"/>
                        <rect x="42" y="24" width="6" height="6" fill="#0f172a"/>
                        <rect x="48" y="32" width="6" height="6" fill="#0f172a"/>
                        <rect x="12" y="44" width="6" height="6" fill="#0f172a"/>
                        <rect x="24" y="44" width="6" height="6" fill="#0f172a"/>
                        <rect x="36" y="44" width="6" height="6" fill="#0f172a"/>
                        <rect x="48" y="44" width="6" height="6" fill="#0f172a"/>
                        <rect x="60" y="44" width="6" height="6" fill="#0f172a"/>
                        <rect x="72" y="44" width="6" height="6" fill="#0f172a"/>
                        <rect x="84" y="44" width="6" height="6" fill="#0f172a"/>
                        <rect x="44" y="56" width="6" height="6" fill="#0f172a"/>
                        <rect x="56" y="56" width="6" height="6" fill="#0f172a"/>
                        <rect x="68" y="56" width="6" height="6" fill="#0f172a"/>
                        <rect x="42" y="68" width="6" height="6" fill="#0f172a"/>
                        <rect x="54" y="68" width="6" height="6" fill="#0f172a"/>
                        <rect x="66" y="68" width="6" height="6" fill="#0f172a"/>
                        <rect x="78" y="68" width="6" height="6" fill="#0f172a"/>
                        <rect x="48" y="80" width="6" height="6" fill="#0f172a"/>
                        <rect x="60" y="80" width="6" height="6" fill="#0f172a"/>
                        <rect x="72" y="80" width="6" height="6" fill="#0f172a"/>
                        <rect x="84" y="80" width="6" height="6" fill="#0f172a"/>
                    </svg>
                    <div class="qr-info">
                        <strong>Verifikasi Dokumen</strong>
                        <span>Kode: {{ $permit->code }}</span><br>
                        <span>Status: Sah & Disetujui</span><br>
                        <span>Sistem RuangKita Vokasi UB</span>
                    </div>
                </div>

                <div class="signature-box">
                    <div>An. Dekan,</div>
                    <div>Wakil Dekan Bidang Kemahasiswaan, Alumni, dan Kewirausahaan Mahasiswa</div>
                    <div class="digital-stamp">
                        <div class="stamp-badge">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                                <polyline points="9 12 11 14 15 10"/>
                            </svg>
                            Ditandatangani secara elektronik
                        </div>
                    </div>
                    <div><strong>Dr. rer. pol. Romy Hermawan, S.Sos., M.AP.</strong></div>
                    <div>NIP 197808122005011002</div>
                </div>
            </div>

            <!-- Footer Note -->
            <div class="footer-note">
                <span>Dokumen resmi ini diterbitkan secara otomatis oleh Sistem RuangKita Fakultas Vokasi Universitas Brawijaya.</span>
                <span>Halaman 1 dari 1</span>
            </div>
        </article>
    </main>

</body>
</html>
