const Component = require('../../models/administration/component.model')
const ClientContract = require('../../models/administration/client_contract.model')
const ClientContractComponents = require('../../models/administration/client_contract_component.model')
const caseModel = require('../../models/uploads/case.model')
const component_fieldModel = require('../../models/administration/component_field.model')

exports.findComponents = async(req,res)=>{
    // console.log("data");
    try{
        const compDoc = await Component.find();
        console.log("Data print",compDoc)
        res.status(200).json(compDoc);
    }catch(err){
        res.status(400).json({message:"some error occured",err});
    }
}

exports.getCLientContractComponents = async (req, res) => {
    try {
        const client_id  = req.params.client_id
        const clientContractDoc = await ClientContract.findOne({client:client_id})
        const clientContractComponentDoc = await ClientContractComponents.find({clientContract: clientContractDoc._id}).populate('component')

        let result = []

        for (let i = 0; i < clientContractComponentDoc.length; i++) {
            const currData = clientContractComponentDoc[i];
            result.push(currData.component?.displayName)
        }

        res.status(200).json(result)
    } catch (error) {
        console.log("error: ", error);
        res.status(500).json("Error while getting the client contract componentsdetails");

    }
}
////////////
exports.getCLientCases = async (req, res) => {
    try {
        const client_id  = req.params.client_id
        const page = parseInt(req.query.page) || 1; 
        const limit = parseInt(req.query.limit) || 50; 
        const skip = (page - 1) * limit;
        const totalCount = await caseModel.countDocuments({client: client_id});
        const cases = await caseModel.find({client: client_id}).populate({path: 'client'});
        // const cases = await caseModel.find({client: client_id}).populate({path: 'client'}).skip(skip).limit(limit);
        // const cases = await caseModel.find({_id: '63c642283f421c5c76c1a63e'}).populate({path: 'client'}).skip(skip).limit(limit);
        // console.log('caseData ======= ', cases[0]?.client?.colorCodes);
        console.log('dat == ', cases.length);
            
        let colorCodes = []
        let caseData=[]
        if (cases.length > 0) {
            for(let acase of cases){
                colorCodes = acase?.client?.colorCodes
                let modelName = [...new Set(acase.actualComponents)]
                for(let model of modelName){
                    const compModel = require(`../../models/data_entry/${model}.model`)
                    const compStatus = await compModel.find({case:acase._id}).populate({path:'component', select: 'displayName name'}).lean()
                    // console.log('caseData ======= ',compStatus)
                    // console.log('caseData ======= ',model, acase._id, compStatus[0].component)
                    if (compStatus.length > 0) {
                        const compFirstField = compStatus[0]?.component ? await component_fieldModel.findOne({component: compStatus[0]?.component?._id}) : {}
                        let compFirstFieldValue = compFirstField ? compFirstField?.name : ''
                        for(let compData of compStatus){
                            let grade = compData?.grade1 ? String(compData?.grade1) : compData?.grade;
                            // console.log('grade ======= ',grade)
                            let gradeStatus = colorCodes.find(colorCode => colorCode.color === grade)
                            // console.log('colorStatus ======= ',gradeStatus)
                            let compValue = compFirstFieldValue ? compData[compFirstFieldValue] : ''
                            // status:compData.status, grade1: compData.grade1,grade: compData.grade
                            caseData.push({case_id: acase._id, caseId: acase.caseId, clientName: acase.client.name, compFirstField: compValue, gradeStatus: gradeStatus?.status,  ...compData})
                        }
                        
                    }
                }
            }
           
            res.status(200).json({totalCount, caseData})   
        }
    } catch (error) {
        console.log("error: ", error);
        res.status(500).json("Error while getting the client contract componentsdetails");
    }
}
/////////////
/*exports.getCLientCases = async (req, res) => {
    try {
        const client_id  = req.params.client_id
        const cases = await caseModel.find({client: client_id}).populate({path: 'client'});
        let caseData=[]
        for(let acase of cases){
            let modelName = [...new Set(acase.actualComponents)]
            for(let model of modelName){
                const compModel = require(`../../models/data_entry/${model}.model`)
                const compStatus = await compModel.find({case:acase._id}).populate({path:'component', select: 'displayName'}).lean()
                const compFirstField = await component_fieldModel.findOne({component: compStatus[0]?.component?._id})
                let compFirstFieldValue = compFirstField?.name
                for(let compData of compStatus){
                    let compValue = compData[compFirstFieldValue]
                    // status:compData.status, grade1: compData.grade1,grade: compData.grade
                    caseData.push({case_id: acase._id, caseId: acase.caseId, clientName: acase.client.name, compFirstField: compValue, ...compData})
                }
            }
        }
        res.status(200).json(caseData)
    } catch (error) {
        console.log("error: ", error);
        res.status(500).json("Error while getting the client contract componentsdetails");
    }
}*/
