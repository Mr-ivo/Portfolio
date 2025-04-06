import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const FORCE_DEV_MODE = false; // Set to false to use actual email sending

export async function POST(request) {
  try {
    const formData = await request.json();
    const { name, email, subject, message } = formData;
    
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { message: 'All fields are required' },
        { status: 400 }
      );
    }

    console.log('Contact form submission received:', {
      name,
      email,
      subject,
      message: message.substring(0, 100) + (message.length > 100 ? '...' : '')
    });

    if (FORCE_DEV_MODE || process.env.USE_DUMMY_EMAIL === 'true') {
      console.log('Development mode: No actual email sent');

      await new Promise(resolve => setTimeout(resolve, 800));

      console.log('Would have sent email with:', {
        to: process.env.EMAIL_RECIPIENT || 'recipient@example.com',
        from: process.env.EMAIL_FROM || 'sender@example.com',
        subject: `Portfolio Contact: ${subject}`,
        name,
        email,
        message: message.substring(0, 100) + (message.length > 100 ? '...' : '')
      });

      return NextResponse.json({ 
        message: 'Message received! Thank you for contacting me.',
        devMode: true
      }, { status: 200 });
    }
 
    try {
      // Create a simple Nodemailer transporter using GMAIL
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD,
        },
      });

      const emailContent = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER, 
        replyTo: email,
        subject: `Portfolio Contact: ${subject}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
            <h2 style="color: #6b46c1;">New Contact Form Submission</h2>
            <p><strong>From:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <div style="margin-top: 20px; padding: 15px; background-color: #f5f5f5; border-radius: 4px;">
              <p><strong>Message:</strong></p>
              <p style="white-space: pre-wrap;">${message}</p>
            </div>
          </div>
        `
      };

      const info = await transporter.sendMail(emailContent);
      console.log('Email sent successfully! Message ID:', info.messageId);

      return NextResponse.json({ 
        message: 'Message sent successfully! You will receive a response soon.' 
      }, { status: 200 });
      
    } catch (emailError) {
      console.error('Email error:', emailError);
      throw new Error(
        `Failed to send email: ${emailError.message || 'Unknown error'}`
      );
    }
    
  } catch (error) {
    console.error('Contact form error:', error);
    
    return NextResponse.json(
      { message: error.message || 'Failed to process your message. Please try again later.' },
      { status: 500 }
    );
  }
}