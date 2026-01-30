import nodemailer from "nodemailer";

const sendEmail = async ({ to, subject, otp }) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const html = `
    <div style="font-family: Arial, sans-serif; background:#f5f5f5; padding:20px;">
      <div style="max-width:480px; margin:auto; background:#ffffff; border-radius:12px; padding:24px; text-align:center;">
        
        <h2 style="margin-bottom:8px; color:#111;">
          Welcome to <span style="color:#C76A46;">RentKaro</span> 👋
        </h2>

        <p style="color:#555; font-size:14px; margin-bottom:16px;">
          Thank you for choosing RentKaro!  
          We’re excited to have you with us 💙
        </p>

        <p style="color:#333; font-size:14px;">
          Use the OTP below to verify your email:
        </p>

        <div style="
          margin:16px auto;
          padding:12px 20px;
          font-size:24px;
          font-weight:bold;
          letter-spacing:6px;
          background:#f0f0f0;
          border-radius:8px;
          display:inline-block;
          color:#111;
        ">
          ${otp}
        </div>

        <p style="color:#777; font-size:12px; margin-top:16px;">
          This OTP is valid for a limited time.  
          Please do not share it with anyone.
        </p>

        <p style="color:#888; font-size:12px; margin-top:24px;">
          Happy renting & selling 🚀 <br />
          — Team RentKaro
        </p>
      </div>
    </div>
  `;

  await transporter.sendMail({
    from: `"RentKaro" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
  });
};

export default sendEmail;
