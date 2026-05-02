import nodemailer from "nodemailer";

export const sendSupportEmail = async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    //  Send email to YOU (admin)
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: `Support Request from ${name}`,
      html: `
        <h3>New Support Request</h3>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Message:</b><br/> ${message}</p>
      `,
    });

    // AUTO-REPLY EMAIL TO USER
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "We received your request - RentKaro Support",
      html: `
        <p>Hello ${name},</p>

        <p>Thank you for contacting <b>RentKaro</b>.</p>

        <p>We have received your request and our team will get back to you within <b>2 days</b>.</p>

        <p>If your issue is urgent, please reply to this email.</p>

        <br/>

        <p>Thanks for using RentKaro 🙌</p>
        <p><b>— RentKaro Support Team</b></p>
      `,
    });

    res.status(200).json({
      success: true,
      message: "Support request sent + auto reply delivered",
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Email failed",
    });
  }
};