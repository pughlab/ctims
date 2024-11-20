import * as nodemailer from 'nodemailer';

export const sendMail = async (from: string, to: string, subject: string, html: string) => {
    const transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: 25,
        secure: false,
        auth: {
            user: process.env.MAIL_USERNAME,
            pass: process.env.MAIL_PASSWORD
        },
        tls: {
            // do not fail on invalid certs
            rejectUnauthorized: false,
            ciphers: 'SSLv3'
        }
    });

    const mailOptions = {
        from: from,
        to: to,
        subject: subject,
        html: html
    };

    console.info(`Sending mail to - ${to}`);
    transporter.sendMail(mailOptions, (error, info)=> {
        if (error) {
            console.error(error);
        } else {
            console.info('Email sent: ' + info.response);
        }
    });
}