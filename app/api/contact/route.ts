import nodemailer from 'nodemailer';
import { NextRequest, NextResponse } from 'next/server';

// Type for nodemailer transporter
interface EmailTransporter {
  sendMail(options: any): Promise<any>;
}

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message } = await request.json();

    // Validate input
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create a transporter using your email service
    // For Gmail, you need to use an App Password
    // For other services, adjust accordingly
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Email to send to your inbox
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO || process.env.EMAIL_USER,
      subject: `Portfolio Contact: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">New Contact Form Submission</h2>
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;" />
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-wrap; word-wrap: break-word;">${message}</p>
          </div>
          <p style="color: #666; margin-top: 20px; font-size: 12px;">
            This message was sent from your portfolio website contact form.
          </p>
        </div>
      `,
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);

    // Optionally send a confirmation email to the user
    if (process.env.SEND_CONFIRMATION_EMAIL === 'true') {
      const confirmationEmail = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Portfolio Contact - Message Received',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333;">Thank You for Reaching Out</h2>
            <p>Hi ${name},</p>
            <p>Thank you for sending your message through my portfolio website. I have received your submission and will get back to you as soon as possible.</p>
            <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
              <p><strong>Your Message:</strong></p>
              <p style="white-space: pre-wrap; word-wrap: break-word;">${message}</p>
            </div>
            <p>Best regards,<br/>Abhijeet Ansal</p>
          </div>
        `,
      };

      try {
        await transporter.sendMail(confirmationEmail);
      } catch (confirmError) {
        console.error('Failed to send confirmation email:', confirmError);
        // Don't fail the main request if confirmation email fails
      }
    }

    return NextResponse.json(
      { 
        success: true,
        message: 'Email sent successfully',
        messageId: info.messageId 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email. Please try again later.' },
      { status: 500 }
    );
  }
}
