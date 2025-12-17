const sendMail = require("../mails/send_mail.controller")
const xlsx = require('xlsx')
const email_template = require("../../models/masters/email_template.model")
const fs = require("fs")
const path = require("path")
exports.sendExpiryEmail = async (req, res) => {
    try {

        if (String(req.user.user_id) !== "6273acffb930b917fe298963") {
            return res.status(403).json({ message: "You are not authorised to run this task." })
        }
        // Read Data from a worksheet 

        const wb = xlsx.readFile('/REPO_STORAGE/tmp_tl_tracker/client_details_report_6273acffb930b917fe298963.xlsx', { cellDates: true })
        const ws = wb.Sheets["TL Pending"]

        let data = xlsx.utils.sheet_to_json(ws)

        // Filter required data

        data = data.map((entry) => {
            return {
                Client: entry.Client,
                "Contract Expiry Date": entry["Contract Expiry Date"],
                "Client Type": entry["Client Type"],
                "Business Type": entry["Business Type"],
                "Days-Left": entry["Days-Left"]
            }
        })

        data = data.filter((entry) => {
            return entry['Days-Left'] < 46 && entry['Days-Left'] > 0
        })

        // Writing filtered data to a new excel file 

        const newWB = xlsx.utils.book_new()
        const newWS = xlsx.utils.json_to_sheet(data)
        xlsx.utils.book_append_sheet(newWB, newWS, "TL Pending")
        xlsx.writeFile(newWB, path.join("/REPO_STORAGE/tmp_tl_tracker", "client_expiry_data.xlsx"))

        // HTML for email table

        let message = (
            '<table style="border: 1px solid #333;  padding: 0 15px; border-collapse: collapse;" >' +
            '<thead style="font-size: 1.1em;">' +
            '<th> Client </th>' +
            '<th> Expiry Date </th>' +
	    '<th> Client Type </th>' +
	    '<th> Business Type </th>' +
            '<th> Days Left </th>' +
            '</thead>'
        );

        data.forEach(entry => {
            message += (
                '<tr>' +
                '<td>' + entry.Client + '</td>' +
                '<td>' + entry['Contract Expiry Date'] + '</td>' +
		'<td>' + entry['Client Type'] + '</td>' +    
		'<td>' + entry['Business Type'] + '</td>' +    
                '<td>' + entry['Days-Left'] + '</td>' +
                '</tr>'
            );
        })

        message += '</table>'

        // Querrying email template and sending email

        const template = await email_template.findOne({ name: "Agreement Expiry - Template" })
        let mailText = template.content
        let changedMailText = mailText.replace('&lt;&lt;DISCREPANCY-TABLE&gt;&gt', message)
        sendMail.sendMail("arun.kumar@verifacts.co.in, rajiv@verifacts.co.in, shruti@verifacts.co.in, branchhead.ind@verifacts.co.in, sanjayelisha@verifacts.co.in", "Critical Info : Agreement to be expired in 45 days", changedMailText, [{ filename: "client_expiry_data.xlsx", path: path.join("/REPO_STORAGE/tmp_tl_tracker", "client_expiry_data.xlsx") }])

        // // Deleting temp excel file

       /* setTimeout(() => {
            var filePath = path.join("/REPO_STORAGE/tmp_tl_tracker", "client_expiry_data.xlsx");
            fs.unlinkSync(filePath);
            console.log("file deleted")
        }, 4000)*/


        // Writing Log and Sending response 

       /* const content = new Date() + ":\nEmail Sent Successfully\n\n"

        fs.appendFile('/cvws_logs/client_expiry_email/stdout.log', content, err => {
            if (err) {
                console.error(err);
            }
            // file written successfully
        });*/
        res.json({ message: "Email Sent Successfully" })
    } catch (err) {
	    console.log(err)
       // const content = Date.now().toString + "\n Error Sending Email for client Expiry\nError: " + err + "\n\n"

        //fs.appendFile('/cvws_logs/client_expiry_email/stdout.log', content, err => {
          //  if (err) {
            //    console.error(err);
           // }
            // file written successfully
        //});
        res.status(500).json({
            message: "Error Sending Email for client Expiry"
        })
    }

}
