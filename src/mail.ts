/* eslint-disable no-console */
import nodemailer from 'nodemailer'
import { Attachment } from 'nodemailer/lib/mailer'

require('dotenv').config()
const receiverEmailAddress = 'wenhua4438@gmail.com'
const senderEmailAddress = 'dotennining@gmail.com'
const senderEmailPassword = process.env.MAIL_PASS
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // SSL
  auth: {
    user: senderEmailAddress,
    pass: senderEmailPassword,
  },
})
const mailOptions = {
  from: senderEmailAddress,
  to: receiverEmailAddress,
  subject: '{件名}',
  text: '{本文}',
  attachments: [{ filename: 'test.jpg', path: 'screenshots/test.jpg' }],
}
const sendMail = (subject: string, text: string, attachments?: Attachment[]) => {
  transporter.sendMail({ ...mailOptions, subject, text, attachments }, function(error, info) {
    if (error) {
      console.log(error)
    } else {
      console.log('Email sent: ' + JSON.stringify(info))
    }
  })
}

export { sendMail }
