/*const fs = require('fs');
const path = require('path');
const Case = require('../../models/uploads/case.model');
const caseHistory = require('../data_entry/case_history.controller');
// Path to all component models
const dataentryModelsPath = path.join(__dirname, '../../models/data_entry');

// Dynamically load all models
const modelMap = {};
fs.readdirSync(dataentryModelsPath).forEach(file => {
  if (file.endsWith('.js')) {
    const modelName = path.basename(file, '.js')
      .replace('.model', '')
      .toLowerCase();
    const model = require(path.join(dataentryModelsPath, file));
    modelMap[modelName] = model;
  }
});

// Controller function
exports.updateInceptionQcStatus = async (req, res) => {
  try {

    // static user id
    const userId = "65549cb03895931b3ac23a39";

    // Step 1: fetch all cases where status = DE-COMPLETED
    const allCases = await Case.find({ status: "DE-COMPLETED" });

    if (!allCases.length)
      return res.status(404).json({ message: "No cases found with status DE-COMPLETED" });

    let updatedCount = 0;

    // Step 2: loop each case
    for (const caseItem of allCases) {

      const caseId = caseItem._id.toString();
      const components = caseItem.componentsToCheck || [];

      for (const comp of components) {

        const componentName = comp.componentName;      // original string
        const lookupName = componentName.toLowerCase(); // for model lookup
        const componentModel = modelMap[lookupName];

        if (!componentModel) {
          console.warn(`⚠️ No model found for component type: ${lookupName}`);
          continue;
        }

        // find all component documents for this case
        const docs = await componentModel.find({ case: caseId });

        for (const doc of docs) {
          // update component doc
          await componentModel.updateOne(
            { _id: doc._id },
            { $set: { status: "INPUTQC-ACCEPTED", modifiedOn: new Date() } }
          );

          // insert caseHistory
          await caseHistory.create(
            caseId,
            //doc._id,   // <-- componentName is now the document _id
            doc._id,   // componentId (same as above)
            'Updating Input QC Status',
            'INPUTQC-ACCEPTED',
            'Input QC Status Updated',
            null,
            null,
            null,
            userId
          );
        }

      }

      // update case status also
      await Case.updateOne(
        { _id: caseId },
        { $set: { status: "INPUTQC-ACCEPTED", modifiedOn: new Date() } }
      );

      updatedCount++;
    }

    return res.json({
      message: "All DE-COMPLETED cases updated successfully",
      totalCasesUpdated: updatedCount
    });

  } catch (error) {
    console.error("Error updating Inception QC:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};*/

/*const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const Case = require('../../models/uploads/case.model');
const caseHistory = require('../data_entry/case_history.controller');

// Path to all component models
const dataentryModelsPath = path.join(__dirname, '../../models/data_entry');

// Dynamically load all models
const modelMap = {};
fs.readdirSync(dataentryModelsPath).forEach(file => {
  if (file.endsWith('.js')) {
    const modelName = path.basename(file, '.js')
      .replace('.model', '')
      .toLowerCase();
    const model = require(path.join(dataentryModelsPath, file));
    modelMap[modelName] = model;
  }
});

exports.updateInceptionQcStatus = async (req, res) => {
  try {
    const userId = "65549cb03895931b3ac23a39"; // static user id

    // Step 1: fetch all cases where status = DE-COMPLETED
    const allCases = await Case.find({ status: "DE-COMPLETED" });

    if (!allCases.length)
      return res.status(404).json({ message: "No cases found with status DE-COMPLETED" });

    let updatedCount = 0;

    console.log(`🔍 Found ${allCases.length} DE-COMPLETED cases to process`);

    // Step 2: loop each case
    for (const caseItem of allCases) {
      const caseId = caseItem._id;
      const components = caseItem.componentsToCheck || [];

      console.log(`\n🧾 Processing case ${caseId} with ${components.length} components...`);

      // Loop each component in parallel for performance
      await Promise.all(components.map(async comp => {
        const componentName = comp.componentName;
        const lookupName = componentName.toLowerCase();
        const componentModel = modelMap[lookupName];

        if (!componentModel) {
          console.warn(`⚠️ No model found for component type: ${lookupName}`);
          return;
        }

        // Find all component documents for this case
        const docs = await componentModel.find({ case: caseId });

        if (!docs.length) {
          console.log(`ℹ️ No documents found in ${lookupName} for case ${caseId}`);
          return;
        }

        await Promise.all(docs.map(async doc => {
          try {
            // Update component document
            await componentModel.updateOne(
              { _id: doc._id },
              { $set: { status: "INPUTQC-ACCEPTED", modifiedOn: new Date() } }
            );

            // Insert case history
            await caseHistory.create(
              caseId.toString(),
              doc._id,
              'Updating Input QC Status',
              'INPUTQC-ACCEPTED',
              'Input QC Status Updated',
              null,
              null,
              null,
              userId
            );

            console.log(`✅ Updated ${lookupName} doc ${doc._id} to INPUTQC-ACCEPTED`);
          } catch (err) {
            console.error(`❌ Failed updating ${lookupName} doc ${doc._id}:`, err.message);
          }
        }));
      }));

      // Step 3: update the case status itself
      const result = await Case.updateOne(
        { _id: new mongoose.Types.ObjectId(caseId) },
        { $set: { status: "INPUTQC-ACCEPTED", modifiedOn: new Date() } }
      );

      if (result.modifiedCount > 0) {
        updatedCount++;
        console.log(`🎉 Case ${caseId} status updated to INPUTQC-ACCEPTED`);
      } else {
        console.warn(`⚠️ Case ${caseId} not updated (maybe already updated or not found)`);
      }
    }

    return res.json({
      message: "All DE-COMPLETED cases updated successfully",
      totalCasesUpdated: updatedCount
    });

  } catch (error) {
    console.error("💥 Error updating Inception QC:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
*/
/*const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const moment = require('moment');
const Case = require('../../models/uploads/case.model');
const CaseHistory = require('../../models/data_entry/case_history.model');

// Path to all component models
const dataentryModelsPath = path.join(__dirname, '../../models/data_entry');

// Dynamically load all models
const modelMap = {};
fs.readdirSync(dataentryModelsPath).forEach(file => {
  if (file.endsWith('.js')) {
    const modelName = path.basename(file, '.js')
      .replace('.model', '')
      .toLowerCase();
    const model = require(path.join(dataentryModelsPath, file));
    modelMap[modelName] = model;
  }
});

exports.updateInceptionQcStatus = async (req, res) => {
  try {
    const userId = "65549cb03895931b3ac23a39"; // static user id

    // Step 1: fetch all cases where status = DE-COMPLETED
    const allCases = await Case.find({ status: "DE-COMPLETED" });

    if (!allCases.length)
      return res.status(404).json({ message: "No cases found with status DE-COMPLETED" });

    let updatedCount = 0;
    console.log(`🔍 Found ${allCases.length} DE-COMPLETED cases`);

    // Step 2: loop each case
    for (const caseItem of allCases) {
      const caseId = caseItem._id;
      const components = caseItem.componentsToCheck || [];

      console.log(`\n🧾 Processing case ${caseId} with ${components.length} components...`);

      // Process components in parallel for each case
      await Promise.all(components.map(async comp => {
        const lookupName = comp.componentName.toLowerCase();
        const componentModel = modelMap[lookupName];

        if (!componentModel) {
          console.warn(`⚠️ No model found for component type: ${lookupName}`);
          return;
        }

        // Find all documents in that component model for this case
        const docs = await componentModel.find({ case: caseId });

        await Promise.all(docs.map(async doc => {
          try {
            // ✅ Update the component document
            await componentModel.updateOne(
              { _id: doc._id },
              { $set: { status: "INPUTQC-ACCEPTED", modifiedOn: new Date() } }
            );

            // ✅ Create case history entry
            const caseHistoryEntry = new CaseHistory({
              case: caseId,                                 // The case ID
              component: comp.component,                    // <-- from componentsToCheck.component
              check: doc._id,                               // <-- the component document _id
              operation: 'INPUTQC-ACCEPTED',
              status: 'Input QC Status Updated',
              remarks: null,
              nextfollowupdate: null,
              allocatedToVendor: null,
              allocatedToFe: null,
              allocatedToVerifier: userId,                  // your static user ID
              user: userId,
              date: moment(Date.now()).add(5, 'hours').add(30, 'minutes')
            });

            await caseHistoryEntry.save();

            console.log(`✅ Updated ${lookupName} doc ${doc._id} & logged CaseHistory`);
          } catch (err) {
            console.error(`❌ Error updating ${lookupName} doc ${doc._id}:`, err.message);
          }
        }));
      }));

      // Step 3: update the case status itself
      const result = await Case.updateOne(
        { _id: new mongoose.Types.ObjectId(caseId) },
        { $set: { status: "INPUTQC-ACCEPTED", modifiedOn: new Date() } }
      );

      if (result.modifiedCount > 0) {
        updatedCount++;
        console.log(`🎉 Case ${caseId} status updated to INPUTQC-ACCEPTED`);
      } else {
        console.warn(`⚠️ Case ${caseId} not updated (maybe already updated or not found)`);
      }
    }

    return res.json({
      message: "All DE-COMPLETED cases updated successfully",
      totalCasesUpdated: updatedCount
    });

  } catch (error) {
    console.error("💥 Error updating Inception QC:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
*/

const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const moment = require('moment');
const Case = require('../../models/uploads/case.model');
const CaseHistory = require('../../models/data_entry/case_history.model');

// Path to all component models
const dataentryModelsPath = path.join(__dirname, '../../models/data_entry');

// Dynamically load all models
const modelMap = {};
fs.readdirSync(dataentryModelsPath).forEach(file => {
  if (file.endsWith('.js')) {
    const modelName = path.basename(file, '.js')
      .replace('.model', '')
      .toLowerCase();
    const model = require(path.join(dataentryModelsPath, file));
    modelMap[modelName] = model;
  }
});

exports.updateInceptionQcStatus = async (req, res) => {
  try {
    const userId = "65549cb03895931b3ac23a39"; // static user id (Ebrahim)

    // Step 1: Fetch all DE-COMPLETED cases
    const allCases = await Case.find({ status: "DE-COMPLETED" });

    if (!allCases.length)
      return res.status(404).json({ message: "No cases found with status DE-COMPLETED" });

    let updatedCount = 0;
    console.log(`🔍 Found ${allCases.length} DE-COMPLETED cases`);

    // Step 2: Process each case
    for (const caseItem of allCases) {
      const caseId = caseItem._id;
      const components = caseItem.componentsToCheck || [];

      console.log(`\n🧾 Processing case ${caseId} with ${components.length} components...`);

      // Record the same completion date for consistency
      const completionDate = new Date();

      // Step 3: Loop through components
      await Promise.all(components.map(async comp => {
        const lookupName = comp.componentName.toLowerCase();
        const componentModel = modelMap[lookupName];

        if (!componentModel) {
          console.warn(`⚠️ No model found for component type: ${lookupName}`);
          return;
        }

        // Find all component docs related to this case
        const docs = await componentModel.find({ case: caseId });

        await Promise.all(docs.map(async doc => {
          try {
            // ✅ Update each component document
            await componentModel.updateOne(
              { _id: doc._id },
              {
                $set: {
                  status: "INPUTQC-ACCEPTED",
                  inputqcCompletionDate: completionDate,
                  modifiedOn: new Date()
                }
              }
            );

            // ✅ Create CaseHistory entry
            const caseHistoryEntry = new CaseHistory({
              case: caseId,
              component: comp.component,       // from componentsToCheck
              check: doc._id,                  // actual record _id
              operation: 'INPUTQC-ACCEPTED',
              status: 'Input QC Status Updated',
              remarks: null,
              nextfollowupdate: null,
              allocatedToVendor: null,
              allocatedToFe: null,
              allocatedToVerifier: userId,
              user: userId,
              date: moment(completionDate).add(5, 'hours').add(30, 'minutes')
            });

            await caseHistoryEntry.save();

            console.log(`✅ Updated ${lookupName} doc ${doc._id} & logged CaseHistory`);
          } catch (err) {
            console.error(`❌ Error updating ${lookupName} doc ${doc._id}:`, err.message);
          }
        }));
      }));

      // Step 4: Update case status & completion date
      const result = await Case.updateOne(
        { _id: new mongoose.Types.ObjectId(caseId) },
        {
          $set: {
            status: "INPUTQC-ACCEPTED",
            inputqcCompletionDate: completionDate,
            modifiedOn: new Date()
          }
        }
      );

      if (result.modifiedCount > 0) {
        updatedCount++;
        console.log(`🎉 Case ${caseId} updated with INPUTQC-ACCEPTED and completion date`);
      } else {
        console.warn(`⚠️ Case ${caseId} not updated (maybe already updated or not found)`);
      }
    }

    return res.json({
      message: "All DE-COMPLETED cases updated successfully",
      totalCasesUpdated: updatedCount
    });

  } catch (error) {
    console.error("💥 Error updating Inception QC:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


