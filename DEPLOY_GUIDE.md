# Panduan Lengkap Deploy ke Vercel

## Persiapan

1. **Pastikan sudah install Node.js** (versi 18+)
2. **Install Vercel CLI** (jika belum):
   ```bash
   npm install -g vercel
   ```

## Langkah Deploy

### 1. Login ke Vercel
```bash
vercel login
```
Akan muncul link untuk login di browser. Ikuti instruksi sampai berhasil.

### 2. Deploy Project
```bash
vercel
```

**Pertanyaan yang mungkin muncul:**
- **Set up and deploy?** → Tekan Enter (Yes)
- **Which scope?** → Pilih scope (biasanya username Anda)
- **Link to existing project?** → No (jika project baru)
- **Want to modify settings?** → No (gunakan default)

### 3. Deploy Production
Setelah deploy pertama selesai, Anda akan mendapatkan URL preview. Untuk deploy ke production:
```bash
vercel --prod
```

## Struktur Project yang Sudah Siap

```
barcode-qrcode-generator/
├── api/
│   ├── qrcode.js     # Endpoint QR Code
│   └── barcode.js    # Endpoint Barcode
├── vercel.json       # Konfigurasi Vercel
├── package.json      # Dependencies
└── README.md         # Dokumentasi
```

## Testing Setelah Deploy

Setelah deploy, Anda akan mendapatkan URL seperti: `https://your-project.vercel.app`

### Test QR Code
```
https://your-project.vercel.app/api/qrcode?text=Hello%20World&size=5
```

### Test Barcode
```
https://your-project.vercel.app/api/barcode?text=123456789012&scale=3
```

## Deploy Otomatis dari Git

1. **Push code ke GitHub/GitLab**
2. **Buka Vercel Dashboard** (vercel.com)
3. **Import project** dari repository
4. **Set root directory** (jika perlu)
5. **Deploy** - Vercel akan otomatis deploy setiap ada push ke branch utama

## Konfigurasi Lanjutan

### Environment Variables
Jika perlu menambahkan environment variables:
```bash
vercel env add
```

### Custom Domain
Untuk menambahkan custom domain:
1. Buka Vercel Dashboard
2. Pilih project
3. Settings → Domains
4. Tambahkan domain

## Troubleshooting

### Error: "Module not found"
Pastikan semua dependencies sudah terinstall:
```bash
npm install
```

### Error: "Build failed"
Cek log error di Vercel Dashboard → Deployments → View Build Logs

### Error: "Found invalid Node.js Version"
Untuk mengatur versi Node.js di Vercel, gunakan cara berikut:

**Cara 1: Melalui Vercel Dashboard**
1. Buka project di Vercel Dashboard
2. Pergi ke Settings → Functions
3. Set Node.js Version ke 20.x

**Cara 2: Melalui package.json**
Tambahkan di package.json:
```json
{
  "engines": {
    "node": "20.x"
  }
}
```

### Error: "No entrypoint found"
Pastikan package.json tidak memiliki field "main" yang tidak perlu. Hapus field "main" jika ada.

### API tidak merespons
Pastikan endpoint di folder `api/` dan menggunakan export default function

## Contoh Request URL Lengkap

### QR Code dengan parameter lengkap
```
https://your-project.vercel.app/api/qrcode?text=Test%20QR%20Code&size=6
```

### Barcode dengan parameter lengkap
```
https://your-project.vercel.app/api/barcode?text=ABC123&scale=3
```

### QR Code dengan default (tanpa parameter)
```
https://your-project.vercel.app/api/qrcode
```

### Barcode dengan default (tanpa parameter)
```
https://your-project.vercel.app/api/barcode
```

## Tips

1. **Gunakan URL encoding** untuk teks yang mengandung spasi atau karakter khusus
2. **Test di local** dengan `vercel dev` sebelum deploy (perlu login dulu)
3. **Monitor usage** di Vercel Dashboard untuk melihat jumlah request
4. **Gunakan production deployment** untuk URL yang stabil

## Bantuan

Jika ada masalah, cek:
- [Vercel Documentation](https://vercel.com/docs)
- [Vercel CLI Documentation](https://vercel.com/docs/cli)
- Issue di repository ini