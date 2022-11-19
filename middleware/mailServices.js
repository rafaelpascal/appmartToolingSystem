process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const axios = require('axios');
exports.sendMail = async (email, message, subject, attachment) => {
  console.log({attachment})
  const data = JSON.stringify({
    to: email,
    sender_name: 'UNIZIK',
    sender_email: 'noreply@unizik.edu.ng',
    vendor_code: 788897564,
    encoded: true,
    is_html: true,
    subject: subject,
    attachment_type:'single',
    attachment:attachment,
    msg: message,
    // attachments
  });


  const config = {
    method: 'post',
    url: 'https://api.appmartgroup.com/v3/mail/postSend',
    headers: {
      apikey: 'wqree45QRWg123559Lm1',
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Cookie: 'PHPSESSID=okdbrvc94sn22cvltlcvv36u1k',
    },
    data: data,
  };

  try {
    const emailSend = await axios(config);
    console.log('sending')
    console.log('jhgvjhgjhgjhgjhfjhfhjgf',data.to);

    console.log('email sent 1213246');

    // check if email was sent successfully
    if (emailSend.data.Code == '02') {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log({error});
  }
};