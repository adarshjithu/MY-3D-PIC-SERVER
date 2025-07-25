import nodemailer from 'nodemailer'
export function sendLinkToEmail(email: string, text: string,html:string): Promise<boolean> {
    const transporter = nodemailer.createTransport({
        service: "gmail", // Use your email service provider
        auth: {
            user:'adarshjithu10@gmail.com',
            pass: process.env.TRANSPORTER_PASSWORD,
        },
    });
    //interface for mail options
    interface MailOptions {
        from: string;
        to: string;
        subject: string;
        text?: string;
        html?: string;
    }
    const mailOptions = {
        from: "adarshjithu10@gmail.com",
        to: email,
        subject: 'Your Login Password - My 3d Pic',
        html:html
    };

    const sendEmail = async (mailOptions: MailOptions): Promise<boolean> => {
        try {
            await transporter.sendMail(mailOptions);

            console.log("Mail Send to ", mailOptions.to);
            //if otp success return true;
            return true;
        } catch (error) {
            console.error("Error sending email:", error);
            //if otp fails return false;
            return false;
        }
    };
    return sendEmail(mailOptions);
}