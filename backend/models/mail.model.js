import nodemailer from 'nodemailer'
import 'dotenv/config';

// const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: process.env.MAIL_USER,
//         pass: process.env.MAIL_PASSWORD,
//     },
// });

// try {
//     console.log('Trying to verify mail service...')
//     await transporter.verify();
//     console.log('Mail service verified');
// } catch (error) {
//     throw error
// }

// export default function SendMail({ to, subject, text }) {
//     const mailcontent = {
//         from: process.env.MAIL_USER,
//         to: to,
//         subject: subject,
//         text: text
//     }
//     transporter.sendMail(mailcontent, (err, info) => {
//         if (err) {
//             console.error(err);
//         } else {
//             console.log(`Send successfully`);
//         }
//     });
// }