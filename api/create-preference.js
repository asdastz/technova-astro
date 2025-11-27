// Vercel Serverless Function para crear preferencia de Mercado Pago
// Esta función se ejecuta en el servidor de Vercel

import { MercadoPagoConfig, Preference } from 'mercadopago';

export default async function handler(req, res) {
  // Solo aceptar POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { items } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ error: 'El carrito está vacío' });
    }

    // Configurar cliente de Mercado Pago
    const client = new MercadoPagoConfig({
      accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN || '',
    });

    const preference = new Preference(client);

    // URL base para redirecciones
    // Vercel proporciona VERCEL_URL en producción (sin protocolo)
    // También puedes configurar NEXT_PUBLIC_SITE_URL o SITE_URL manualmente
    let baseUrl = 'http://localhost:4321';
    
    if (process.env.SITE_URL) {
      baseUrl = process.env.SITE_URL;
    } else if (process.env.NEXT_PUBLIC_SITE_URL) {
      baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
    } else if (process.env.VERCEL_URL) {
      baseUrl = `https://${process.env.VERCEL_URL}`;
    } else if (process.env.URL) {
      baseUrl = process.env.URL;
    }

    // Construir la preferencia
    const preferenceData = {
      items: items.map((item) => ({
        id: String(item.id),
        title: item.name,
        quantity: Number(item.quantity),
        currency_id: 'ARS',
        unit_price: Number(item.price),
      })),
      statement_descriptor: 'TechNova',
      external_reference: `order_${Date.now()}`,
      back_urls: {
        success: `${baseUrl}/pago/success`,
        failure: `${baseUrl}/pago/failure`,
        pending: `${baseUrl}/pago/pending`,
      },
      auto_return: 'approved',
    };

    console.log('Creating preference with data:', JSON.stringify(preferenceData, null, 2));

    const result = await preference.create({ body: preferenceData });

    console.log('Preference created:', result.id);

    return res.status(200).json({
      id: result.id,
      init_point: result.init_point,
    });
  } catch (error) {
    console.error('Error creating preference:', error);

    return res.status(500).json({
      error: error.message || 'Error al crear la preferencia de pago',
    });
  }
}

