import { NextResponse } from 'next/server';
import { ServerClient } from 'postmark';

const FORCE_DEV_MODE = false; 

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

    console.log('Contact form submission received from:', email);

    if (FORCE_DEV_MODE || process.env.USE_DUMMY_EMAIL === 'true') {
      console.log('Development mode: No actual email sent');

      await new Promise(resolve => setTimeout(resolve, 800));

      console.log('Would have sent email with:', {
        to: process.env.EMAIL_RECIPIENT || 'ebongngsite@ebongng.site',
        from: process.env.EMAIL_FROM || 'ebongngsite@ebongng.site',
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

    // Check for Postmark credentials
    const postmarkServerToken = process.env.POSTMARK_SERVER_TOKEN;
    const emailFrom = process.env.EMAIL_FROM || 'ebongngsite@ebongng.site';
    const emailTo = process.env.EMAIL_TO || 'ebongngsite@ebongng.site';

    if (!postmarkServerToken) {
      console.error('Postmark server token missing in environment variables');
      return NextResponse.json(
        { message: 'Server configuration error. Please try again later or contact directly via email.' },
        { status: 500 }
      );
    }

    try {
      // Initialize Postmark client
      const client = new ServerClient(postmarkServerToken);
      
      // Create email content
      const emailContent = `
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
      `;
      
      // Send the email using Postmark
      const response = await client.sendEmail({
        From: emailFrom,
        To: emailTo,
        ReplyTo: email,
        Subject: `Portfolio Contact: ${subject}`,
        HtmlBody: emailContent,
        MessageStream: 'outbound'
      });
      
      console.log('Email sent successfully with Postmark!', response.MessageID);


      return NextResponse.json({ 
        message: 'Message sent successfully! You will receive a response soon.' 
      }, { status: 200 });
      
    } catch (emailError) {
      console.error('Email error:', emailError);
      
      // Log the error but keep it simple
      console.error('Error details:', emailError.message || 'Unknown error');
      
      // For security, don't expose detailed error to client
      return NextResponse.json(
        { message: 'Failed to send your message. Please try again later or contact me directly via email at ebongngsite@ebongng.site' },
        { status: 500 }
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