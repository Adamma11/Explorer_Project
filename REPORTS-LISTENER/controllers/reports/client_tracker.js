const XLSX = require("xlsx");
const XlsxStyle = require("xlsx-style");
const Case = require("../../models/uploads/case.model");
const PersonalDetails = require("../../models/data_entry/personal_details_data.model");
const moment = require("moment");
const ColorMaster = require("../../models/administration/color_master.model");

/* exports.getclientTracker = async (req, res) => {
   try {
        console.log("Api hit successfully", req.params);
        // const client_id = "65113caab47b9cf57fea5a2c";
        const client_id = req.params.clientId
        const result = [];
  
        const CaseDoc = await Case.find({ client: client_id }).populate('subclient');
  
        for (let i = 0; i < CaseDoc.length; i++) {
            const currCase = CaseDoc[i];
            const actualComponents = currCase.actualComponents;
            const uniqueComponents = [...new Set(actualComponents)];
  
            console.log(`Working on caseID: ${currCase.caseId}`);
            const PersonalDetailsDoc = await PersonalDetails.findOne({ case: currCase._id });
  
            let itemToPush = {
                "Application Number": currCase.caseId,
                "Employee ID": currCase.employeeId || PersonalDetailsDoc?.empid || "",
                "Employee Name": currCase.candidateName || PersonalDetailsDoc?.candidatename || "",
                "DOJ": PersonalDetailsDoc?.dateofjoining ? moment(PersonalDetailsDoc.dateofjoining).format("DD/MM/YYYY") : "",
                "DOB": PersonalDetailsDoc?.dateofbirth ? moment(PersonalDetailsDoc.dateofbirth).format("DD/MM/YYYY") : "",
                "Process": currCase.subclient?.name || "",
                "Address Check - 1": "",
                "Address Check - 2": "",
                "Address Check - 3": "",
                "Address Check - 4": "",
                "Education Check - 1": "",
                "Education Check - 2": "",
                "Education Check - 3": "",
                "Employment Check - 1": "",
                "Employment Check - 2": "",
                "Employment Check - 3": "",
                "Professional Reference - 1": "",
                "Professional Reference - 2": "",
                "Professional Reference - 3": "",
                "Criminal Check - 1": "",
                "Criminal Check - 2": "",
                "Criminal Check - 3": "",
                "Cibil Score - 1": "",
                "Cibil Score - 2": "",
                "Cibil Score - 3": "",
                "Debarment Check - SAM": "",
                "Debarment - OIG": "",
                "Debarment Check- GSA": "",
                "Final Status": "",
                "Date of Submission": "",
                "BGV Report Date (dd/mm/yyyy)": "",
                "Date Reinitiated (dd/mm/yyyy)": "",
                "Aging in days": "",
                "Within SLA": "",
                "Beyond SLA": ""
            };
  
            for (let j = 0; j < uniqueComponents.length; j++) {
                const currComp = uniqueComponents[j];
                const model = require(`../../models/data_entry/${currComp}.model`);
                const modelData = await model.find({ case: currCase._id });
  
                let fieldIndex = 1;
                for (let data of modelData) {
                    let gradeData = data?.grade;
                    const gradeColor = await ColorMaster.findOne({ _id: gradeData }, { name: 1, _id: 0 });
                    if (!gradeColor) continue;
                    
                    const fieldMap = {
                        "address": "Address Check",
                        "education": "Education Check",
                        "employment": "Employment Check",
                        "reference": "Professional Reference",
                        "criminalrecord": "Criminal Check",
                        "creditcheck": "Cibil Score"
                    };
  
                    for (let key in fieldMap) {
                        if (currComp.includes(key)) {
                            const fieldName = `${fieldMap[key]} - ${fieldIndex}`;
                            itemToPush[fieldName] = gradeColor.name;
                            fieldIndex++;
                        }
                    }
                }
            }
            result.push(itemToPush);
        }
  
        if (result.length === 0) {
            return res.status(404).json({ message: "No data found" });
        }
  
        const worksheet = XLSX.utils.json_to_sheet(result);
        const workbook = { SheetNames: ["Sheet1"], Sheets: { Sheet1: worksheet } };
        const filePath = "output.xlsx";
  
        XlsxStyle.writeFile(workbook, filePath);
        res.download(filePath, (err) => {
            if (err) {
                console.error("Error downloading the file: ", err);
                res.status(500).send("Error downloading the file");
            } else {
                console.log("File sent successfully.");
            }
        });
    } catch (error) {
        console.log("error: ", error);
        res.status(500).json("Error while fetching the client tracker");
    }
  };*/


const colorMapping = {
    "Green": "059142",
    "Red": "f80202",
    "Amber": "ff9900",
};

exports.getclientTracker = async (req, res) => {
    try {
        const client_id = req.params.clientId;
        const result = [];

        const CaseDoc = await Case.find({ client: client_id }).populate('subclient');

        for (let i = 0; i < CaseDoc.length; i++) {
            const currCase = CaseDoc[i];
            const actualComponents = currCase.actualComponents;
            const uniqueComponents = [...new Set(actualComponents)];

            console.log(`Working on caseID: ${currCase.caseId}`);
            const PersonalDetailsDoc = await PersonalDetails.findOne({ case: currCase._id });

            let itemToPush = {
                "Application Number": currCase.caseId,
                "Employee ID": currCase.employeeId || PersonalDetailsDoc?.empid || "",
                "Employee Name": currCase.candidateName || PersonalDetailsDoc?.candidatename || "",
                "DOJ": PersonalDetailsDoc?.dateofjoining ? moment(PersonalDetailsDoc.dateofjoining).format("DD/MM/YYYY") : "",
                "DOB": PersonalDetailsDoc?.dateofbirth ? moment(PersonalDetailsDoc.dateofbirth).format("DD/MM/YYYY") : "",
                "Process": currCase.subclient?.name || "",
                "Address Check - 1": "",
                "Address Check - 2": "",
                "Address Check - 3": "",
                "Address Check - 4": "",
                "Education Check - 1": "",
                "Education Check - 2": "",
                "Education Check - 3": "",
                "Employment Check - 1": "",
                "Employment Check - 2": "",
                "Employment Check - 3": "",
                "Professional Reference - 1": "",
                "Professional Reference - 2": "",
                "Professional Reference - 3": "",
                "Criminal Check - 1": "",
                "Criminal Check - 2": "",
                "Criminal Check - 3": "",
                "Cibil Score - 1": "",
                "Cibil Score - 2": "",
                "Cibil Score - 3": "",
                "Debarment Check - SAM": "",
                "Debarment - OIG": "",
                "Debarment Check- GSA": "",
                "Final Status": "",
                "Date of Submission": "",
                "BGV Report Date (dd/mm/yyyy)": "",
                "Date Reinitiated (dd/mm/yyyy)": "",
                "Aging in days": "",
                "Within SLA": "",
                "Beyond SLA": ""
            };

            for (let j = 0; j < uniqueComponents.length; j++) {
                const currComp = uniqueComponents[j];
                const model = require(`../../models/data_entry/${currComp}.model`);
                const modelData = await model.find({ case: currCase._id });

                let fieldIndex = 1;
                for (let data of modelData) {
                    let gradeData = data?.grade;
			if(gradeData){

                    var gradeColor = await ColorMaster.findOne({ _id: gradeData }, { name: 1, _id: 0 });
			}
                    if (!gradeColor) continue;

                    const fieldMap = {
                        "address": "Address Check",
                        "education": "Education Check",
                        "employment": "Employment Check",
                        "reference": "Professional Reference",
                        "criminalrecord": "Criminal Check",
                        "creditcheck": "Cibil Score"
                    };

                    for (let key in fieldMap) {
                        if (currComp.includes(key)) {
                            const fieldName = `${fieldMap[key]} - ${fieldIndex}`;
                            itemToPush[fieldName] = gradeColor.name;
                            fieldIndex++;
                        }
                    }
                }
            }
            result.push(itemToPush);
        }

        if (result.length === 0) {
            return res.status(404).json({ message: "No data found" });
        }

        // Initialize the worksheet
        const worksheet = XLSX.utils.json_to_sheet(result);

        // Apply cell styling after the worksheet is initialized
        for (let i = 0; i < result.length; i++) {
            const row = result[i];
            for (let key in row) {
                const cellValue = row[key];
                if (cellValue && colorMapping[cellValue]) {
                    const hexColor = colorMapping[cellValue];

                    // Calculate the cell address
                    const columnIndex = Object.keys(row).indexOf(key);
                    const cellAddress = XLSX.utils.encode_cell({ c: columnIndex, r: i + 1 });

                    // Ensure the cell exists in the worksheet
                    if (!worksheet[cellAddress]) worksheet[cellAddress] = {};

                    // Apply the fill color to the cell
                    worksheet[cellAddress].s = {
                        fill: {
                            patternType: "solid",
                            fgColor: { rgb: hexColor }
                        }
                    };
                }
            }
        }

        const workbook = { SheetNames: ["Sheet1"], Sheets: { Sheet1: worksheet } };
        const filePath = "output.xlsx";

        XlsxStyle.writeFile(workbook, filePath);
        res.download(filePath, (err) => {
            if (err) {
                console.error("Error downloading the file: ", err);
                res.status(500).send("Error downloading the file");
            } else {
                console.log("File sent successfully.");
            }
        });
    } catch (error) {
        console.log("error: ", error);
        res.status(500).json("Error while fetching the client tracker");
    }
};
