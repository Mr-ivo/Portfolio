import { NextResponse } from 'next/server';


let sendgridPromise;
const getSendgrid = async () => {
  if (!sendgridPromise) {
    sendgridPromise = import('@sendgrid/mail').catch(() => null);
  }
  return sendgridPromise;
};


const FORCE_DEV_MODE = true;

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

    if (FORCE_DEV_MODE || !process.env.SENDGRID_API_KEY || process.env.USE_DUMMY_EMAIL === 'true') {
      console.log(' Development mode: No actual email sent');

      await new Promise(resolve => setTimeout(resolve, 800));

      console.log(' Would have sent email with:', {
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
      const sgMail = await getSendgrid();
      if (!sgMail) {
        throw new Error('Email module not available');
      }
 
      if (!process.env.SENDGRID_API_KEY) {
        throw new Error('SendGrid API key is missing from environment variables');
      }

      sgMail.default.setApiKey(process.env.SENDGRID_API_KEY);

      console.log('SendGrid configuration:', {
        to: process.env.EMAIL_RECIPIENT || process.env.EMAIL_FROM,
        from: process.env.EMAIL_FROM,
        subject: `Portfolio Contact: ${subject}`,
      });

      const emailContent = {
        to: process.env.EMAIL_RECIPIENT || process.env.EMAIL_FROM,
        from: process.env.EMAIL_FROM, // Must be verified with SendGrid
        replyTo: email,
        subject: `Portfolio Contact: ${subject}`,
        text: `
          Name: ${name}
          Email: ${email}
          
          Message:
          ${message}
        `,
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

      try {
        const [response] = await sgMail.default.send(emailContent);
        console.log('Email sent successfully with SendGrid!');
        console.log('SendGrid response status code:', response?.statusCode);
        console.log('SendGrid response headers:', response?.headers);
      } catch (sgError) {
        if (sgError.response) {
          console.error('SendGrid API error response:', {
            body: sgError.response.body,
            statusCode: sgError.response.statusCode,
          });
        }
        throw sgError;
      }

      return NextResponse.json({ 
        message: 'Message sent successfully! You will receive a response soon.' 
      }, { status: 200 });
      
    } catch (emailError) {
      console.error('SendGrid error:', emailError);
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