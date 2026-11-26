# RuangKita Docs

Dokumentasi resmi **Tata Tertib & Panduan RuangKita** yang dibangun menggunakan [Docusaurus](https://docusaurus.io/) berbasis Markdown (`.md`).

## Lokasi File Dokumentasi

Seluruh halaman dokumentasi berada di folder `docs/`:
- `01-pengantar.md` — Alur Pengajuan & Panduan Utama
- `02-tata-tertib.md` — Tata Tertib Ruangan
- `03-dokumen-wajib.md` — Dokumen Wajib & Persyaratan Berkas
- `04-jam-operasional-kontak.md` — Jam Operasional & Kontak Admin
- `05-faq.md` — Pertanyaan Umum (FAQ)

## Pengembangan & Build

```bash
# Install dependensi (pertama kali)
npm install

# Jalankan server preview lokal
npm start

# Build statis ke folder public/docs Laravel
npx docusaurus build --out-dir ../public/docs
```
