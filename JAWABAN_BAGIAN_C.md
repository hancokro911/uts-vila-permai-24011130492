# LEMBAR JAWABAN UJIAN TENGAH SEMESTER (UTS) GANJIL T.A. 2026/2027
## BAGIAN C – ANALISIS DAN PEMAHAMAN KONSEP (BOBOT: 25 POIN)

- **Mata Kuliah:** Teknologi Web (200551232) – 3 SKS
- **Program Studi:** Manajemen Informatika
- **Kelas:** MI5BP
- **Fakultas:** Teknologi Informasi dan Digital, Universitas Bani Saleh
- **Dosen Pengampu:** Rahmadi, S.Kom., M.Kom.
- **Nama Mahasiswa:** Raihan Nur Falah
- **N.I.M:** 24011130492
- **Hari, Tanggal Ujian:** Sabtu, 7 November 2026

---

### SOAL 1: Evolusi Web (5 Poin)
**Pertanyaan:**
*Uraikan karakteristik Web 1.0, Web 2.0, dan Web 3.0, lalu berikan satu contoh peran masing-masing era terhadap perkembangan web di Indonesia.*

**Jawaban:**

Evolusi web mencerminkan pergeseran paradigma dari penyampaian informasi satu arah menjadi ekosistem partisipatif dan desentralisasi data cerdas:

1. **Web 1.0 (The Read-Only Web / Web Statis):**
   - **Karakteristik:** Halaman web bersifat statis dan searah (monolog). Konten dibuat oleh *webmaster* dan pengguna hanya bertindak sebagai pembaca pasif (*consumers*). Teknologi dominan menggunakan HTML murni, CSS dasar, tabel untuk tata letak, teks hyperlink, serta minim atau tanpa interaktivitas dinamis maupun basis data kompleks.
   - **Contoh & Peran di Indonesia:** Kemunculan portal berita online pionir seperti **Detik.com (berdiri 1998)** dan situs-situs direktori/instansi pemerintah era awal 2000-an. Pada masa krisis moneter dan reformasi 1998, Detik.com membuktikan peran krusial Web 1.0 sebagai penyedia informasi politik dan ekonomi tercepat bagi masyarakat Indonesia tanpa harus menunggu cetakan koran fisik keesokan harinya.

2. **Web 2.0 (The Read-Write & Social Web / Web Interaktif):**
   - **Karakteristik:** Pengguna beralih menjadi pencipta konten aktif (*User-Generated Content*). Web berubah menjadi platform dinamis dua arah yang kolaboratif, berbasis komunitas, dan memanfaatkan teknologi seperti AJAX, RESTful API, JavaScript framework, CSS responsif, serta basis data relasional.
   - **Contoh & Peran di Indonesia:** Lahirnya forum komunitas online terbesar **Kaskus**, serta raksasa *e-commerce* dan *on-demand service* nasional seperti **Tokopedia, Bukalapak, dan Gojek (2009–2015)**. Era Web 2.0 merevolusi gaya hidup dan ekonomi digital Indonesia secara masif, mendemokratisasi perdagangan UMKM antar-pulau melalui sistem transaksi interaktif dan ulasan pengguna real-time.

3. **Web 3.0 (The Semantic, Decentralized & Intelligent Web):**
   - **Karakteristik:** Menitikberatkan pada kecerdasan buatan (*Machine Learning/AI*), web semantik (*data machine-readable*), serta kepemilikan data terdesentralisasi (*Decentralization*) menggunakan teknologi buku besar terdistribusi (*Blockchain*), *smart contracts*, dan identitas berdaulat (*Self-Sovereign Identity / Web3 wallets*).
   - **Contoh & Peran di Indonesia:** Tumbuhnya platform pertukaran aset kripto berizin Bappebti seperti **Indodax, Pintu, dan Tokocrypto**, integrasi identitas digital berbasis blockchain di perbankan digital, serta proyek tokenisasi ekonomi kreatif (seperti ekosistem Web3 game dan karya seni digital lokal). Web 3.0 membuka akses kedaulatan finansial, transparansi kepemilikan aset digital tanpa perantara (*trustless*), dan otomatisasi berbasis protokol pintar bagi masyarakat Indonesia.

---

### SOAL 2: Arsitektur Client–Server (5 Poin)
**Pertanyaan:**
*Pada halaman web yang Anda buat, jelaskan alur permintaan dan respons (request–response) mulai dari pengunjung membuka halaman hingga data tampil. Sebutkan komponen yang terlibat (browser, DNS, server) dan metode serta status code HTTP yang terlibat.*

**Jawaban:**

Alur siklus hidup komunikasi *Request–Response* pada aplikasi web "Vila Permai" berlangsung melalui tahapan-tahapan sistematis berikut:

```
[Pengguna mengetik URL] 
       │
       ▼
 [Web Browser] ──── (1. DNS Lookup: Cari IP) ────► [DNS Server]
       │                                                │
       │◄─── (2. Berikan IP Address Server Hosting) ────┘
       │
       ├─── (3. HTTP GET /uts-vila-permai/index.html) ───► [Web Server (GitHub Pages)]
       │◄── (4. HTTP 200 OK + Payload index.html) ────────┤
       │                                                  │
       ├─── (5. HTTP GET /style.css & script.js) ─────────►│
       │◄── (6. HTTP 200 OK / 304 Not Modified) ──────────┘
       │
       ▼
[DOM & CSSOM Tree Built -> Eksekusi script.js -> Data Vila Dirender ke Layar]
```

1. **Resolusi Alamat IP oleh DNS (DNS Lookup):**
   - Calon tamu mengetikkan URL aplikasi (misal: `https://username.github.io/uts-vila-permai/`) pada address bar peramban (*browser*).
   - Komponen **Browser** memeriksa *cache* lokal; jika belum ada, browser mengirimkan *DNS Query* ke **DNS Server** untuk menerjemahkan nama domain `username.github.io` menjadi alamat IP publik server tujuan (misal: `185.199.108.153`).

2. **Pengiriman Permintaan Dokumen Utama (HTTP Request):**
   - Browser melakukan jabat tangan TCP (*TCP 3-Way Handshake*) dan negosiasi keamanan TLS/SSL (enkripsi HTTPS) ke server hosting.
   - Komponen **Browser** mengirimkan instruksi permintaan awal dengan metode **`GET`**:
     `GET /uts-vila-permai/index.html HTTP/2`
     Disertai header seperti `Host`, `User-Agent`, dan `Accept: text/html`.

3. **Pemrosesan dan Pengiriman Respons Dokumen oleh Server:**
   - Komponen **Web Server** (server statis GitHub Pages / Nginx / Apache) membaca direktori file, menemukan berkas `index.html`, dan mengembalikannya ke browser dengan:
     - **Status Code: `200 OK`** (artinya berkas ditemukan dan berhasil disajikan),
     - Header `Content-Type: text/html; charset=UTF-8`,
     - *Payload/Body* berupa kode HTML5 aplikasi.

4. **Parsing HTML dan Permintaan Sub-Resource (CSS & JavaScript):**
   - Browser mulai membaca baris HTML (*HTML Parsing*) dan membangun *DOM Tree*.
   - Saat mendeteksi tag `<link rel="stylesheet" href="style.css">` dan `<script src="script.js">`, browser mengirimkan permintaan HTTP **`GET`** lanjutan untuk file `style.css` dan `script.js`.
   - Server merespons dengan:
     - **`200 OK`** jika file diunduh pertama kali, atau
     - **`304 Not Modified`** jika berkas CSS/JS sudah tersimpan di *browser cache* dan belum ada modifikasi baru (menghemat penggunaan bandwidth).

5. **Eksekusi Sisi Klien (*Client-Side Execution*) & Penyajian Tampilan:**
   - Browser menyusun *CSSOM Tree*, menggabungkannya dengan DOM menjadi *Render Tree*, lalu melakukan proses *Layout* dan *Painting*.
   - JavaScript engine mengeksekusi `script.js` pada event `DOMContentLoaded`: array objek vila diakses, fungsi `renderDaftarVila()` membuat elemen kartu via `document.createElement()`, kalkulasi biaya dihitung otomatis, dan data `localStorage` dimuat ke tabel riwayat. Halaman web interaktif pun tersaji sempurna di depan mata pengguna.

---

### SOAL 3: Peran HTML, CSS, dan JavaScript (5 Poin)
**Pertanyaan:**
*Jelaskan peran HTML, CSS, dan JavaScript dalam halaman yang Anda buat, masing-masing disertai satu contoh konkret dari kode Anda sendiri.*

**Jawaban:**

Ketiga teknologi ini membentuk trinitas fundamental arsitektur front-end dengan pemisahan tugas (*Separation of Concerns*) yang sangat jelas:

1. **HTML (HyperText Markup Language) – Peran: Struktur dan Semantik Dokumen**
   - **Peran:** Bertindak sebagai kerangka tulang punggung (*skeleton*) yang menyusun struktur dokumen, mengelompokkan konten secara hierarkis dan semantik agar dapat dipahami oleh peramban web, mesin pencari (*SEO*), maupun pembaca layar (*screen readers* untuk aksesibilitas difabel).
   - **Contoh Konkret dari Kode:**
     Penggunaan elemen semantik form, hierarki heading, dan seksi struktural pada `index.html`:
     ```html
     <section id="pemesanan" class="booking-section">
       <div class="container">
         <h2 class="section-title">Formulir Pemesanan Vila</h2>
         <form id="formPemesanan" class="booking-form" novalidate>
           <div class="form-group">
             <label for="namaTamu" class="form-label">Nama Lengkap Pemesan</label>
             <input type="text" id="namaTamu" name="namaTamu" class="form-control" required>
           </div>
         </form>
       </div>
     </section>
     ```

2. **CSS (Cascading Style Sheets) – Peran: Presentasi Visual, Tata Letak, dan Responsivitas**
   - **Peran:** Bertindak sebagai kulit estetika (*presentation & styling*) yang mengatur tata letak multi-kolom (Grid & Flexbox), tipografi, palet warna, konsistensi Box Model (*padding, border, margin*), efek hover interaktif, serta adaptasi layar ponsel via *Media Queries*.
   - **Contoh Konkret dari Kode:**
     Penerapan CSS Grid responsif dengan breakpoint pada `style.css`:
     ```css
     .villa-grid {
       display: grid;
       grid-template-columns: repeat(3, 1fr);
       gap: 24px;
     }

     /* Breakpoint untuk layar ponsel: berubah dari 3 kolom menjadi 1 kolom penuh */
     @media (max-width: 480px) {
       .villa-grid {
         grid-template-columns: 1fr;
       }
       .form-row {
         flex-direction: column;
       }
     }
     ```

3. **JavaScript – Peran: Perilaku Dinamis, Logika Bisnis, dan Manipulasi DOM**
   - **Peran:** Bertindak sebagai sistem saraf dan otak (*behavior & dynamic logic*) yang membuat halaman menjadi interaktif dan responsif terhadap aksi pengguna. JavaScript memanipulasi DOM secara dinamis tanpa reload halaman, menghitung kalkulasi matematika secara otomatis, memvalidasi form, dan mengelola persistensi lokal (*localStorage*).
   - **Contoh Konkret dari Kode:**
     Fungsi kalkulasi otomatis real-time pada `script.js`:
     ```javascript
     function hitungTotalHarga() {
       const vilaId = pilihanVilaSelect.value;
       const dIn = new Date(tglCheckInInput.value);
       const dOut = new Date(tglCheckOutInput.value);
       const durasiMalam = Math.ceil((dOut - dIn) / (1000 * 60 * 60 * 24));
       const vila = dataVila.find(v => v.id === vilaId);

       if (vila && durasiMalam > 0) {
         const total = vila.hargaPerMalam * durasiMalam;
         summaryTotalBiaya.textContent = formatRupiah(total);
       }
     }
     ```

---

### SOAL 4: Arsitektur Back-End (5 Poin)
**Pertanyaan:**
*Bandingkan arsitektur monolithic dan microservice, jelaskan kapan masing-masing lebih tepat dipakai, dan posisi halaman web yang Anda unggah ke GitHub Pages pada kedua kategori tersebut.*

**Jawaban:**

1. **Perbandingan Arsitektur Monolithic vs. Microservice:**

| Parameter | Arsitektur Monolithic | Arsitektur Microservice |
| :--- | :--- | :--- |
| **Konsep Desain** | Seluruh komponen (User Interface, logika bisnis server, otentikasi, akses basis data) disatukan dalam satu basis kode (*single codebase*) dan berjalan dalam satu proses unit (*single deployable unit*). | Sistem dipecah menjadi kumpulan layanan independen berukuran kecil (*loosely-coupled*), di mana tiap layanan menangani satu domain bisnis (*Single Responsibility*) dan memiliki database tersendiri. |
| **Komunikasi Antar Modul** | Melalui pemanggilan fungsi internal memori (*in-memory function calls*). Kecepatan eksekusi sangat tinggi tanpa latensi jaringan. | Melalui protokol jaringan terdistribusi seperti RESTful API (HTTP/JSON), gRPC, atau *message broker* (RabbitMQ, Apache Kafka). |
| **Deployment & Rilis** | Satu paket tunggal. Jika ada perubahan kecil pada modul pembayaran, seluruh sistem aplikasi harus di-build dan di-deploy ulang. | Tiap *service* dapat di-deploy secara mandiri (*independent deployment*) menggunakan kontainer (Docker/Kubernetes) tanpa mengganggu layanan lain. |
| **Skalabilitas (*Scalability*)** | Skalabilitas horizontal dilakukan dengan menggandakan seluruh instance aplikasi (*all-or-nothing*), yang boros sumber daya komputasi. | Skalabilitas sangat fleksibel (*granular*). Hanya layanan yang mengalami beban tinggi (misal: *service search* atau *checkout*) yang diperbanyak replikanya. |
| **Kompleksitas Operasional** | Rendah. Pengujian (*end-to-end testing*), *debugging*, dan pemantauan log terpusat dan mudah di awal proyek. | Tinggi. Memerlukan infrastruktur DevOps yang matang (*service discovery, API gateway, distributed tracing, network resilience*). |

2. **Kapan Masing-Masing Lebih Tepat Dipakai:**
   - **Monolithic tepat dipakai ketika:** Proyek aplikasi berada pada tahap awal / MVP (*Minimum Viable Product*), kebutuhan bisnis masih dinamis berubah, skala pengguna masih kecil hingga menengah, anggaran infrastruktur terbatas, dan tim pengembang berukuran kecil (1–5 orang).
   - **Microservice tepat dipakai ketika:** Aplikasi sudah berskala besar (*enterprise*), traffic pengguna sangat tinggi dan heterogen, sistem ditangani oleh banyak tim pengembang terpisah (*cross-functional squads*), serta membutuhkan ketersediaan tinggi (*high availability*) di mana kegagalan satu komponen tidak boleh merobohkan keseluruhan sistem.

3. **Posisi Halaman Web "Vila Permai" pada GitHub Pages:**
   - Halaman web Vila Permai yang di-host di GitHub Pages berada pada kategori **Pure Client-Side Static Web Application (Arsitektur Jamstack / Serverless Client-Side)**.
   - Halaman ini **TIDAK** menggunakan server monolithic maupun backend microservice, karena tidak ada proses komputasi dinamis di sisi server (*zero backend code*). Seluruh berkas (HTML, CSS, JS) disimpan di jaringan distribusi konten (CDN) GitHub Pages dan disajikan langsung ke browser klien. Seluruh logika data dan manipulasi status berjalan sepenuhnya pada browser pengguna (*in-browser processing* menggunakan array objek JavaScript dan *localStorage*).
   - **Relevansi di Masa Depan:** Jika Pak Hendra ingin menghubungkan web ini ke sistem pembayaran otomatis atau database terpusat, arsitektur frontend statis ini dapat bertindak sebagai *decoupled front-end* yang mengonsumsi *endpoints* REST API, baik yang dilayani oleh backend monolithic sederhana (misal: server Express.js tunggal) maupun backend microservices (misal: *booking-service* dan *payment-service* terpisah).

---

### SOAL 5: Git dan Version Control (5 Poin)
**Pertanyaan:**
*Sebutkan minimal tiga perintah git yang Anda gunakan beserta fungsi masing-masing, lalu jelaskan apa yang terjadi apabila perubahan tidak di-commit lebih dahulu sebelum di-push.*

**Jawaban:**

1. **Tiga Perintah Git yang Digunakan Beserta Fungsinya:**
   - **`git add <file / .>`:**
     *Fungsi:* Memindahkan perubahan berkas dari *Working Directory* (area kerja lokal tempat kita mengedit kode) ke dalam *Staging Area* (indeks persiapan). Perintah ini menandai berkas-berkas mana saja yang siap untuk direkam ke dalam snapshot versi berikutnya.
   - **`git commit -m "<pesan log>"`:**
     *Fungsi:* Mengambil seluruh perubahan yang telah ada di *Staging Area* dan menyimpannya secara permanen sebagai satu unit snapshot sejarah (*commit*) baru ke dalam *Local Repository*. Disertai pesan log yang bermakna untuk menjelaskan tujuan perubahan tersebut.
   - **`git push <remote> <branch>` (contoh: `git push -u origin main`):**
     *Fungsi:* Mengunggah (*upload*) seluruh riwayat commit yang ada pada *Local Repository* komputer pengembang menuju ke *Remote Repository* di server awan (seperti GitHub), sehingga kode dan riwayat pengerjaan dapat diakses secara publik oleh dosen dan tim penilai.
   *(Perintah tambahan yang mendukung integritas: `git status` untuk memeriksa kondisi berkas dan `git log --oneline` untuk melihat riwayat commit).*

2. **Apa yang Terjadi Apabila Perubahan Tidak Di-Commit Lebih Dahulu Sebelum Di-Push:**
   - Perintah `git push` bekerja secara eksklusif dengan membaca riwayat **commit** yang telah tercatat di basis data *Local Repository* (`.git/objects`).
   - Apabila seorang mahasiswa mengedit kode di editor (misal menambah file baru atau mengubah `index.html`), perubahan tersebut barulah berstatus *unstaged changes* di *Working Directory* (atau paling jauh berada di *Staging Area* jika baru menjalankan `git add`).
   - Jika mahasiswa langsung mengeksekusi `git push origin main` tanpa menjalankan `git commit` terlebih dahulu, maka:
     1. **Git tidak menemukan snapshot baru:** Terminal Git akan mengeluarkan pesan konfirmasi:  
        `Everything up-to-date`
     2. **Perubahan tidak terunggah ke GitHub:** Berkas yang diedit atau file baru **TIDAK AKAN PERNAH** terkirim ke server GitHub.
     3. **Kerugian Fatal pada Penilaian Akademik:** Saat dosen pengampu atau tim asisten membuka tautan repository GitHub publik mahasiswa, repository tersebut akan tampak kosong atau hanya berisi file inisialisasi awal. Riwayat commit yang diwajibkan (minimal 4 commit bermakna) tidak akan tertera pada *Commit History* GitHub, sehingga mahasiswa akan kehilangan poin penuh pada Bagian B (bobot 30 poin) sesuai butir 4 dan 6 Ketentuan Ujian.

---
*Lembar jawaban ini disusun secara mandiri, komprehensif, dan sistematis sesuai materi perkuliahan Teknologi Web.*
