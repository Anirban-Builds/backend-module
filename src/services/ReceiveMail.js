import { Resend } from "resend"
import { MAIL_ID } from "../constants"

const resend = new Resend(process.env.RESEND_API_KEY)

const forwardMail = async (webhookEvent) => {
    const emailId = webhookEvent?.data?.email_id;

    if (!emailId) {
        console.error("No email_id received in webhook");
        return { success: false, error: "No email_id" };
    }

    console.log(`Fetching full email: ${emailId}`);

    // ← This is the important step
    const { data: received, error } = await resend.emails.getReceived(emailId);

    if (error || !received) {
        console.error("Failed to fetch received email:", error);
        return { success: false, error };
    }

    // Debug what we actually got
    console.log("Fetched email →", {
        from: received.from,
        subject: received.subject,
        textLength: received.text?.length || 0,
        htmlLength: received.html?.length || 0,
        hasText: !!received.text?.trim(),
        hasHtml: !!received.html?.trim()
    });

    let contentHtml = "<p><em>No content found in the original email</em></p>";

    if (received.html?.trim()) {
        contentHtml = received.html;
    } else if (received.text?.trim()) {
        contentHtml = `<div style="font-family: sans-serif; white-space: pre-wrap; line-height: 1.6;">
            ${received.text.replace(/\n/g, '<br>')}
        </div>`;
    }

    await resend.emails.send({
        from: "Anirban Builds <contact@anirbanbuilds.online>",
        to: MAIL_ID,
        subject: `Fwd: ${received.subject || "New Message via mailto"}`,
        html: `
            <div style="font-family: sans-serif; max-width: 700px; line-height: 1.6;">
                <hr style="border: 1px solid #ccc; margin: 20px 0;"/>
                <p><strong>Original From:</strong> ${received.from}</p>
                <p><strong>Original Subject:</strong> ${received.subject || "(no subject)"}</p>
                <hr style="border: 1px solid #ccc; margin: 20px 0;"/>
                ${contentHtml}
            </div>
        `,
        text: received.text || "No plain text version available."
    });

    console.log("✅ Email forwarded with body");
    return { success: true };
};

export { forwardMail };