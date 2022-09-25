const nodeMailer = require('nodemailer')
const {SMTP_PASSWORD, SMTP_USER, SMTP_PORT, SMTP_HOST, API_URL} = require('../constants')

class MailService {

    constructor() {
        this.transporter = nodeMailer.createTransport({
            host: SMTP_HOST,
            port: SMTP_PORT,
            secure: false,
            auth: SMTP_USER,
            pass: SMTP_PASSWORD
        })
    }

    async sendActivationMail(to, link) {
        await this.transporter.sendMail({
            from: SMTP_USER,
            to,
            subject: 'Restore password' + API_URL,
            test: '',
            html:
                `
                <div> 
                    <h1>Go to link</h1>
                    <a href="${link}">${link}</a>
                </div>
            `
        })
    }
}

module.exports = new MailService()