CLOUDFLARE PAGES - HTTP 200 REDIRECT

Struktur:
- index.html
- functions/_middleware.js

Deploy folder ini sebagai project Cloudflare Pages yang mendukung Pages Functions.

Pengaturan:
1. Indonesia: edit INDONESIA_DESTINATION (satu URL).
2. Luar Indonesia: edit tiga URL di INTERNATIONAL_DESTINATIONS.
3. Simpan dan deploy ulang.

Cara kerja:
- Cloudflare membaca kode negara IP melalui request.cf.country.
- Jika ID, halaman HTTP 200 mengarahkan browser ke satu URL tetap.
- Selain ID, satu dari tiga URL dipilih secara acak.
- Pengalihan browser dilakukan dengan JavaScript window.location.replace.

Catatan:
- HTTP 200 adalah respons halaman, bukan redirect HTTP 3xx.
- Browser harus mengaktifkan JavaScript.
- Geolokasi IP negara tidak 100% akurat dan bukan GPS.
- Untuk menghindari cache menyimpan hasil negara/pilihan tujuan, respons diberi Cache-Control: no-store.
