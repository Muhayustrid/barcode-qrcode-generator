/**
 * Barcode Generator API Endpoint
 * 
 * Endpoint: GET /api/barcode?text=...&scale=...
 * 
 * Parameters:
 * - text: Teks yang akan diubah menjadi barcode (default: "123456789012")
 * - scale: Skala ukuran barcode (1-5, default: 2)
 * 
 * Response: Image PNG
 */

import bwipjs from 'bwip-js';

export default function handler(req, res) {
  // Hanya terima method GET
  if (req.method !== 'GET') {
    return res.status(405).setHeader('Allow', ['GET']).json({ 
      error: 'Method not allowed' 
    });
  }

  try {
    // Ambil parameter dari query string
    const { text = '123456789012', scale = 2 } = req.query;

    // Validasi parameter scale (1-5)
    const scaleNum = parseInt(scale);
    if (isNaN(scaleNum) || scaleNum < 1 || scaleNum > 5) {
      return res.status(400).json({ 
        error: 'Invalid scale parameter', 
        message: 'Scale harus antara 1-5' 
      });
    }

    // Generate barcode dalam format PNG buffer
    const pngBuffer = bwipjs.toBuffer({
      bcid: 'code128', // Jenis barcode (Code 128 mendukung alphanumeric)
      text: text,
      scale: scaleNum, // Skala ukuran
      height: 10, // Tinggi dalam mm
      includetext: true, // Sertakan teks di bawah barcode
      textxalign: 'center'
    });

    // Set header untuk response image
    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Content-Length', pngBuffer.length);

    // Return response PNG
    return res.status(200).send(pngBuffer);

  } catch (error) {
    console.error('Barcode generation error:', error);
    
    // Jika error karena input tidak valid, return 400
    if (error.message.includes('Invalid') || error.message.includes('Unsupported')) {
      return res.status(400).json({
        error: 'Invalid input for barcode generation',
        message: error.message
      });
    }

    // Jika error lainnya, return 500
    return res.status(500).json({
      error: 'Failed to generate barcode',
      message: error.message
    });
  }
}