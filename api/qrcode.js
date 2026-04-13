/**
 * QR Code Generator API Endpoint
 * 
 * Endpoint: GET /api/qrcode?text=...&size=...
 * 
 * Parameters:
 * - text: Teks yang akan diubah menjadi QR code (default: "Hello World")
 * - size: Ukuran QR code (1-10, default: 4)
 * 
 * Response: JSON dengan format data URL base64
 */

import QRCode from 'qrcode';

export default function handler(req, res) {
  // Hanya terima method GET
  if (req.method !== 'GET') {
    return res.status(405).json({ 
      error: 'Method not allowed', 
      message: 'Gunakan method GET' 
    });
  }

  try {
    // Ambil parameter dari query string
    const { text = 'Hello World', size = 4 } = req.query;

    // Validasi parameter size (1-10)
    const sizeNum = parseInt(size);
    if (isNaN(sizeNum) || sizeNum < 1 || sizeNum > 10) {
      return res.status(400).json({ 
        error: 'Invalid size parameter', 
        message: 'Size harus antara 1-10' 
      });
    }

    // Generate QR code dalam format data URL (base64)
    const dataUrl = QRCode.toDataURL(text, {
      width: sizeNum * 100, // Konversi size ke pixel
      margin: 2,
      errorCorrectionLevel: 'M' // Medium error correction
    });

    // Return response JSON
    return res.status(200).json({
      success: true,
      data: {
        text: text,
        size: sizeNum,
        format: 'PNG',
        image: dataUrl // Data URL base64
      }
    });

  } catch (error) {
    console.error('QR Code generation error:', error);
    return res.status(500).json({
      error: 'Failed to generate QR code',
      message: error.message
    });
  }
}