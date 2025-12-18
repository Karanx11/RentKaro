import axios from "axios";

const sendSms = async ({ phone, message }) => {
  await axios.post(
    "https://www.fast2sms.com/dev/bulkV2",
    {
      route: "transactional",
      numbers: String(phone),
      message,
    },
    {
      headers: {
        authorization: process.env.FAST2SMS_API_KEY,
        "Content-Type": "application/json",
      },
    }
  );
};

export default sendSms;
