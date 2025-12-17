
const nodemailer = require('nodemailer');
const ComponentFields = require("../../models/administration/component_field.model");
const Component = require("../../models/administration/component.model");
const {componentKeys:componentList} = require("../../shared/componentKeys.js");
require("dotenv").config();

const { ClientSecretCredential } = require("@azure/identity");
const { Client } = require('@microsoft/microsoft-graph-client');
const puppeteer = require('puppeteer');
const fs= require('fs');

const moment = require('moment');

/*import ComponentFields from "../../models/administration/component_field.model";
import Component from "../../models/administration/component.model";
import { componentKeys as componentList } from "./shared/componentKeys.js";
import dotenv from 'dotenv';
dotenv.config();

import { ClientSecretCredential } from "@azure/identity";
import { Client } from '@microsoft/microsoft-graph-client';
import puppeteer from 'puppeteer';
import fs from 'fs';
import moment from 'moment'; */


const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const tenantId = process.env.TENANT_ID;
const userEmail = process.env.USER_EMAIL;


const credentials = new ClientSecretCredential(tenantId, clientId, clientSecret);

const client = Client.initWithMiddleware({
    authProvider: {
        getAccessToken: async () => {
            const token = await credentials.getToken(['https://graph.microsoft.com/.default']);
            return token.token;
        }
    }
});

const readEmails = async (req,res) => {
    console.log("Test Enter@@@@@@@@@@@@@@@");
    try {
        const queryParameters = {
            "$filter": "isRead ne true and contains(subject, 'CASEID') and contains(subject, 'Verification of')"
        };

        const messages = await client.api(`/users/${userEmail}/mailFolders/inbox/messages`).query(queryParameters).get();
        
        if(!messages?.value?.length){
            return res.send("No mails to read")

        }
        let index=0;

        for (const message of messages.value) {
            let buildPath = "",caseId="",componentname="",componentDocId="", extractedTableInfo=[];
            
            if (message?.subject) {
                
                let mailSubject= message.subject.substring(message.subject.indexOf("CASEID"),message.subject.length);
             
                const subjectParts = mailSubject.split("-");
                console.log("subjectParts", subjectParts.length);

                if (subjectParts.length < 3 || !componentList[subjectParts[2].split(":")[0].trim()]) {
                    // console.log("skip statement executing.......");
                    index++;
                     
                    continue;
                }
                // console.log(subjectParts[2].split(":")[0].trim());
                
                caseId = subjectParts[0].trim().slice(-12) ;
                componentname = componentList[subjectParts[2].split(":")[0].trim()] ;
                componentDocId = subjectParts[2].split(":")[1].trim();

                buildPath += `${caseId}/${componentname}/${componentDocId}`;

                console.log( `${caseId}/${componentname}/${componentDocId}`) 

                if(message?.body?.content?.includes("</table>")&& message?.body?.content?.includes("Label") && message.body.content.includes("Details Provided") && message.body.content.includes("Details Verified")){
                    const bodyContent=message.body.content.slice(findSpecifiedOccurance(message.body.content,'<tr',1) ,message.body.content.indexOf('</table>')).split('</td>');
                 

                    let i=0;
                    let row={};
                    for(let item of bodyContent){
                        i++;
                        const string =  item;
            
            
            
                        let s;
                        if(string.endsWith('</span>')){
                            s=string.slice(string.lastIndexOf('">')+2,string.lastIndexOf("</span>"));
                        }else if(string.endsWith('</div>')){
                            s=string.slice(string.lastIndexOf('">')+2,string.lastIndexOf("</div>"));
                        }
            
                        if(i===1){
                            row.label=s;
                        }else if(i===2){
                            row.lhs=s;
                        }else if(i===3){ 
                            row.rhs=s;
                            if(row.label && row.lhs && row.rhs){
                                extractedTableInfo.push(row);
                            }
                            i=0;
                            row={};
            
                        }
                        
                    }
            
               
                     console.log("extractedTableInfo",extractedTableInfo);
                    
                }
              

            }

            console.log("Fetching recipients and received time")
            const messageDetails = await client.api(`/users/${userEmail}/messages/${message.id}`)
                .select("from, toRecipients, ccRecipients, receivedDateTime")
                .get();

            const fromName = messageDetails.from.emailAddress.name;
            const fromEmail = messageDetails.from.emailAddress.address;
            const toRecipients = messageDetails.toRecipients.map(recipient => `${recipient.emailAddress.name} <${recipient.emailAddress.address}>`);
            const ccRecipients = messageDetails.ccRecipients.map(recipient => `${recipient.emailAddress.name} <${recipient.emailAddress.address}>`);
            const receivedDateTime = new Date(messageDetails.receivedDateTime).toLocaleString();

	    console.log("Storing the information")	
		buildPath = buildPath.replace("EID : ", "")	
            const path = `/REPO_STORAGE/case_uploads/${buildPath}/proofofwork`;

            fs.mkdirSync(path, { recursive: true });

            // Generate HTML with proper formatting
            const htmlContent = `
                <p><strong>From:</strong> ${fromName} &lt;${fromEmail}&gt;</p>
                <p><strong>Sent:</strong> ${receivedDateTime}</p>
                <p><strong>To:</strong> ${toRecipients.join(", ")}</p>
                <p><strong>Cc:</strong> ${ccRecipients.join(", ")}</p>
                <p><strong>Subject:</strong> ${message.subject}</p>
                <hr>
                ${modifyTableWidth(message.body.content)}
            `;
             console.log("Final Storage")
            await convertHtmlToPDF(htmlContent,path,`confirmation_${Date.now()}.pdf`)

            try {
                // console.log("model path",`./models/data_entry/${componentname}.model`);
                const Model = require(`../../models/data_entry/${componentname}.model`); // Corrected require statement
                const modelDoc = await Model.findOne({ _id: componentDocId });
            
                if (modelDoc) {
                    let payload = {
                        $push: {
                            mailRepliedOn: receivedDateTime
                        }
                    };

       
                    const ComponentInfo = await Component.findOne({name:componentname}).lean();

                    if(ComponentInfo){
                        const componentFields = await ComponentFields.find({component:ComponentInfo._id,lhsRhs:"BOTH"}).lean();

                        for(let item of extractedTableInfo){

                            for(let item2  of componentFields){
                                if(item2.label.includes(item.label)){
                                    payload[item2.name+"Rhs"]= item.rhs
                                }
                            }
                        }
                    }
                    
                    // console.log("payload.....",payload);
                    await Model.findOneAndUpdate({ _id: componentDocId }, payload);
                }
            
            } catch (err) {
                console.error("Error:", err); // Logging the actual error object
                return res.send(err)

            }
            // Mark the email as read
            await client.api(`/users/${userEmail}/messages/${message.id}`)
                .patch({ isRead: true });
                index++;

        }
        return res.send("reading mail success")
    } catch (error) {
        console.error(error);
        return res.send(error)
    }
};



async function convertHtmlToPDF(html, filepath, fileName) {

    await fs.promises.mkdir(filepath, { recursive: true });
console.log("FilePath and Filename:",  filepath + "/" + fileName)
    try {

        // Create a browser instance
        const browser = await puppeteer.launch({
            headless: 'new',
            args: ['--no-sandbox', '--disable-setuid-sandbox']

        });
        // Create a new page
        const page = await browser.newPage();
        
        await page.setContent(html, { waitUntil: 'domcontentloaded' });
        // To reflect CSS used for screens instead of print
        await page.emulateMediaType('screen');
        // Download the PDF
        const PDF = await page.pdf({
            path: filepath + "/" + fileName,
            margin: { top: '100px', right: '50px', bottom: '100px', left: '50px' },
            printBackground: true,
            format: 'A4',
        });
        // Close the browser instance
        await browser.close();
        console.log("convert to pdf successfully completed",PDF);
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }

}



async function sendFollowUpEmail(req,res){
    console.log("Enter@@@@@@@@@@@@@@@");
    const modelsToQuery = ["education"];

    let isAnyMailSent=false;
    
        for(let modelname of modelsToQuery){
        
        const Model = require(`../../models/data_entry/${modelname}.model`);

    const ModelMongodbDocuments = await Model.find({mailsentOn:{$exists:true},mailRepliedOn:{$exists:false}}).populate('case',"caseId candidateName nameofemployer -_id").lean();
	console.log("ModelMongodbDocuments:", ModelMongodbDocuments)	
       if(ModelMongodbDocuments?.length){
        
        for(let ModelMongodbDocument of ModelMongodbDocuments){

            let startDate;
            if(ModelMongodbDocument?.mailRepliedOn){

                startDate = ModelMongodbDocument?.mailRepliedOn[ModelMongodbDocument?.mailRepliedOn.length - 1];
            }else{
                startDate = ModelMongodbDocument.mailsentOn;
            }
            

            const date1 = new Date(startDate);
            const date2 = new Date();
            const diffInDays = Math.abs((date2 - date1) / (1000 * 60 * 60 * 24));
            const sentDay = date1.getDay();
            let mailCanBeSend = true;
            /*if(sentDay===0 && diffInDays > 3){
                mailCanBeSend=true;
            }else if(sentDay===6 && diffInDays > 4){
                mailCanBeSend=true;

            }else if (sentDay!= 0 && sentDay!=6 && diffInDays > 2) {
                mailCanBeSend=true;

            }else{
                continue;
            }*/

            console.log("mailCanBeSend",mailCanBeSend);
            if(mailCanBeSend){
                const subject = `Follow-Up:CASEID : ${ModelMongodbDocument.case.caseId}-Verification of ${ModelMongodbDocument.case.candidateName}-${getKeyByValue(componentList, modelname)}:${ModelMongodbDocument._id}`;

               console.log("subject",subject)    
                const componentFields = await ComponentFields.find({component:ModelMongodbDocument.component, lhsRhs:{$in:["BOTH","LHS"]}},{label:1,name:1,_id:0}).lean()
                let htmlTable = prepareHTMLTable(componentFields,ModelMongodbDocument);
                console.log(componentFields)

                let followUpBody="";
                if(modelname.startsWith('edu')){
                    followUpBody = prepareFollowpMailBodyForEducation(moment(ModelMongodbDocument.mailsentOn).format('YYYY-MM-DD, HH:mm:ss'), ModelMongodbDocument.nameofuniversity,htmlTable)
		console.log(followUpBody)
                }else if(modelname.startsWith('emp')){
                    followUpBody = prepareFollowUpEmailForEmploymentVerification(moment(ModelMongodbDocument.mailsentOn).format('YYYY-MM-DD, HH:mm:ss'),ModelMongodbDocument.nameofemployer,ModelMongodbDocument.case.candidateName,htmlTable)
                }

                try{

                   const toAddessInfo = await getToAndCCMailAddresses(modelname, ModelMongodbDocument);
                   console.log(toAddessInfo)
                  const fileNames =  await readFileNames(ModelMongodbDocument.case.caseId,modelname,ModelMongodbDocument._id);
                   if(toAddessInfo && toAddessInfo.to){
                   
                    const payload={
                        toEmail:toAddessInfo.to,
                        subject:subject,
                        body:followUpBody,
                        filenames: fileNames,
                        caseId:ModelMongodbDocument.case.caseId,
                        componentDocId:ModelMongodbDocument._id,
                        componentName:modelname,
                        folderName:"candidatedocs"
                      }
                      console.log("payload:", payload)
                      try{
                          const mailResponse = await emailCandidateDataOfACheck(payload);
			  console.log(mailResponse)	
                          if(mailResponse?.success){
                            isAnyMailSent=true;
                            let payload = {
                                $push: {
                                    mailFollowUpsOn: new Date()
                                }
                            };
                            await Model.findOneAndUpdate({_id:ModelMongodbDocument._id},payload)
                          } 


                      }catch(err){
                        console.log("err",err);
                        return res.status(500).json({message:"Unexpected error occured while sending mail"})
                      }

                   }

                }catch(err){
                    return res.status(500).json({message:"Unexpected error occured"})
                }


            }


        }
       }
       

    }




    
    if(isAnyMailSent){
        return res.status(200).json({ message: "Follow-up email sent successfully as a reply." });

    }else{
        return res.status(200).json({ message: "No mails to found that needs to be follow up" });

    }

}

function getKeyByValue(obj, value) {
    return Object.keys(obj).find(key => obj[key] === value);
}

function prepareFollowpMailBodyForEducation(mailsentOn, university,htmlTable) {
    const mailbody = `
         <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>

            <style>
                #customers {
                    font-family: Arial, Helvetica, sans-serif;
                    border-collapse: collapse;
                    width: 100%;
                }
    
                #customers td, #customers th {
                       border: 1px solid #ddd;
                       padding: 8px;
                }
    
                #customers tr:nth-child(even){background-color: #E2E2E2;}
    
                #customers tr:hover {background-color: #ddd;}
    
                #customers th {
                   padding-top: 12px;
                   padding-bottom: 12px;
                   text-align: left;
                   background-color: #04AA6D;
                   color: white;
                }
           </style>
        </head>
        <body style="font-family: Arial, sans-serif;">
            <p>Hi,</p>
            <p>I hope this message finds you well. I am following up on my previous email dated ${mailsentOn} regarding our request for verification of a candidate's educational details from ${university}.</p>
            <p>We understand that you may be busy, but we kindly request your assistance in verifying the authenticity of the educational details provided by the candidate. Your confirmation regarding the accuracy of the information is crucial for us to proceed with our verification process.</p>
            <p>Could you please prioritize this request and provide us with the verified details at your earliest convenience? If there are any specific requirements or additional information needed from our end to facilitate this process, please let us know.</p>
            <p>Thank you for your attention to this matter. I look forward to your prompt response.</p>
            <br>`+htmlTable+`<br>
            <p>Best regards,</p>
            <p>[Your Full Name]</p>
            <p>[Your Position]</p>
            <p>Adamma Info Services Private</p>
            <p>9008697912</p>
        </body>
        </html>
    `;
    return mailbody;
}

function prepareFollowUpEmailForEmploymentVerification(mailsentOn, company, candidateName, htmlTable) {
    const mailbody = `
        <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>

            <style>
               #customers {
                 font-family: Arial, Helvetica, sans-serif;
                 border-collapse: collapse;
                 width: 100%;
                }
    
              #customers td, #customers th {
                  border: 1px solid #ddd;
                  padding: 8px;
               }
    
              #customers tr:nth-child(even){background-color: #E2E2E2;}
    
              #customers tr:hover {background-color: #ddd;}
    
              #customers th {
                 padding-top: 12px;
                 padding-bottom: 12px;
                 text-align: left;
                 background-color: #04AA6D;
                 color: white;
              }
           </style>
         </head>
        <body style="font-family: Arial, sans-serif;">
            <p>Dear [HR's Name],</p>
            
            <p>I hope this message finds you well. I am writing to follow up on my previous email dated ${mailsentOn} regarding the employment verification of ${candidateName}, who listed ${company} as their previous employer.</p>
            
            <p>We understand that you may be busy, but we kindly request your assistance in verifying the employment details of ${candidateName} at ${company}. Your confirmation regarding the accuracy of these details is crucial for us to complete our verification process.</p>
            
            <p>Could you please prioritize this request and provide us with the necessary information at your earliest convenience? If there are any specific requirements or additional information needed from our end to facilitate this process, please let us know.</p>
            
            <p>Thank you for your attention to this matter. I look forward to your prompt response.</p>
            
            <br>

            ${htmlTable}

            <br/>
            <p>Best regards,</p>
            <p>[Your Full Name]</p>
            <p>[Your Position]</p>
            <p>Adamma Info Services Private Limited</p>
            <p>888000</p>
        </body>
        </html>
    `;
    return mailbody;
}
  

 async function getToAndCCMailAddresses(componentName,checkModelRecord){
    try{
           const responseObj={to:""}
   
     
    


        const checkField={"education":"institutename","educationcomprehensive":"nameofuniversity","educationadvanced":"nameofuniversity","eduintl":"nameofuniversity","techmeducation":"nameofuniversity",
               "employment":"nameofemployer","empbasic":"nameofemployer","empadvance":"nameofemployer","empintl":"nameofemployer","techmemployment":"nameofemployer"};

          
          let checkMasterModel = require(`../../models/masters/${componentName.includes("emp")? "company":"university"}.model`);

        console.log("[checkModelRecord[checkField[componentName]]] :", [checkModelRecord[checkField[componentName]]] )   
           const checkMasterData = await checkMasterModel.findOne({name: [checkModelRecord[checkField[componentName]]]  },{_id:0,email:1})
       console.log("checkMasterData:", checkMasterData) 
           if(!checkMasterData){
            return responseObj

           }
           responseObj.to=checkMasterData.email;
	
           return responseObj

    }catch(error){
        console.log(error);
        return {message:"Unexpected error occured. please, try again later."};
    }
}


async function emailCandidateDataOfACheck (payload){
    try{

        let {toEmail,subject,body,caseId,componentDocId,componentName,filenames,folderName} =payload;

        folderName=folderName? `/${folderName}/`:"/email_attachments/";
        const attachments=[];

        for(let filename of filenames){
            let filePath = '/REPO_STORAGE/case_uploads/' + caseId + '/' + componentName + '/' + componentDocId + folderName + filename + '.pdf';

            let attachment={filename:filename+".pdf",path:filePath};
            attachments.push(attachment);

        }
        let transporter = nodemailer.createTransport({
            host: "smtp.office365.com",
            port: 587,
            secure: false,
            auth: {
                user: "info@adamma.in",
                pass: "Adamma@123"
            }
        })
        let mailOptions = {
            from: "info@adamma.in",
            to: toEmail,
            subject: subject,
            html: body,
            attachments:attachments.length? attachments : []
        }
 
        let info = await transporter.sendMail(mailOptions);
        console.log("info:", info);
        return {success:true, message: "Email sent successfully" }

    }catch(error){
        console.log("error in emailCandidateDataOfACheck",error);
        return {success:false, message:"Unexpected error occured. Please try again."}
    }
}

async function readFileNames(caseId,componentName,componentId){
    let files = new Array()
    const sortedfiles = []
    let filePath

    if (fs.existsSync('/REPO_STORAGE/case_uploads/' + caseId)) {
        filePath = '/REPO_STORAGE/case_uploads/' + caseId + '/' + componentName + '/' + componentId + '/candidatedocs'
    } else {
        filePath = '/archive/case_uploads/' + caseId + '/' + componentName + '/' + componentId + '/candidatedocs'
    }
    if (fs.existsSync(filePath)) {
        fs.readdirSync(filePath).forEach(file => {
            files.push({ fileName: file, time: fs.statSync(`${filePath}/${file}`).birthtime })
        })

        files.sort((a, b) => a.time - b.time)

        files.forEach(file => {
            let indexOfDot = file.fileName.lastIndexOf(".")
            sortedfiles.push(file.fileName.substring(0, indexOfDot))
        })

    }

    return sortedfiles;
};

function prepareHTMLTable(componentFields,componentDoc){

    let htmlTable = `
    
        <table id="customers">
        <thead>
          <tr>
            <th>Label</th>
            <th>Details Provided</th>
            <th>Details Verified</th>
          </tr>
        </thead>
        <tbody>
        `
        
        for(let item of componentFields){
          htmlTable+=`<tr> <td>${item.label}</td>
          <td>${componentDoc[item.name] || ""}</td>
          <td>${componentDoc[item.name+"Rhs"] || ""}</td>
          </tr>`
        }
        htmlTable+="</tbody></table>";

        return htmlTable;
}

function findSpecifiedOccurance(str,val,index){

    const indices = [];
    let startIndex = 0;
    
    while (true) {
      const index = str.indexOf(val, startIndex);
      if (index === -1) break;
      indices.push(index);
      startIndex = index + 1;
    }
    
    // console.log(indices[3]); 

    return indices[index]
}

function modifyTableWidth(html) {
    // Define a regular expression to find the table width in style attribute
    let regex = /(<table[^>]*style="[^"]*width:\s*)([^;"]*)([^"]*"[^>]*>)/gi;

    // Use replace method to modify the width attribute
    let modifiedHTML = html.replace(regex, function(match, p1, p2, p3) {
        // Replace the width value with 1020px
        return p1 + '1020px' + p3;
    });

    return modifiedHTML;
}
module.exports = {readEmails,sendFollowUpEmail};
