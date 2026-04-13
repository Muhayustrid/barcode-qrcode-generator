# QR Code & Barcode Generator API

REST API sederhana untuk generate QR Code dan Barcode menggunakan Node.js, kompatibel dengan serverless environment seperti Vercel.

## Fitur

- **QR Code Generator**: Menghasilkan QR code dalam format base64 (data URL)
- **Barcode Generator**: Menghasilkan barcode dalam format PNG image
- **Serverless Ready**: Kompatibel dengan Vercel dan platform serverless lainnya
- **ES Module**: Menggunakan import/export modern
- **Error Handling**: Penanganan error yang baik dengan try-catch
- **Parameter Opsional**: Mendukung parameter size (QR) dan scale (Barcode)

## Struktur Project

```
barcode-qrcode-generator/
├── api/
│   ├── qrcode.js     # Endpoint QR Code
│   └── barcode.js    # Endpoint Barcode
├── vercel.json       # Konfigurasi Vercel
├── package.json      # Dependencies
└── README.md         # Dokumentasi
```

## Endpoint

### 1. QR Code Generator

**URL**: `GET /api/qrcode`

**Parameter Query**:
- `text` (opsional): Teks yang akan diubah menjadi QR code (default: "Hello World")
- `size` (opsional): Ukuran QR code (1-10, default: 4)

**Contoh Request**:
```
GET /api/qrcode?text=Hello%20World&size=5
```

**Response** (JSON):
```json
{
  "success": true,
  "data": {
    "text": "Hello World",
    "size": 5,
    "format": "PNG",
    "image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA..."
  }
}
```

### 2. Barcode Generator

**URL**: `GET /api/barcode`

**Parameter Query**:
- `text` (opsional): Teks yang akan diubah menjadi barcode (default: "123456789012")
- `scale` (opsional): Skala ukuran barcode (1-5, default: 2)

**Contoh Request**:
```
GET /api/barcode?text=123456789012&scale=3
```

**Response**: Image PNG

## Teknologi

- **Node.js** (ES Module)
- **qrcode** - Library untuk generate QR code
- **bwip-js** - Library untuk generate barcode
- **Vercel** - Platform serverless deployment

## Instalasi & Setup

1. **Clone atau buat project**:
```bash
git clone <repository-url>
cd barcode-qrcode-generator
```

2. **Install dependencies**:
```bash
npm install
```

3. **Jalankan development server** (opsional):
```bash
npm run dev
```

## Deploy ke Vercel

1. **Install Vercel CLI** (jika belum):
```bash
npm install -g vercel
```

2. **Login ke Vercel**:
```bash
vercel login
```

3. **Deploy ke Vercel**:
```bash
vercel
```

4. **Deploy production**:
```bash
vercel --prod
```

## Contoh Penggunaan

### Generate QR Code
```javascript
// Contoh menggunakan fetch
const response = await fetch('/api/qrcode?text=Test%20QR&size=6');
const data = await response.json();
console.log(data.image); // Data URL base64
```

### Generate Barcode
```javascript
// Contoh menggunakan fetch
const response = await fetch('/api/barcode?text=123456789012&scale=3');
const blob = await response.blob();
const url = URL.createObjectURL(blob);
// Gunakan url untuk menampilkan gambar
```

## Error Handling

API ini telah dilengkapi dengan penanganan error yang baik:

- **Method tidak valid**: Return 405 Method Not Allowed
- **Parameter tidak valid**: Return 400 Bad Request
- **Error generation**: Return 500 Internal Server Error

## Kontribusi

Silakan buat issue atau pull request jika ada bug atau fitur yang ingin ditambahkan.

## Lisensi

ISC