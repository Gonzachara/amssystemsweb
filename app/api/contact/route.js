import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const { name, email, message, company, phone, service } = await request.json();

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create transporter from env (supports service or host/port)
    const smtpService = process.env.SMTP_SERVICE; // e.g., 'gmail'
    const smtpHost = process.env.SMTP_HOST;       // e.g., 'smtp.gmail.com'
    const smtpPort = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 587;
    const smtpSecure = String(process.env.SMTP_SECURE || '').toLowerCase() === 'true' || smtpPort === 465;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    if (!smtpUser || !smtpPass) {
      return NextResponse.json({ error: 'SMTP credentials not configured' }, { status: 500 });
    }

    const transporter = nodemailer.createTransport(
      smtpService
        ? {
            service: smtpService,
            auth: { user: smtpUser, pass: smtpPass },
          }
        : {
            host: smtpHost || 'smtp.gmail.com',
            port: smtpPort,
            secure: smtpSecure,
            auth: { user: smtpUser, pass: smtpPass },
          }
    );

    // Email content
    const logoCid = 'ams-systems-logo';
    const logoPath = `${process.cwd()}/public/logos/isotipo.png`;
    // INTERNAL EMAIL (AMS Systems) — matches provided design
    const internalHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 960px; margin: 0 auto; background: #0b0b0b; color: #eaeaea;">
        <div style="text-align:center; padding: 28px 12px; border-bottom: 1px solid rgba(255,255,255,0.08);">
          <img src="cid:${logoCid}" alt="AMS SYSTEMS" style="height:38px; filter: brightness(0) invert(1);"/>
        </div>
        <div style="padding: 28px 24px 8px;">
          <h1 style="margin:0 0 8px; font-size:22px; color:#fff;">Nuevo lead: ${name} — AMS SYSTEMS (Contacto web)</h1>
          <p style="margin:0 0 20px; color:#bdbdbd;">Nuevo contacto desde la web. Revisar y asignar responsable.</p>
        </div>
        <div style="margin:0 24px 24px; padding:20px; border-radius:12px; background:#0f0f10; border:1px solid rgba(255,255,255,0.08);">
          <div style="margin-bottom:12px;"><strong style="color:#fff;">NOMBRE:</strong> <span style="color:#cfcfcf;">${name}</span></div>
          <div style="margin-bottom:12px;"><strong style="color:#fff;">EMPRESA Y RUBRO:</strong> <span style="color:#cfcfcf;">${company || '-'}</span></div>
          <div style="margin-bottom:12px;"><strong style="color:#fff;">EMAIL:</strong> <a style="color:#9cc2ff; text-decoration:none;" href="mailto:${email}">${email}</a></div>
          <div style="margin-bottom:12px;"><strong style="color:#fff;">TELÉFONO:</strong> <span style="color:#cfcfcf;">${phone || '-'}</span></div>
          <div style="margin-bottom:12px;"><strong style="color:#fff;">SERVICIO:</strong> <span style="color:#cfcfcf;">${service || '-'}</span></div>
          <div style="margin-bottom:12px;"><strong style="color:#fff;">MENSAJE:</strong></div>
          <div style="margin-top:6px; padding:14px 16px; background:#0b0b0c; border-radius:30px; border:1px solid rgba(255,255,255,0.06); color:#d7d7d7;">${(message || '').replace(/\n/g,'<br/>')}</div>
        </div>
        <div style="padding: 14px 24px 28px; text-align:center; color:#bdbdbd; border-top: 1px solid rgba(255,255,255,0.08);">
          <div style="margin-bottom:10px;">Síguenos en nuestras redes sociales:</div>
          <div>
            <a href="https://www.instagram.com/amssystems" style="color:#cfd7ff; margin:0 10px; text-decoration:none;">Instagram</a>
            <a href="https://www.tiktok.com/@amssystems" style="color:#cfd7ff; margin:0 10px; text-decoration:none;">TikTok</a>
            <a href="https://x.com/ams__systems" style="color:#cfd7ff; margin:0 10px; text-decoration:none;">X</a>
            <a href="https://www.linkedin.com/in/amssystems/" style="color:#cfd7ff; margin:0 10px; text-decoration:none;">LinkedIn</a>
          </div>
        </div>
      </div>
    `;

    // USER CONFIRMATION EMAIL — matches provided design
    const userHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 960px; margin: 0 auto; background: #0b0b0b; color: #eaeaea;">
        <div style="text-align:center; padding: 28px 12px; border-bottom: 1px solid rgba(255,255,255,0.08);">
          <img src="cid:${logoCid}" alt="AMS SYSTEMS" style="height:38px; filter: brightness(0) invert(1);"/>
        </div>
        <div style="padding: 24px; text-align:center;">
          <h2 style="margin: 10px 0 8px; color:#fff;">¡Gracias por contactarte!</h2>
          <p style="margin: 0 0 16px; color:#cfcfcf;">Hola ${name || ''},</p>
          <p style="margin: 0 0 18px; color:#cfcfcf;">gracias por escribirnos. Recibimos tu consulta y uno de nuestros especialistas se contactará dentro de las próximas 24 horas hábiles para coordinar una llamada.</p>
          <p style="margin: 0 0 26px; color:#cfcfcf;">Mientras tanto, podés ver algunos casos de éxito y servicios en: <a href="https://amssystems.com.ar/trabajos" style="color:#4075f5; font-weight: 600; text-decoration:none;">amssystems.com.ar/trabajos</a></p>
          <div style="height:1px; background: rgba(255,255,255,0.08); margin: 20px 0;"></div>
          <div style="margin-bottom:10px;">Síguenos en nuestras redes sociales:</div>
          <div style="margin-bottom:16px;">
            <a href="https://www.instagram.com/amssystems" style="color:#cfd7ff; margin:0 10px; text-decoration:none;">Instagram</a>
            <a href="https://www.tiktok.com/@amssystems" style="color:#cfd7ff; margin:0 10px; text-decoration:none;">TikTok</a>
            <a href="https://x.com/ams__systems" style="color:#cfd7ff; margin:0 10px; text-decoration:none;">X</a>
            <a href="https://www.linkedin.com/in/amssystems/" style="color:#cfd7ff; margin:0 10px; text-decoration:none;">LinkedIn</a>
          </div>
          <div style="color:#bdbdbd;">Saludos,<br/>Equipo <a href="https://amssystems.com.ar" style="color:#ffffff; font-weight: 600; text-decoration:none;">AMS SYSTEMS</a></div>
        </div>
      </div>
    `;

    const internalMail = {
      from: process.env.SMTP_USER,
      to: 'amssystems22@gmail.com',
      subject: `Nuevo lead: ${name} — AMS SYSTEMS (Contacto web)`,
      html: internalHtml,
      attachments: [
        { filename: 'isotipo.png', path: logoPath, cid: logoCid }
      ]
    };

    const userMail = {
      from: process.env.SMTP_USER,
      to: email,
      subject: '¡Gracias por contactarte! — AMS SYSTEMS',
      html: userHtml,
      attachments: [
        { filename: 'isotipo.png', path: logoPath, cid: logoCid }
      ]
    };

    // Send email
    // Send internal first, then user confirmation (do not fail the whole request if user email bounces)
    await transporter.sendMail(internalMail);
    try { await transporter.sendMail(userMail); } catch (e) { console.error('User confirmation mail failed:', e); }

    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}