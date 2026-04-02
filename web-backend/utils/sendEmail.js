import nodemailer from "nodemailer";

const sendEmail = async ({ to, subject, html }) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    console.log("📧 Sending email to:", to);

    const info = await transporter.sendMail({
      from: `"RentKaro" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });

    console.log("✅ Email sent:", info.response);

    return true;
  } catch (error) {
    console.error("❌ EMAIL ERROR:", error.message);
    throw new Error("Email failed");
  }
};

export default sendEmail;