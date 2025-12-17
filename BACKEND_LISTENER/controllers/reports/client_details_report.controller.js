const Client = require('../../models/administration/client.model')
const ClientContract = require('../../administration/client_contract.model')
const ClientAnalysisCode = require('../../administration/client_analysis_code.model')
const ExcelJS = require('exceljs');
exports writeClientDetails = (req,res)=>{
    const workBook = new  ExcelJS.Workbook()
    const sheet = workBook.addWorksheet('TL Pending')
    let ar = sheet.addRow(["Name","Relevant Contract Effective Date","Relevant Contract Expiry Date","Relevanth Agreement Date","Relevant Days-Left"])
}
