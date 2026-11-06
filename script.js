/**
 * ==========================================================================
 * Vila Permai - Logika Aplikasi Pemesanan Vila (script.js)
 * Ujian Tengah Semester - Teknologi Web (Universitas Bani Saleh)
 * Fitur: Render DOM Dinamis (createElement & appendChild), Validasi Bahasa Indonesia,
 *        Kalkulasi Biaya Real-Time Otomatis, Filter/Pencarian, & Persistensi localStorage
 * ==========================================================================
 */

// Menjalankan skrip setelah seluruh struktur DOM siap
document.addEventListener("DOMContentLoaded", () => {

  /* ==========================================================================
     1. BASIS DATA VILA (Array of Objects di Sisi Klien - Tanpa Back-End)
     ========================================================================== */
  const dataVila = [
    {
      id: "vila-anggrek",
      nama: "Vila Anggrek (Keluarga)",
      tipeKamar: "3 Kamar Tidur (Kapasitas s.d. 6 Orang)",
      lokasi: "Jl. Kolonel Bustomi, Cisarua, Puncak",
      hargaPerMalam: 1250000,
      fasilitas: [
        "Kolam Renang Anak & Dewasa",
        "Dapur Lengkap & Alat Masak",
        "WiFi Kecepatan Tinggi & Smart TV",
        "Water Heater & Alat Mandi",
        "Taman Asri & Area Bermain"
      ],
      status: "Tersedia",
      ikon: "🏡"
    },
    {
      id: "vila-bougenville",
      nama: "Vila Bougenville (Private Pool Deluxe)",
      tipeKamar: "4 Kamar Tidur Deluxe (Kapasitas s.d. 8 Orang)",
      lokasi: "Kawasan Megamendung Atas, Puncak",
      hargaPerMalam: 1850000,
      fasilitas: [
        "Private Infinity Pool View Gunung",
        "Billiard & Ruang Karaoke Keluarga",
        "Area BBQ Luas & Gazebo Santai",
        "WiFi 50 Mbps & TV Kabel",
        "Dispenser, Kulkas & Microwave"
      ],
      status: "Tersedia",
      ikon: "🌿"
    },
    {
      id: "vila-cemara",
      nama: "Vila Cemara (Grup / Gathering)",
      tipeKamar: "5 Kamar Tidur + Aula Luas (Kapasitas s.d. 10 Orang)",
      lokasi: "Tugu Selatan, Cisarua, Puncak",
      hargaPerMalam: 2500000,
      fasilitas: [
        "Aula Serbaguna untuk Rapat / Arisan",
        "Halaman Rumput Luas untuk Outbound",
        "Kolam Renang Privat Berair Hangat",
        "Sound System & Peralatan Karaoke",
        "Parkir Muat hingga 6 Mobil"
      ],
      status: "Tersedia",
      ikon: "🌲"
    }
  ];

  /* ==========================================================================
     2. REFERENSI ELEMEN DOM (Document Object Model)
     ========================================================================== */
  const daftarVilaContainer = document.getElementById("daftarVila");
  const statusKosongEl = document.getElementById("statusKosong");
  const inputPencarian = document.getElementById("inputPencarian");
  const filterStatus = document.getElementById("filterStatus");
  const btnResetFilter = document.getElementById("btnResetFilter");

  const formPemesanan = document.getElementById("formPemesanan");
  const namaTamuInput = document.getElementById("namaTamu");
  const pilihanVilaSelect = document.getElementById("pilihanVila");
  const tglCheckInInput = document.getElementById("tglCheckIn");
  const tglCheckOutInput = document.getElementById("tglCheckOut");
  const jumlahTamuInput = document.getElementById("jumlahTamu");
  const btnCekKetersediaan = document.getElementById("btnCekKetersediaan");
  const pesanNotifikasiBox = document.getElementById("pesanNotifikasi");

  // Elemen Kotak Ringkasan Biaya Real-Time
  const summaryNamaVila = document.getElementById("summaryNamaVila");
  const summaryHargaMalam = document.getElementById("summaryHargaMalam");
  const summaryDurasiMalam = document.getElementById("summaryDurasiMalam");
  const summaryJumlahTamu = document.getElementById("summaryJumlahTamu");
  const summaryStatusVila = document.getElementById("summaryStatusVila");
  const summaryTotalBiaya = document.getElementById("summaryTotalBiaya");

  // Elemen Riwayat Pesanan
  const tabelRiwayatBody = document.getElementById("tabelRiwayatBody");
  const riwayatKosongEl = document.getElementById("riwayatKosong");
  const tabelContainerEl = document.getElementById("tabelRiwayatContainer");
  const btnHapusRiwayat = document.getElementById("btnHapusRiwayat");

  /* ==========================================================================
     3. FUNGSI UTILITAS: Format Rupiah & Manipulasi Tanggal
     ========================================================================== */
  function formatRupiah(angka) {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0
    }).format(angka);
  }

  // Mendapatkan string format tanggal hari ini (YYYY-MM-DD)
  function getHariIniString() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  // Mengatur batas minimal input tanggal agar tidak bisa memilih tanggal masa lalu
  function inisialisasiBatasTanggal() {
    const hariIni = getHariIniString();
    tglCheckInInput.min = hariIni;
    tglCheckOutInput.min = hariIni;
  }

  /* ==========================================================================
     4. RENDER DOM DINAMIS MENGGUNAKAN createElement & appendChild
        (Sesuai Butir Wajib A1 & A3: BUKAN Sekadar innerHTML)
     ========================================================================== */
  function renderDaftarVila(listVila) {
    try {
      // Bersihkan wadah sebelum render ulang
      while (daftarVilaContainer.firstChild) {
        daftarVilaContainer.removeChild(daftarVilaContainer.firstChild);
      }

      if (!listVila || listVila.length === 0) {
        statusKosongEl.style.display = "block";
        return;
      }
      statusKosongEl.style.display = "none";

      listVila.forEach((item) => {
        // Buat elemen induk: <article class="villa-card">
        const article = document.createElement("article");
        article.className = "villa-card";

        // Bagian Visual Media / Header Kartu
        const mediaDiv = document.createElement("div");
        mediaDiv.className = "villa-card__media";
        mediaDiv.textContent = item.ikon;

        // Badge Status Ketersediaan
        const badgeSpan = document.createElement("span");
        badgeSpan.className = `villa-card__badge ${item.status === "Tersedia" ? "badge--available" : "badge--booked"}`;
        badgeSpan.textContent = item.status;
        mediaDiv.appendChild(badgeSpan);
        article.appendChild(mediaDiv);

        // Bagian Body Kartu
        const bodyDiv = document.createElement("div");
        bodyDiv.className = "villa-card__body";

        // Lokasi
        const locationP = document.createElement("p");
        locationP.className = "villa-card__location";
        locationP.textContent = `📍 ${item.lokasi}`;
        bodyDiv.appendChild(locationP);

        // Judul Nama Vila (Heading h3)
        const titleH3 = document.createElement("h3");
        titleH3.className = "villa-card__title";
        titleH3.textContent = item.nama;
        bodyDiv.appendChild(titleH3);

        // Tipe Kamar
        const typeP = document.createElement("p");
        typeP.className = "villa-card__type";
        typeP.textContent = `🛏️ ${item.tipeKamar}`;
        bodyDiv.appendChild(typeP);

        // Daftar Fasilitas (ul & li)
        const facilitiesUl = document.createElement("ul");
        facilitiesUl.className = "villa-card__facilities";

        item.fasilitas.forEach((f) => {
          const li = document.createElement("li");
          li.className = "villa-card__facility-item";
          li.textContent = `✓ ${f}`;
          facilitiesUl.appendChild(li);
        });
        bodyDiv.appendChild(facilitiesUl);

        // Footer Kartu: Informasi Harga dan Tombol Pilih Cepat
        const footerDiv = document.createElement("div");
        footerDiv.className = "villa-card__footer";

        const priceWrapper = document.createElement("div");
        priceWrapper.className = "villa-card__price-wrapper";

        const priceLabel = document.createElement("span");
        priceLabel.className = "villa-card__price-label";
        priceLabel.textContent = "Harga Sewa:";

        const priceVal = document.createElement("span");
        priceVal.className = "villa-card__price";
        priceVal.textContent = `${formatRupiah(item.hargaPerMalam)} / mlm`;

        priceWrapper.appendChild(priceLabel);
        priceWrapper.appendChild(priceVal);
        footerDiv.appendChild(priceWrapper);

        const btnPilih = document.createElement("button");
        btnPilih.type = "button";
        btnPilih.className = "btn btn--outline btn--sm";
        btnPilih.textContent = "Pilih Unit Ini";
        btnPilih.addEventListener("click", () => {
          pilihanVilaSelect.value = item.id;
          hitungTotalHarga();
          // Scroll halus ke formulir pemesanan
          document.getElementById("pemesanan").scrollIntoView({ behavior: "smooth" });
        });
        footerDiv.appendChild(btnPilih);

        bodyDiv.appendChild(footerDiv);
        article.appendChild(bodyDiv);

        // Sisipkan artikel ke dalam container menggunakan appendChild
        daftarVilaContainer.appendChild(article);
      });
    } catch (error) {
      console.error("Gagal melakukan render daftar vila:", error);
      tampilkanPesan("Terjadi kendala saat memuat katalog vila.", "error");
    }
  }

  /* ==========================================================================
     5. MENGISI DROPDOWN UNIT VILA SECARA OTOMATIS DARI DATA JAVASCRIPT
     ========================================================================== */
  function isiDropdownVila() {
    try {
      dataVila.forEach((vila) => {
        const option = document.createElement("option");
        option.value = vila.id;
        option.textContent = `${vila.nama} - ${formatRupiah(vila.hargaPerMalam)}/malam`;
        pilihanVilaSelect.appendChild(option);
      });
    } catch (err) {
      console.error("Error mengisi opsi dropdown:", err);
    }
  }

  /* ==========================================================================
     6. FITUR FILTER & PENCARIAN BERDASARKAN KATA KUNCI & STATUS
     ========================================================================== */
  function filterVila() {
    const kataKunci = inputPencarian.value.toLowerCase().trim();
    const statusTerpilih = filterStatus.value;

    const hasilFilter = dataVila.filter((item) => {
      const cocokNama = item.nama.toLowerCase().includes(kataKunci);
      const cocokLokasi = item.lokasi.toLowerCase().includes(kataKunci);
      const cocokTipe = item.tipeKamar.toLowerCase().includes(kataKunci);
      const cocokFasilitas = item.fasilitas.some((f) => f.toLowerCase().includes(kataKunci));
      const cocokTeks = cocokNama || cocokLokasi || cocokTipe || cocokFasilitas;

      const cocokStatus = (statusTerpilih === "semua") || (item.status === statusTerpilih);

      return cocokTeks && cocokStatus;
    });

    renderDaftarVila(hasilFilter);
  }

  inputPencarian.addEventListener("input", filterVila);
  filterStatus.addEventListener("change", filterVila);
  btnResetFilter.addEventListener("click", () => {
    inputPencarian.value = "";
    filterStatus.value = "semua";
    renderDaftarVila(dataVila);
  });

  /* ==========================================================================
     7. FUNGSI PERHITUNGAN OTOMATIS BIAYA (Real-Time Calculation)
        Menghitung total secara otomatis dan tampil sebelum tombol pesanan ditekan
     ========================================================================== */
  function hitungTotalHarga() {
    try {
      const vilaId = pilihanVilaSelect.value;
      const tglInVal = tglCheckInInput.value;
      const tglOutVal = tglCheckOutInput.value;
      const jumlahTamu = parseInt(jumlahTamuInput.value, 10) || 0;

      const vilaDipilih = dataVila.find((v) => v.id === vilaId);

      // Perbarui label vila & harga per malam
      if (vilaDipilih) {
        summaryNamaVila.textContent = vilaDipilih.nama;
        summaryHargaMalam.textContent = `${formatRupiah(vilaDipilih.hargaPerMalam)} / malam`;
        summaryStatusVila.textContent = vilaDipilih.status;
        summaryStatusVila.className = `summary-item__val badge ${vilaDipilih.status === "Tersedia" ? "badge--available" : "badge--booked"}`;
      } else {
        summaryNamaVila.textContent = "- Belum Dipilih -";
        summaryHargaMalam.textContent = "Rp 0";
        summaryStatusVila.textContent = "-";
        summaryStatusVila.className = "summary-item__val badge badge--neutral";
      }

      summaryJumlahTamu.textContent = jumlahTamu > 0 ? `${jumlahTamu} Orang` : "0 Orang";

      // Hitung selisih hari/malam jika kedua tanggal terisi
      let durasiMalam = 0;
      if (tglInVal && tglOutVal) {
        const dIn = new Date(tglInVal);
        const dOut = new Date(tglOutVal);
        const diffTime = dOut.getTime() - dIn.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays > 0) {
          durasiMalam = diffDays;
        }
      }

      summaryDurasiMalam.textContent = `${durasiMalam} Malam`;

      // Kalkulasi total biaya: (harga per malam * durasi malam)
      if (vilaDipilih && durasiMalam > 0) {
        const total = vilaDipilih.hargaPerMalam * durasiMalam;
        summaryTotalBiaya.textContent = formatRupiah(total);
        return {
          sukses: true,
          vila: vilaDipilih,
          durasiMalam: durasiMalam,
          jumlahTamu: jumlahTamu,
          totalBiaya: total
        };
      } else {
        summaryTotalBiaya.textContent = "Rp 0";
        return {
          sukses: false,
          vila: vilaDipilih || null,
          durasiMalam: durasiMalam,
          jumlahTamu: jumlahTamu,
          totalBiaya: 0
        };
      }
    } catch (err) {
      console.error("Kesalahan saat kalkulasi harga:", err);
      summaryTotalBiaya.textContent = "Rp 0";
      return { sukses: false, totalBiaya: 0 };
    }
  }

  // Pasang event listener agar kalkulasi berjalan real-time saat data input berubah
  pilihanVilaSelect.addEventListener("change", hitungTotalHarga);
  tglCheckInInput.addEventListener("change", () => {
    // Otomatis set batas minimal check-out = check-in
    if (tglCheckInInput.value) {
      tglCheckOutInput.min = tglCheckInInput.value;
    }
    hitungTotalHarga();
  });
  tglCheckOutInput.addEventListener("change", hitungTotalHarga);
  jumlahTamuInput.addEventListener("input", hitungTotalHarga);

  /* ==========================================================================
     8. FUNGSI TAMPILKAN NOTIFIKASI / PESAN KESALAHAN
     ========================================================================== */
  function tampilkanPesan(pesan, tipe = "error") {
    pesanNotifikasiBox.style.display = "block";
    pesanNotifikasiBox.className = `notification-box notification-box--${tipe}`;
    pesanNotifikasiBox.innerHTML = pesan;

    // Scroll sedikit agar pesan terbaca dengan jelas oleh tamu
    pesanNotifikasiBox.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  function bersihkanPesan() {
    pesanNotifikasiBox.style.display = "none";
    pesanNotifikasiBox.innerHTML = "";
  }

  /* ==========================================================================
     9. FUNGSI VALIDASI FORMULIR DENGAN PESAN BAHASA INDONESIA (Wajib Butir A3)
     ========================================================================== */
  function validasiForm() {
    bersihkanPesan();

    const nama = namaTamuInput.value.trim();
    const vilaId = pilihanVilaSelect.value;
    const tglCheckInVal = tglCheckInInput.value;
    const tglCheckOutVal = tglCheckOutInput.value;
    const jumlahTamu = parseInt(jumlahTamuInput.value, 10);
    const hariIniStr = getHariIniString();

    // 1. Validasi Nama Pemesan
    if (!nama) {
      tampilkanPesan("⚠️ <strong>Nama pemesan wajib diisi.</strong> Mohon masukkan nama lengkap Anda.", "error");
      namaTamuInput.focus();
      return false;
    }
    if (nama.length < 3) {
      tampilkanPesan("⚠️ <strong>Nama pemesan terlalu pendek.</strong> Masukkan minimal 3 karakter.", "error");
      namaTamuInput.focus();
      return false;
    }

    // 2. Validasi Pilihan Unit Vila
    if (!vilaId) {
      tampilkanPesan("⚠️ <strong>Unit vila belum dipilih.</strong> Silakan pilih salah satu unit vila dari daftar.", "error");
      pilihanVilaSelect.focus();
      return false;
    }

    // 3. Validasi Tanggal Check-In
    if (!tglCheckInVal) {
      tampilkanPesan("⚠️ <strong>Tanggal check-in wajib dipilih.</strong>", "error");
      tglCheckInInput.focus();
      return false;
    }
    if (tglCheckInVal < hariIniStr) {
      tampilkanPesan("⚠️ <strong>Tanggal check-in tidak valid.</strong> Anda tidak dapat memesan tanggal di masa lalu.", "error");
      tglCheckInInput.focus();
      return false;
    }

    // 4. Validasi Tanggal Check-Out
    if (!tglCheckOutVal) {
      tampilkanPesan("⚠️ <strong>Tanggal check-out wajib dipilih.</strong>", "error");
      tglCheckOutInput.focus();
      return false;
    }
    if (tglCheckOutVal <= tglCheckInVal) {
      tampilkanPesan("⚠️ <strong>Tanggal check-out tidak valid.</strong> Tanggal check-out harus setelah tanggal check-in (minimal sewa 1 malam).", "error");
      tglCheckOutInput.focus();
      return false;
    }

    // 5. Validasi Jumlah Tamu (1 sampai 10 orang)
    if (isNaN(jumlahTamu) || jumlahTamu < 1 || jumlahTamu > 10) {
      tampilkanPesan("⚠️ <strong>Jumlah tamu tidak sesuai.</strong> Jumlah tamu diperbolehkan antara 1 sampai 10 orang.", "error");
      jumlahTamuInput.focus();
      return false;
    }

    return true;
  }

  /* ==========================================================================
     10. FUNGSI CEK KETERSEDIAAN (Tombol "Cek Ketersediaan")
     ========================================================================== */
  function cekKetersediaan() {
    bersihkanPesan();

    const vilaId = pilihanVilaSelect.value;
    const tglCheckInVal = tglCheckInInput.value;
    const tglCheckOutVal = tglCheckOutInput.value;

    if (!vilaId) {
      tampilkanPesan("ℹ️ Silakan tentukan unit vila terlebih dahulu untuk mengecek ketersediaan.", "info");
      return;
    }

    const vila = dataVila.find((v) => v.id === vilaId);
    if (!vila) return;

    if (vila.status === "Tersedia") {
      let infoJadwal = "";
      if (tglCheckInVal && tglCheckOutVal && tglCheckOutVal > tglCheckInVal) {
        infoJadwal = ` untuk periode tanggal <strong>${tglCheckInVal}</strong> s.d. <strong>${tglCheckOutVal}</strong>`;
      }
      tampilkanPesan(
        `✅ <strong>Kabar Baik!</strong> Unit <strong>${vila.nama}</strong> saat ini <strong>BERSTATUS TERSEDIA</strong>${infoJadwal}. Anda dapat langsung melanjutkan pemesanan!`,
        "success"
      );
    } else {
      tampilkanPesan(
        `❌ Mohon maaf, unit <strong>${vila.nama}</strong> sedang terisi/dipesan oleh tamu lain. Silakan pilih unit vila alternatif kami lainnya.`,
        "error"
      );
    }
  }

  btnCekKetersediaan.addEventListener("click", cekKetersediaan);

  /* ==========================================================================
     11. FITUR PENYIMPANAN LOKAL (localStorage): Simpan & Muat Riwayat
     ========================================================================== */
  const STORAGE_KEY_RIWAYAT = "vila_permai_riwayat_pesanan";
  const STORAGE_KEY_NAMA_TAMU = "vila_permai_nama_terakhir";

  function simpanPesananKeStorage(pesananBaru) {
    try {
      // Ambil daftar riwayat yang ada
      const riwayatAda = JSON.parse(localStorage.getItem(STORAGE_KEY_RIWAYAT)) || [];
      riwayatAda.unshift(pesananBaru); // letakkan pesanan baru di urutan teratas
      localStorage.setItem(STORAGE_KEY_RIWAYAT, JSON.stringify(riwayatAda));

      // Simpan nama tamu terakhir agar otomatis terisi di kunjungan berikutnya
      localStorage.setItem(STORAGE_KEY_NAMA_TAMU, pesananBaru.nama);
    } catch (e) {
      console.warn("Penyimpanan lokal (localStorage) tidak tersedia atau kuota penuh:", e);
    }
  }

  function muatPesananDariStorage() {
    try {
      // Muat nama tamu terakhir
      const namaTerakhir = localStorage.getItem(STORAGE_KEY_NAMA_TAMU);
      if (namaTerakhir && !namaTamuInput.value) {
        namaTamuInput.value = namaTerakhir;
      }

      // Muat daftar riwayat tabel
      const daftarPesanan = JSON.parse(localStorage.getItem(STORAGE_KEY_RIWAYAT)) || [];
      renderTabelRiwayat(daftarPesanan);
    } catch (e) {
      console.error("Gagal membaca data dari localStorage:", e);
      renderTabelRiwayat([]);
    }
  }

  function renderTabelRiwayat(daftarPesanan) {
    while (tabelRiwayatBody.firstChild) {
      tabelRiwayatBody.removeChild(tabelRiwayatBody.firstChild);
    }

    if (!daftarPesanan || daftarPesanan.length === 0) {
      riwayatKosongEl.style.display = "block";
      tabelContainerEl.style.display = "none";
      btnHapusRiwayat.style.display = "none";
      return;
    }

    riwayatKosongEl.style.display = "none";
    tabelContainerEl.style.display = "block";
    btnHapusRiwayat.style.display = "inline-flex";

    daftarPesanan.forEach((p, idx) => {
      const tr = document.createElement("tr");

      const tdNo = document.createElement("td");
      tdNo.textContent = idx + 1;
      tr.appendChild(tdNo);

      const tdId = document.createElement("td");
      tdId.textContent = p.idPesanan;
      tdId.style.fontWeight = "600";
      tr.appendChild(tdId);

      const tdNama = document.createElement("td");
      tdNama.textContent = p.nama;
      tr.appendChild(tdNama);

      const tdVila = document.createElement("td");
      tdVila.textContent = p.namaVila;
      tr.appendChild(tdVila);

      const tdIn = document.createElement("td");
      tdIn.textContent = p.checkIn;
      tr.appendChild(tdIn);

      const tdOut = document.createElement("td");
      tdOut.textContent = p.checkOut;
      tr.appendChild(tdOut);

      const tdMalam = document.createElement("td");
      tdMalam.textContent = `${p.malam} Malam`;
      tr.appendChild(tdMalam);

      const tdTamu = document.createElement("td");
      tdTamu.textContent = `${p.tamu} Orang`;
      tr.appendChild(tdTamu);

      const tdTotal = document.createElement("td");
      tdTotal.textContent = formatRupiah(p.totalBiaya);
      tdTotal.style.fontWeight = "700";
      tdTotal.style.color = "#1e5e3a";
      tr.appendChild(tdTotal);

      const tdStatus = document.createElement("td");
      const badgeStatus = document.createElement("span");
      badgeStatus.className = "badge badge--available";
      badgeStatus.textContent = "Dikonfirmasi";
      tdStatus.appendChild(badgeStatus);
      tr.appendChild(tdStatus);

      tabelRiwayatBody.appendChild(tr);
    });
  }

  btnHapusRiwayat.addEventListener("click", () => {
    if (confirm("Apakah Anda yakin ingin menghapus seluruh riwayat pesanan yang tersimpan?")) {
      try {
        localStorage.removeItem(STORAGE_KEY_RIWAYAT);
        renderTabelRiwayat([]);
        tampilkanPesan("Riwayat pesanan berhasil dibersihkan.", "info");
      } catch (err) {
        console.error("Gagal menghapus riwayat:", err);
      }
    }
  });

  /* ==========================================================================
     12. EVENT LISTENER SUBMIT FORMULIR PEMESANAN (Wajib Butir A3)
     ========================================================================== */
  formPemesanan.addEventListener("submit", (event) => {
    // Mencegah perilaku default reload halaman pada peramban
    event.preventDefault();

    // 1. Eksekusi validasi formulir
    const formValid = validasiForm();
    if (!formValid) {
      return;
    }

    // 2. Jalankan perhitungan total
    const hasilKalkulasi = hitungTotalHarga();
    if (!hasilKalkulasi.sukses) {
      tampilkanPesan("⚠️ Pastikan unit vila, tanggal check-in, dan check-out terisi dengan benar.", "error");
      return;
    }

    // 3. Susun data pesanan baru
    const idPemesananBaru = `VP-${Date.now().toString().slice(-6)}`;
    const dataPesananBaru = {
      idPesanan: idPemesananBaru,
      nama: namaTamuInput.value.trim(),
      vilaId: hasilKalkulasi.vila.id,
      namaVila: hasilKalkulasi.vila.nama,
      checkIn: tglCheckInInput.value,
      checkOut: tglCheckOutInput.value,
      malam: hasilKalkulasi.durasiMalam,
      tamu: hasilKalkulasi.jumlahTamu,
      totalBiaya: hasilKalkulasi.totalBiaya,
      waktuPesan: new Date().toLocaleString("id-ID")
    };

    // 4. Simpan ke localStorage
    simpanPesananKeStorage(dataPesananBaru);

    // 5. Muat ulang tabel riwayat
    muatPesananDariStorage();

    // 6. Beri konfirmasi sukses kepada tamu
    const pesanSukses = `
      🎉 <strong>Pemesanan Berhasil Terkirim!</strong><br>
      Terima kasih, <strong>${dataPesananBaru.nama}</strong>. Pemesanan unit <strong>${dataPesananBaru.namaVila}</strong> 
      untuk <strong>${dataPesananBaru.malam} malam</strong> (${dataPesananBaru.checkIn} s.d. ${dataPesananBaru.checkOut}) 
      dengan total biaya <strong>${formatRupiah(dataPesananBaru.totalBiaya)}</strong> telah dicatat dalam sistem.<br>
      <small>Nomor Reservasi: <strong>${idPemesananBaru}</strong>. Pak Hendra akan menghubungi Anda untuk konfirmasi akhir kedatangan.</small>
    `;
    tampilkanPesan(pesanSukses, "success");

    // 7. Reset formulir secara elegan dengan tetap mempertahankan nama
    const simpanNama = dataPesananBaru.nama;
    formPemesanan.reset();
    namaTamuInput.value = simpanNama;
    inisialisasiBatasTanggal();
    hitungTotalHarga();
  });

  /* ==========================================================================
     13. INISIALISASI AWAL APLIKASI SAAT HALAMAN DIBUKA
     ========================================================================== */
  try {
    inisialisasiBatasTanggal();
    renderDaftarVila(dataVila);
    isiDropdownVila();
    muatPesananDariStorage();
    hitungTotalHarga();
  } catch (initError) {
    console.error("Gagal melakukan inisialisasi aplikasi:", initError);
  }

});
