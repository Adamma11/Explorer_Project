//////////////////////////////////////////////Prod//////////////////////////////////////////////////////
const path = require("path");
const fs = require("fs");
const PDFDocument = require("pdfkit");
const axios = require("axios");
const surepassToken = process.env.SUREPASStOKEN;
const FormData = require("form-data");
const pdf = require("html-pdf");
require("dotenv").config();

const IdentityExternalApiHistory = require("../../models/support/identity_external_api_history.model");

exports.downloadApiReport = async (req, res) => {
  try {
    let checkVerification = req.body.verificationType;
    let caseId = req.body.caseIdValue;
    console.log(caseId);
    console.log("Selected check is: ", checkVerification);

    if (checkVerification === "Voter Id") {
      const epicId = req.body.epicid;
      console.log(epicId);
      const response = await axios.post(
        "https://kyc-api.surepass.io/api/v1/voter-id/voter-id",
        { id_number: epicId },
        {
          headers: {
            Authorization: `Bearer ${surepassToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      await this.saveData(caseId, checkVerification, response, req);
      await convertToPdf(response.data.data, req.body, checkVerification);
      res.json(response.data);
    } else if (checkVerification === "Driving License") {
      try {
        const license_number = req.body.license_number;
        const dob = req.body.dob;

        const response = await axios.post(
          "https://kyc-api.surepass.io/api/v1/driving-license/driving-license",
          { id_number: license_number, dob: dob },
          {
            headers: {
              Authorization:  'Bearer  eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY5ODMwMjg1OCwianRpIjoiZWU2ZGUyYmMtOWRkNC00OWE2LWI4ODUtNWU5ZDZkZTk3MDE2IiwidHlwZSI6ImFjY2VzcyIsImlkZW50aXR5IjoiZGV2LnZlcmlmYWN0c0BzdXJlcGFzcy5pbyIsIm5iZiI6MTY5ODMwMjg1OCwiZXhwIjoyMDEzNjYyODU4LCJ1c2VyX2NsYWltcyI6eyJzY29wZXMiOlsid2FsbGV0Il19fQ.mGLCMDwHZxHHe9oa3Y0KzInaMOVukW7XArhr_yzg2DY',
		  //  Authorization: `Bearer ${surepassToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        const decodedImage = Buffer.from(
          response.data.data.profile_image,
          "base64"
        );
        const outputpath = path.join(__dirname, "output_dl_profile.jpg");
        fs.writeFileSync(outputpath, decodedImage);
        response.data.data.profile_image = outputpath;
        await this.saveData(caseId, checkVerification, response, req);
        await convertToPdf(response.data.data, req.body, checkVerification);
        const base64Data = fs.readFileSync(
          response.data.data.profile_image,
          "base64"
        );
        const dataUri = "data:image/jpeg;base64," + base64Data;
        fs.unlinkSync(outputpath);
        response.data.data.profile_image = dataUri;

        res.json(response.data);
      } catch (error) {
        console.log("dl err", error);
      }
    } else if (checkVerification === "PAN Lite") {
      const pan = req.body.pan;
      console.log(pan);
      const response = await axios.post(
        "https://kyc-api.surepass.io/api/v1/pan/pan",
        { id_number: pan },
        {
          headers: {
            Authorization: `Bearer ${surepassToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      await this.saveData(caseId, checkVerification, response, req);
      await convertToPdf(response.data.data, req.body,checkVerification);
      res.json(response.data);
    } else if (checkVerification === "PAN Comprehensive") {
      const pan = req.body.pan;
      console.log(pan);
      const response = await axios.post(
        "https://kyc-api.surepass.io/api/v1/pan/pan-comprehensive",
        { id_number: pan },
        {
          headers: {
            Authorization: `Bearer ${surepassToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      await this.saveData(caseId, checkVerification, response, req);
      await convertToPdf(response.data.data, req.body, checkVerification);
      res.json(response.data);
    } else if (checkVerification === "PAN Advanced") {
      const pan = req.body.pan;
      console.log(pan);
      const response = await axios.post(
        "https://kyc-api.surepass.io/api/v1/pan/pan-adv",
        { id_number: pan },
        {
          headers: {
            Authorization: `Bearer ${surepassToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      await this.saveData(caseId, checkVerification, response, req);
      await convertToPdf(response.data.data, req.body, checkVerification);
      res.json(response.data);
    } else if (checkVerification === "Pan To UAN") {
      const pan = req.body.pan;
      console.log(pan);
      const response = await axios.post(
        "https://kyc-api.surepass.io/api/v1/pan/pan-to-uan",
        { pan_number: pan },
        {
          headers: {
//            Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI                                                                                                             6MTY5ODMwMjg1OCwianRpIjoiZWU2ZGUyYmMtOWRkNC00OWE2LWI4ODUtNWU5ZDZkZTk3MDE2IiwidHl                                                                                                             wZSI6ImFjY2VzcyIsImlkZW50aXR5IjoiZGV2LnZlcmlmYWN0c0BzdXJlcGFzcy5pbyIsIm5iZiI6MTY                                                                                                             5ODMwMjg1OCwiZXhwIjoyMDEzNjYyODU4LCJ1c2VyX2NsYWltcyI6eyJzY29wZXMiOlsid2FsbGV0Il1                                                                                                             9fQ.mGLCMDwHZxHHe9oa3Y0KzInaMOVukW7XArhr_yzg2DY`,
 Authorization:	 'Bearer  eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY5ODMwMjg1OCwianRpIjoiZWU2ZGUyYmMtOWRkNC00OWE2LWI4ODUtNWU5ZDZkZTk3MDE2IiwidHlwZSI6ImFjY2VzcyIsImlkZW50aXR5IjoiZGV2LnZlcmlmYWN0c0BzdXJlcGFzcy5pbyIsIm5iZiI6MTY5ODMwMjg1OCwiZXhwIjoyMDEzNjYyODU4LCJ1c2VyX2NsYWltcyI6eyJzY29wZXMiOlsid2FsbGV0Il19fQ.mGLCMDwHZxHHe9oa3Y0KzInaMOVukW7XArhr_yzg2DY',
            "Content-Type": "application/json",
          },
        }
      );
      await this.saveData(caseId, checkVerification, response, req);
      await convertToPdf(response.data.data, req.body, checkVerification);
      res.json(response.data);
    } else if (checkVerification === "Aadhaar To UAN") {
      console.log(req.body);
      const aadhaarId = req.body.aadhaarnum;
      const response = await axios.post(
        "https://kyc-api.surepass.io/api/v1/income/epfo/aadhaar-to-uan",
        { aadhaar_number: aadhaarId },
        {
          headers: {
	  Authorization:  'Bearer  eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY5ODMwMjg1OCwianRpIjoiZWU2ZGUyYmMtOWRkNC00OWE2LWI4ODUtNWU5ZDZkZTk3MDE2IiwidHlwZSI6ImFjY2VzcyIsImlkZW50aXR5IjoiZGV2LnZlcmlmYWN0c0BzdXJlcGFzcy5pbyIsIm5iZiI6MTY5ODMwMjg1OCwiZXhwIjoyMDEzNjYyODU4LCJ1c2VyX2NsYWltcyI6eyJzY29wZXMiOlsid2FsbGV0Il19fQ.mGLCMDwHZxHHe9oa3Y0KzInaMOVukW7XArhr_yzg2DY',
            "Content-Type": "application/json",
          },
        }
      );
      await this.saveData(caseId, checkVerification, response, req);
      await convertToPdf(response.data.data, req.body, checkVerification);
      res.json(response.data);
    } else if (checkVerification === "Mobile to UAN") {
      console.log(req.body);
      const mobileNum = req.body.mobile;
      const response = await axios.post(
        "https://kyc-api.surepass.io/api/v1/income/epfo/find-uan",
        { mobile_number: mobileNum },
        {
          headers: {
  Authorization:  'Bearer  eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY5ODMwMjg1OCwianRpIjoiZWU2ZGUyYmMtOWRkNC00OWE2LWI4ODUtNWU5ZDZkZTk3MDE2IiwidHlwZSI6ImFjY2VzcyIsImlkZW50aXR5IjoiZGV2LnZlcmlmYWN0c0BzdXJlcGFzcy5pbyIsIm5iZiI6MTY5ODMwMjg1OCwiZXhwIjoyMDEzNjYyODU4LCJ1c2VyX2NsYWltcyI6eyJzY29wZXMiOlsid2FsbGV0Il19fQ.mGLCMDwHZxHHe9oa3Y0KzInaMOVukW7XArhr_yzg2DY',
            "Content-Type": "application/json",
          },
        }
      );
      await this.saveData(caseId, checkVerification, response, req);
      await convertToPdf(response.data.data, req.body, checkVerification);
      res.json(response.data);
    } else if (checkVerification === "Employment History") {
      console.log(req.body);
      const uanNum = req.body.uan;
      console.log("UAANNNNN", uanNum);
      const response = await axios.post(
        "https://kyc-api.surepass.io/api/v1/income/employment-history-uan",
        { id_number: uanNum },
        {
          headers: {
            Authorization: `Bearer ${surepassToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      await this.saveData(caseId, checkVerification, response, req);
      await convertToPdf(response.data.data, req.body, checkVerification);
      res.json(response.data);
    } else if (checkVerification === "Email Check") {
      console.log(req.body);
      const emailId = req.body.emailaddress;
      const response = await axios.post(
        "https://kyc-api.surepass.io/api/v1/employment/email-check",
        { email: emailId },
        {
          headers: {
            Authorization: `Bearer ${surepassToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      await this.saveData(caseId, checkVerification, response, req);
      await convertToPdf(response.data.data, req.body, checkVerification);
      res.json(response.data);
    } else if (checkVerification === "Credit Score") {
      const name = req.body.name;
      const pan = req.body.pan;
      const mobile = req.body.mobile;
      const consent = req.body.consent;
      const response = await axios.post(
        "https://kyc-api.surepass.io/api/v1/credit-report-v2/fetch-report",
        { name: name, pan: pan, mobile: mobile, consent: consent },
        {
          headers: {
            Authorization: `Bearer ${surepassToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      await this.saveData(caseId, checkVerification, response, req);
      await convertToPdf(response.data.data, req.body, checkVerification);
      res.json(response.data);
    } else if (checkVerification === "Face Verification") {
      if (!req.files || !req.files.selfie || !req.files.id_card) {
        console.error("Error: Required files are missing.");
        return res.status(400).json({ message: "Required files are missing." });
      }
      let formData = new FormData();
      formData.append("selfie", req.files.selfie.data, req.files.selfie.name);
      formData.append(
        "id_card",
        req.files.id_card.data,
        req.files.id_card.name
      );

      console.log("formData == ", formData);

      try {
        const response = await axios.post(
          "https://kyc-api.surepass.io/api/v1/face/face-match",
          formData,
          {
            headers: {
              Authorization: `Bearer ${surepassToken}`,
              ...formData.getHeaders(),
            },
          }
        );
        await convertToPdf(response.data.data, req.body, checkVerification);
        res.json(response.data);
      } catch (error) {
	              // 16jan24
        console.error("Error in API request:", error.response.data.message);
        res.status(500).json({ message: error.response.data.message});
        //end
        /*console.error("Error in API request:", error.message);
        res.status(500).json({ error: "Internal server error." });*/
      }
    } else if (checkVerification === "Telecom Verification") {
      const client_id = req.body.client_id;
      const otp = req.body.otp;

      console.log("client_id", client_id);
      console.log("otp", otp);

      const response = await axios.post(
        "https://kyc-api.surepass.io/api/v1/telecom/submit-otp",
        { client_id: client_id, otp: otp },
        {
          headers: {
            Authorization: `Bearer ${surepassToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("tel--response", response.data.data);
      await this.saveData(caseId, checkVerification, response, req);
      await convertToPdf(response.data.data, req.body, checkVerification);
      res.json(response.data);
	    
    } else if (checkVerification === "Bank Verification"){
      let bankNumber = req.body.accountNum;
      let ifscNumber = req.body.ifsc
      console.log('bankNumber',bankNumber)
      console.log('ifscNumber',ifscNumber)
      let response =await axios.post(
        'https://kyc-api.surepass.io/api/v1/bank-verification/',
        {id_number:bankNumber , ifsc:ifscNumber , ifsc_details:true},
        {
          headers:{
            Authorization:`Bearer ${surepassToken}`,
            "Content-Type":"application/json"
          }
        }
      )
      await this.saveData(caseId, checkVerification, response, req);
      await convertToPdf(response.data.data, req.body, checkVerification);
      res.json(response.data);
    } else if (checkVerification === "UPI Verification"){
      let upiNumber = req.body.upi_id;
     
      console.log('upiNumber',upiNumber)
      let response =await axios.post(
        'https://kyc-api.surepass.io/api/v1/bank-verification/upi-verification',
        {upi_id:upiNumber},
        {
          headers:{
            Authorization:`Bearer ${surepassToken}`,
            "Content-Type":"application/json"
          }
        }
      )
      await this.saveData(caseId, checkVerification, response, req);
      await convertToPdf(response.data.data, req.body, checkVerification);
      console.log("res@@@@",response.data.data)
      res.json(response.data);
    } else if (checkVerification === "Aadhaar Validation"){
      try {
        let aadhaarNum = req.body.aadhaarValidate;

        const response = await axios.post(
          "https://kyc-api.surepass.io/api/v1/aadhaar-validation/aadhaar-validation",
          { id_number: aadhaarNum },
          {
            headers: {
              Authorization: `Bearer ${surepassToken}`,
              "Content-Type": "application/json",
            },
          }
        );
	await this.saveData(caseId, checkVerification, response, req);
        await convertToPdf(response.data.data, req.body, checkVerification);
        res.json(response.data);
      } catch (error) {
        // 16jan24
        console.error("Error during Aadhaar validation:", error.response.data.message);
        res.status(500).json({ message:error.response.data.message });
        //end
      }
    }else if (checkVerification == "Aadhaar OTP") {
      try {
        let aadhaarNum = req.body.aadhaarValidate;

        const response = await axios.post(
          "https://kyc-api.surepass.io/api/v1/aadhaar-v2/generate-otp",
          { id_number: aadhaarNum },
          {
            headers: {
              Authorization: `Bearer ${surepassToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        res.json(response.data);
      } catch (error) {
        // 16jan24
        console.error("Error during Aadhaar validation:", error.response.data.message);
        res.status(500).json({ message: error.response.data.message });
        //end
      }
    } else if (checkVerification == "Aadhaar With OTP") {
      try {
        let client_id = req.body.client_id;
        let otp = req.body.aadharotpValue

        const response = await axios.post(
          "https://kyc-api.surepass.io/api/v1/aadhaar-v2/submit-otp",
          { client_id: client_id, otp: otp },
          {
            headers: {
              Authorization: `Bearer ${surepassToken}`,
              "Content-Type": "application/json",
            },
          }
        );
	await this.saveData(caseId, checkVerification, response, req);
        await convertToPdf(response.data.data, req.body, checkVerification);

        res.json(response.data);
      } catch (error) {
        // 16jan24
        console.error("Error during Aadhaar validation:", error.response.data.message);
        res.status(500).json({ message: error.response.data.message });
        //end
      }
    }

	  else {

      res.status(400).json({ error: "Unsupported verification type" });
    }
  } catch (error) {
	    // 16jan24
	console.log(error)
    console.error("Error response from server:: ",error.message)
    res.status(500).json({message: error.response.data.message});  
   /* console.error("Error: ", error.message);
    res.status(500).json({ error: "Internal Server Error" });*/
  }
};

exports.telecomGenerateOtp = async (req, res) => {
  try {
    let checkVerification = req.body.verificationType;
    console.log("selected :", checkVerification);
    const mobile = req.body.id_number;
    console.log("mobile: ", mobile);
    const response = await axios.post(
      "https://kyc-api.surepass.io/api/v1/telecom/generate-otp",
      { id_number: mobile },
      {
        headers: {
          Authorization: `Bearer ${surepassToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    const responseData = res.json(response.data);
    console.log("responseData: ", responseData);
  } catch (error) {
    console.log("error:", error);
  }
};

exports.saveData = async(caseIdValue, verificationType, response, req)=> {
  try {
    const apiData = new IdentityExternalApiHistory({
      caseId: caseIdValue,
      checkVerification: verificationType,
      success: response.success,
      modifiedBy: req.user.user_id,
      modifiedOn: new Date(),
    });

    // Assuming `ApiModel` has a save method that returns a Promise
    const savedApiData = await apiData.save();

    console.log("API data saved successfully:", savedApiData);
    return savedApiData;
  } catch (error) {
	      console.log("error:", error.response.data.message);

   /* console.error("Error saving API data:", error);
    throw new Error(`Error saving API data: ${error.message}`);*/
  }
}

//Convert to PDF
///////////////////////new//////////////////////////////
// working fine
/*async function convertToPdf(data, val) {
  if (data) {
    let fileName = `${val.caseIdValue}_${val.verificationType}`;
    let docDefinition = {
      content: [],
    };
    function addContent(data) {
      for (const [key, value] of Object.entries(data)) {
        if (Array.isArray(value)) {
          value.forEach((item) => addContent(item));
        } else if (typeof value === "object" && value !== null) {
          docDefinition.content.push({ text: `${key}:` });
          addContent(value);
        } else {
          docDefinition.content.push(`${key}: ${value}`);
        }
      }
    }
    let resObj = addContent(data);
    let arr = docDefinition.content;
    const responseObjectArray = arr.map((item) => {
      if (typeof item === "object") {
        return item;
      } else {
        const [key, value] = item.split(": ");
        return { [key]: value };
      }
    });

    // let pdfDoc = new PDFDocument();
    let pdfFileName = `${fileName}.pdf`;
    let storageDirectory = "/cvws_new_uploads/tmp";
    let pdfFilePath = path.join(storageDirectory, pdfFileName);

    // let fileStream = fs.createWriteStream(pdfFilePath);
    // pdfDoc.pipe(fileStream);

    if (!fs.existsSync(storageDirectory)) {
      fs.mkdirSync(storageDirectory, { recursive: true });
    }
    let options = { format: "A4" };
    let html = `
      <html>
      <head></head>
      <body>
      <h3>Case ID: ${val.caseIdValue}</h3>
      <center><table rules="all" border="1px">
      <tr>
      <th>Field</th>
      <th>Value</th>
      </tr>
      `;
    //   pdfDoc.text(`CaseID: ${val.caseIdValue}`);
    console.log("responseObjectArray:", responseObjectArray);
    for (let obj of responseObjectArray) {
      if (typeof obj === "object") {
        for (let key in obj) {
          if (key === "profile_image") {
            //   pdfDoc.image(obj[key], { width: 100, height: 100 });
          } else {
            html += `
                <tr>
                <td>${key.toUpperCase()}</td>
                <td>${obj[key]}</td>
                </tr>
                `;
            //   pdfDoc(`${key}  :  ${obj[key]}`);
          }
        }
      }
    }

    html += `
    </table></center>
    </html>
    `;

    console.log(html);

    await convertHtmlToPDF(html, options, pdfFilePath);
    // pdfDoc.end();

    console.log(`PDF file "${pdfFileName}" created successfully`);
    console.log("downloading");
    return pdfFilePath;
  } else {
    console.error("API response error");
    res.status(500).send("Internal Server Error");
  }
}

function convertHtmlToPDF(html, options, filepath) {
  return new Promise((resolve, reject) => {
    pdf.create(html, options).toFile(filepath, function (err, res) {
      if (err) {
        reject(err);
      }
      resolve();
    });
  });
}*/
////////////
////////////////////////New 23Jan2024/////////////////////
async function convertToPdf(data, val, verificationType) {
  if (data) {
    let fileName = `${val.caseIdValue}_${val.verificationType}`;
    let docDefinition = {
      content: [],
    };

    /*function addContent(data) {
      for (const [key, value] of Object.entries(data)) {
        if (Array.isArray(value)) {
          value.forEach((item) => addContent(item));
        } else if (typeof value === "object" && value !== null) {
          docDefinition.content.push({ text: `${key}:` });
          addContent(value);
        } else {
          docDefinition.content.push(`${key}: ${value}`);
        }
      }
    }*/
  function addContent(data) {
      for (let [key, value] of Object.entries(data)) {
        if (Array.isArray(value)) {
		     if(value.length && typeof value[0]==='string'){
			   value=value.join("");
			   docDefinition.content.push(`${key}: ${value}`);
			 }else{
			  value.forEach((item) => addContent(item));
			 }
         
        } else if (typeof value === "object" && value !== null) {
          docDefinition.content.push({ text: `${key}:` });
          addContent(value);
        } else {
	   if (key==='gender'){
		if (value==='M'){
		   docDefinition.content.push(`${key}: MALE`);

		}	else if (value==='F'){
			docDefinition.content.push(`${key}: FEMALE`);
		}
		
	   }else {
          docDefinition.content.push(`${key}: ${value}`);
	   }
        }
      }
    }

	  let resObj = addContent(data);
    let arr = docDefinition.content;
    const responseObjectArray = arr.map((item) => {
      if (typeof item === "object") {
        return item;
      } else {
        const [key, value] = item.split(": ");
        return { [key]: value };
      }
    });

    // let pdfDoc = new PDFDocument();
    let pdfFileName = `${fileName}.pdf`;
    let storageDirectory = "/REPO_STORAGE/tmp";
    let pdfFilePath = path.join(storageDirectory, pdfFileName);

    // let fileStream = fs.createWriteStream(pdfFilePath);
    // pdfDoc.pipe(fileStream);

    if (!fs.existsSync(storageDirectory)) {
      fs.mkdirSync(storageDirectory, { recursive: true });
    }
    let options = { format: "A4",  childProcessOptions: {
    env: {
      OPENSSL_CONF: '/dev/null',
    },
  } };
    let html = `
        <!DOCTYPE html>
            <html lang="en">

            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Candidate Report</title>
                <link id="u-theme-google-font" rel="stylesheet"
                    href="https://fonts.googleapis.com/css?family=Roboto:100,100i,300,300i,400,400i,500,500i,700,700i,900,900i|Open+Sans:300,300i,400,400i,500,500i,600,600i,700,700i,800,800i">
                <style>
                    body {
                        font-family: 'Roboto', sans-serif;
                        margin: 10px;
                        padding: 20px;
                        background-color: #f4f4f4;
                    }

                    h4 {
                        text-align: center;
                        color: white;
                        margin: 0;
                        padding: 10px;
                        background-color: #ed7014;
                    }

                    table {
                        width: 100%;
                        border-collapse: collapse;
                        margin-top: 15px;
                        font-size: 10px; /* Adjusted font size */
                    }

                    th, td {
                        border: 1px solid #ddd;
                        padding: 8px; /* Reduced padding */
                        text-align: left;
                    }

                    th, .field {
                        background-color: #ed7014;
                        color: white;
                        font-weight: bold;
                    }

                    tr:nth-child(even) {
                        background-color: #f9f9f9;
                    }

                    img {
                        width: 150px; /* Reduced image size */
                        margin: 5px auto 10px; /* Reduced space above the image */
                        display: block;
                    }
                </style>
            </head>

            <body>
                <h4>${verificationType}</h4>
                <table>
                    <tr>
                    </tr>
                        <tr>
                            <th>Field</th>
                            <th>Value</th>
                        </tr>
            `;
            console.log("responseObjectArray:", responseObjectArray);
            for (let obj of responseObjectArray) {
                if (typeof obj === "object") {
                    for (let key in obj) {
                        if (key === "profile_image") {
                            continue
                        } else {
                            const value = obj[key] == "null" || !obj[key] ? "-" : obj[key]

                            html += `
                      <tr>
                      <td class="field">${key.toUpperCase()}</td>
                      <td>${value}</td>
                      </tr>
                      `;
                        }
                    }
                }
            }

            html += `
          </table></center>
	  <center>
		      
                                        <div style="margin-top:200px; margin-left:auto; margin-right:auto;;width:96%">
                                        
                                        <h4><strong>Disclaimer:-</strong></h4>
                                        
                                        <p style="font-size:small; font-family:Calibri, sans-serif;">The content of this report has been sourced from
                                        the
                                        
                                        government databases & this report has
                                        
                                        been updated as on the date of verification. The data might have been changed, deleted,
                                        
                                        modified from thereon.</p>
                                        </div>
	  </center>
	  </body>
          </html>
    `;
    console.log(html);

    await convertHtmlToPDF(html, options, pdfFilePath);
    // pdfDoc.end();

    console.log(`PDF file "${pdfFileName}" created successfully`);
    console.log("downloading");
    return pdfFilePath;
  } else {
    console.error("API response error");
    res.status(500).send("Internal Server Error");
  }
}

function convertHtmlToPDF(html, options, filepath) {
  return new Promise((resolve, reject) => {
    pdf.create(html, options).toFile(filepath, function (err, res) {
      if (err) {
        reject(err);
      }
      resolve();
    });
  });
}
////////////////////////new 23Jan2024/////////////////////

exports.download = (req, res) => {
  let file = "/REPO_STORAGE/tmp/" + req.params.data + ".pdf";
  res.download(file);
};
