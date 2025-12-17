const nodeMailer = require('nodemailer')
const { create } = require('simple-oauth2');


exports.sendMail = (mailAddresses,subjectText,htmlText,attachments)=>{
    console.log("In Send Mail")	
    let transporter = nodeMailer.createTransport({
        host:"smtp.office365.com",
        port:587,
        secure:false,
        auth:{
             user:"info@adamma.in",
             pass:"Adamma@2025"
        }
    })
    console.log("Created Transporter and setting mail options")	
    let mailOptions = {
        from:"info@adamma.in",
        to:mailAddresses,
        subject:subjectText,
        html:htmlText,
	attachments: attachments ? attachments : []
    }
    console.log("Mail Options set.....will send the mail now")	
    transporter.sendMail(mailOptions,function(error,info){
        if(error){
           console.log("Error Sending Mail................",error);
           return false
        }else{
	   console.log('Mail Sent to ',mailAddresses)	
           return true;
        }
  })

}
/*

const oauthConfig = {
    client: {
        id: "7c3fa100-b06a-439e-9a8f-5286c727e91c",
        secret: "XPo8Q~x~2Hw.ORjBubO2qH6l.8P6VS.7oEHu~b5d"
    },
    auth: {
        tokenHost: "https://login.microsoftonline.com",
        tokenPath: "/8f9372d6-92ff-4057-809f-2f0a599a2e21/oauth2/v2.0/token"
    }
};
console.log("Sender ID")
// Your sender email
const senderEmail = "info@adamma.in";
exports.sendMail = async(madilAddresses, changedSubject, changedMailText)=> {
    try {
        // Create OAuth2 client
        const oauth2Client = create(oauthConfig);
        const tokenParams = {
            scope: "https://outlook.office365.com/.default"
        };
        const token = await oauth2Client.clientCredentials.getToken(tokenParams);
        const accessToken = token.token.access_token;
        console.log("Token")
        // Nodemailer setup
	   console.log("oauth2Client:", oauth2Client)
        const transporter = nodeMailer.createTransport({
            host: "smtp.office365.com",
            port: 587,
            secure: false,
            auth: {
                type: "OAuth2",
                user: senderEmail,
                accessToken: accessToken
            }
        });
        const mailOptions = {
            from: senderEmail,
            to: madilAddresses, // Or hardcode if testing
            subject: changedSubject,
            text: changedMailText
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log("Email error: ", error);
            } else {
                console.log("Email sent: ", info.messageId);
            }
        });
    } catch (err) {
        console.error("Caught error: ", err);
    }
}
*/
