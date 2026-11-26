<p align="center">
  <img src="public/images/logo.svg" width="260" alt="RuangKita Logo">
</p>

<p align="center">
  <strong>Platform Peminjaman Ruangan &amp; Pelacakan Izin Kegiatan Mahasiswa</strong><br>
  Universitas Brawijaya
</p>

---

## About RuangKita

**RuangKita** adalah aplikasi web terintegrasi yang memudahkan organisasi mahasiswa (Ormawa) dan civitas akademika Universitas Brawijaya dalam memeriksa ketersediaan ruangan, mengajukan peminjaman secara daring, mengunggah berkas proposal, serta memantau progres persetujuan izin secara *real-time* hingga surat izin resmi diterbitkan.

## Fitur Utama

- **Autentikasi Kampus Terverifikasi:** Registrasi dan login khusus menggunakan email resmi `@student.ub.ac.id` lengkap dengan validasi **NIM**.
- **Dashboard & Performance Overview:** Ringkasan statistik pengajuan, *donut chart* status izin, daftar pengajuan terkini, kalender mini, dan akses cepat.
- **Kalender Live & Anti Double-Booking:** Pantau jadwal pemakaian 5 ruangan fakultas secara langsung dengan sistem **Auto Conflict Check** otomatis untuk mencegah bentrok jadwal.
- **Peminjaman & Izin Terpusat:** Satu pintu untuk pengajuan baru, pelacakan status 4 tahap (Pengajuan → Verifikasi Admin → Paraf WD III → Disetujui), catatan revisi, riwayat peminjaman, serta unduh **Surat Izin Resmi**.
- **Daftar Ruangan Fakultas:** Informasi kapasitas, fasilitas, dan status ketersediaan setiap ruangan.
- **Dokumentasi Tata Tertib (Docusaurus):** Panduan lengkap berbasis Markdown (`.md`) yang dapat diakses di `/docs/`.
- **Ketentuan & Privasi:** Halaman khusus Syarat & Ketentuan serta Kebijakan Privasi pengguna.

## Tech Stack

- **Backend:** Laravel 11 (PHP 8.2+), Laravel Breeze, Inertia.js
- **Frontend:** React 18, Tailwind CSS, Vite
- **Database:** MySQL / SQLite
- **Dokumentasi:** Docusaurus v3 (Markdown)
- **Testing:** PHPUnit

## Instalasi & Menjalankan Secara Lokal

### 1. Clone & Install Dependensi
```bash
git clone git@github.com:Zenqirtz/RuangKita.git
cd RuangKita

composer install
npm install
```

### 2. Konfigurasi Environment & Database
Salin `.env.example` menjadi `.env`, buat *app key*, dan sesuaikan konfigurasi database (MySQL atau SQLite):
```bash
cp .env.example .env
php artisan key:generate
```

Contoh konfigurasi MySQL di `.env`:
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=ruangkita
DB_USERNAME=root
DB_PASSWORD=
```

Lalu jalankan migrasi dan seeder:
```bash
php artisan migrate --seed
php artisan db:seed --class=PermitSeeder
```

### 3. Jalankan Aplikasi
```bash
# Terminal 1 - Server Laravel
php artisan serve

# Terminal 2 - Vite Dev Server (atau npm run build)
npm run dev
```
Aplikasi dapat diakses melalui [http://127.0.0.1:8000](http://127.0.0.1:8000).

## Dokumentasi Tata Tertib (Docusaurus)

Sumber dokumentasi berada di folder `docs/docs/` dalam format `.md` dan hasil *build* statisnya tersaji langsung di `/docs/`.

```bash
cd docs
npm install

# Live preview saat mengedit file .md
npm start

# Build ulang agar tampil di http://127.0.0.1:8000/docs/
npx docusaurus build --out-dir ../public/docs
```

## Pengujian (Testing)

Jalankan seluruh *automated test* menggunakan PHPUnit:
```bash
php artisan test
```

## Lisensi

Proyek ini menggunakan lisensi [MIT](https://opensource.org/licenses/MIT).
