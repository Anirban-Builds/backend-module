import {Resend} from "resend"
import { MAIL_ID } from "../constants.js"
const resend = new Resend(process.env.RESEND_API_KEY)

const forwardMail = async({from, subject, text, html})=>{
    const content = text?.trim()
    ? `<p>${text}</p>`
    : html?.trim()
      ? html
      : "<p>No content</p>"

    await resend.emails.send({
        from: "Anirban Builds <contact@anirbanbuilds.online>",
        to : MAIL_ID,
        subject : `${subject}`,
        html: `
        <div style="font-family:sans-serif;">
            <hr/>
            <p><strong>From:</strong> ${from}</p>
            <p>${content}</p>
        </div>
        `
    })
}

export {forwardMail}