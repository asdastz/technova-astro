// Netlify Function para crear preferencia de Mercado Pago
// Esta función se ejecuta en el servidor de Netlify

const { MercadoPagoConfig, Preference } = require('mercadopago');

exports.handler = async (event, context) => {
  // Solo aceptar POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const { items } = JSON.parse(event.body);

    if (!items || items.length === 0) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'El carrito está vacío' }),
      };
    }

    // Configurar cliente de Mercado Pago
    const client = new MercadoPagoConfig({
      accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN || '',
    });

    const preference = new Preference(client);

    // URL base para redirecciones
    const baseUrl = process.env.URL || process.env.DEPLOY_URL || 'http://localhost:8888';

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

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: result.id,
        init_point: result.init_point,
      }),
    };
  } catch (error) {
    console.error('Error creating preference:', error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        error: error.message || 'Error al crear la preferencia de pago',
      }),
    };
  }
};

