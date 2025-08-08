import resend from "../config/resend";
import {EMAIL_SENDER, ENV, NODE_ENV} from "../constants/env";

type Params = {
    to: string;
    subject: string;
    text: string;
    html: string;
}

const getEmailFrom = () =>
    NODE_ENV === ENV.DEVELOPMENT ? 'onboarding@resend.dev' : EMAIL_SENDER

const getEmailTo = (to: string) =>
    NODE_ENV === ENV.DEVELOPMENT ? 'delivered@resend.dev' : to

export const sendMail = async ({to, subject, text, html}: Params) =>
    await resend.emails.send({
        from: getEmailFrom(),
        to: getEmailTo(to),
        subject,
        text,
        html
    })