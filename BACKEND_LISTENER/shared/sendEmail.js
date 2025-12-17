const nodemailer = require('nodemailer')

 

exports.sendEmail = (emailConfig, resData) => { //emailBody = {to, subject, text}

    return new Promise((resolve, reject) => {

        let transporter = nodemailer.createTransport({

            host: "smtp.office365.com",

            port: 587,

            secure: false,

            auth: {

                user: "info@adamma.in",

                pass: "Adamma@2025"

            }

        })

        let mailOptions = {

            from: "info@adamma.in",

            to: emailConfig.to,

            subject: emailConfig.subject,

            text: emailConfig.text

 

        }

        transporter.sendMail(mailOptions, function (error, info) {

            if (error) {

                reject(error)

            } else {

                if (resData) {

                    resolve( resData )

                } else {

                    resolve({ message: "Successfull" })

                }

            }

        })

    })

}
