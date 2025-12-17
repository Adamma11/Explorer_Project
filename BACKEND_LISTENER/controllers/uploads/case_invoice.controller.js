const Case = require('../../models/uploads/case.model')
const ExcelJS = require('exceljs');
exports.updateInvoiceAmounts = (req,res)=>{
    const workBook = new  ExcelJS.Workbook()
    console.log("Workbook constructed")
    const sheet = workBook.addWorksheet('Invoice Update Status')

    sheet.addRow(["Case Id","Invoice Number","Invoice Date","Invoice Amount","Status"])
    console.log("invoiceDetails is ",req.body.invoiceDetails)
    let updateCases = function(item){
        return new Promise((resolve,reject)=>{
            console.log("item is ",item)
            Case
            .findOneAndUpdate({caseId:item.caseId},{invoiceNumber:item.invoiceNumber,invoiceDate:item.invoiceDate,invoiceAmount:item.invoiceAmount})
            .then(data=>{
               console.log("Data is ",data)
               if(data == null){
                  sheet.addRow([item.caseId,item.invoiceNumber,item.invoiceDate,item.invoiceAmount,"Case Not Found"])
                  resolve(true)
               }else{
                  sheet.addRow([data.caseId,data.invoiceNumber,data.invoiceDate,data.invoiceAmount,"Updated"])
                  resolve(true)
               }
            })
            .catch(err=>{
               console.log("Error is ",err)
               sheet.addRow([item.caseId,item.invoiceNumbere,item.invoiceDate,item.invoiceAmount,"Error in data"])
               resolve(false)
            })
        })
    }
   start()
   async function start(){
      let invoiceDetails = req.body.invoiceDetails
      for(let i=0; i < invoiceDetails.length;i++){
         let item = invoiceDetails[i]
         let a = await updateCases(item)
      }
      res.setHeader(
          "Content-Type",
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      )
      res.setHeader(
          "Content-Disposition",
          "attachment; filename=" + "tl_tracker.xlsx"
      )
      console.log("About to return WorkBook")
      return workBook.xlsx.write(res)
      .then(function(){
       res.status(200).end()
      })
   }

}

