import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, phone, option1, option2, option3 } = req.body;

    console.log("Form Data Received:", { name, email, phone, option1, option2, option3 });

    // Nodemailer configuration
    try {
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: 'New Contact Form Submission',
        text: `New submission:\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nOption 1: ${option1}`,
      };

      await transporter.sendMail(mailOptions);
      console.log("Email sent successfully");

      res.status(200).json({ message: 'Form submitted successfully and email sent!' });
    } catch (error) {
      console.error('Email Sending Error:', error);
      res.status(500).json({ message: 'Error with email sending' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
