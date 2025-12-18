import { Component, Inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClientContractComponentService } from 'src/app/administration/service/client-contract-component.service';
import { ClientContractPackageService } from 'src/app/administration/service/client-contract-package.service';
import { ClientContractService } from 'src/app/administration/service/client-contract.service';
import { ComponentFieldService } from 'src/app/administration/service/component-field.service';
import { ComponentService } from 'src/app/administration/service/component.service';
import { ComponentDataService } from 'src/app/operations/service/component-data.service';
import { CaseUploadService } from 'src/app/upload/service/case-upload.service';

@Component({
  selector: 'app-addcheck-dialog',
  templateUrl: './addcheck-dialog.component.html',
  styleUrls: ['./addcheck-dialog.component.scss']
})
export class AddcheckDialogComponent {
  selectedComponentName: string = ""
  componentFields: any[] = []
  candidateDocs: string[] = [];
  displayedCandidateDocName!: string;
  candidateDocsBlob!: Blob;
  showCandidateDocsDialog: boolean = false;
  insufficiencyClearanceRejectionComments!: string;
  componentList: any[] = []
  check_id: any
  case_id: any;
  personalDetails:any;
  client_id: any;
  package_id: any;
  profile_id: any;
  componentsToCheck!: any[];
  packageComponents!: any[];
  dataFromParent: any;
  relevantContractId: any;
  addCheckForm: FormGroup;
  fileUploadForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private caseUploadService: CaseUploadService,
    private componentService: ComponentService,
    private componentFieldService: ComponentFieldService,
    private componentDataService: ComponentDataService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<AddcheckDialogComponent>,
    private clientContractService: ClientContractService,
    private clientContractComponentService: ClientContractComponentService,
    private clientContractPackageService: ClientContractPackageService,
    @Inject(MAT_DIALOG_DATA) data: any

  ) {
    this.dataFromParent = data;
    this.addCheckForm = this.fb.group({
      caseId: [''],
      candidateName: [''],
      selectedComponent: [''],
      addCheckComments: ['']
    })
    this.fileUploadForm = this.fb.group({
      candidateDocFile: [''],
      fileTitle: ['']
    })
  }

  ngOnInit() {
    this.case_id = this.dataFromParent.case_id;
    this.client_id = this.dataFromParent.client_id;
    this.personalDetails =this.dataFromParent.personalDetails
    console.log("personalDetails",this.personalDetails);
    
    this.addCheckForm.get('caseId')!.setValue(this.dataFromParent.caseId);
    this.addCheckForm.get('candidateName')!.setValue(this.dataFromParent.candidateName);
    this.getListOfComponents()
  }

  getListOfComponents() {
    this.caseUploadService.findACase(this.case_id).subscribe(
      response => { 
        if (response.package) {
          this.package_id = response.package
          this.clientContractPackageService.findOne(this.package_id).subscribe(
            response => {
              this.packageComponents = response.clientContractPackageComponents;
              this.packageComponents.forEach(item => {
                let compItem = ({
                  _id: item.component,
                  displayName: item.componentName,
                  componentName: item.componentName
                })
                this.componentList.push(compItem)
              })
            },
            error => {
              this.showError("Error finding client contract package")
            }
          )
        } else if (response.profile) {
          this.getRelevantClientContractAndReadItsComponents()
        } else {
          this.componentsToCheck = response.componenetsToCheck;
          this.getRelevantClientContractAndReadItsComponents()
        }
      },
      error => {

      }
    )
  }

  getRelevantClientContractAndReadItsComponents(){
    this.clientContractService.findAllForAClient(this.client_id).subscribe(
      response=>{
        let currentDate = new Date();
        for(let item of response){
          if(currentDate > new Date(item.effectiveDate) && currentDate < new Date(Date.parse(item.expiryDate))){
            this.relevantContractId = item._id;
            break;
          }
        }
        this.readAllComponentsForThisContract();

      },
      error=>{
        this.showError("Error reading contract details : "+error.error.message);
      }
    )
  }

  readAllComponentsForThisContract() {
    //console.log("all components for this contract read");
    this.clientContractComponentService.findAllForAClientContract(this.relevantContractId).subscribe(
      response => {
        //console.log("Hello.........response is ",response)
        for (let responseItem of response) {
          let compItem = ({
            _id: responseItem.component._id,
            componentName: responseItem.component.name,
            displayName: responseItem.component.displayName
          })
          this.componentList.push(compItem);
        }
      }
    )
  }

  readCandidateDocs(){
    //console.log("about to read files");
    this.componentDataService.readFileNames(this.dataFromParent.componentName,this.dataFromParent.caseId,this.dataFromParent._id).subscribe(
      response=>{
        //console.log('response from read candidate docs ',response);
        this.candidateDocs = response;
      },
      error=>{
        this.showError(error.error.message);

      }
    )

  }

  closeCandidateDocsDialog(){
    this.showCandidateDocsDialog = false
  }

  addCheckButtonClicked(){
    if(this.package_id != null){
      let numberOfChecksForTheComponent = 0;
      this.componentDataService.findAllForACase(this.selectedComponentName,this.case_id).subscribe(
        response=>{
          numberOfChecksForTheComponent = response.length;
        },
        error=>{
          numberOfChecksForTheComponent = 0;
        }
      )
      if(numberOfChecksForTheComponent >= this.packageComponents.length){
        this.showError("Number of checks exceeds maximum allowed for the package")
      }else{
        this.doCheckAddition()
      }
    }else{
      this.doCheckAddition()
    }

  }
  doCheckAddition(){
    let dataToAdd = this.addCheckForm.getRawValue()
    dataToAdd.status = "DE-COMPLETED"
    dataToAdd.case_id = this.case_id
    dataToAdd.case = this.case_id
    dataToAdd.personalDetails = this.personalDetails
    this.componentDataService.create(this.selectedComponentName,dataToAdd).subscribe(
      response=>{
        dataToAdd.status = "UPDATE-LHS"
        const addcheckdate = new Date()
        console.log(addcheckdate)
        dataToAdd._id = response._id
        // dataToAdd.insufficiencyComments = this.addCheckForm.get('addCheckComments')!.value
                dataToAdd.updateLhsComments = this.addCheckForm.get('addCheckComments')!.value
        this.componentDataService.updateVerificationStatus(this.selectedComponentName,dataToAdd).subscribe(
          response=>{
            this.check_id = response._id
            this.showMessage("Check Added")
          },
          error=>{
            this.showError("Error updating status")
          }
        )
      },
      error=>{
        this.showError("Error adding Check")
      }
    )

  }
  getFieldValues(checkToAdd:any){
      let promise = new Promise((resolve,reject)=>{
        let allFieldValues= {

        }
        this.componentService.findAComponent(checkToAdd.component).subscribe(
          response=>{
            response.componentFields.forEach((componentField: { lhsRhs: string; mandatory: string; name: any; })=>{
              if(componentField.lhsRhs == 'BOTH' || componentField.lhsRhs == 'LHS'){
                if(componentField.mandatory =='MANDATORY'){
                  let fieldValue:any = {}
                  const key = componentField.name
                  fieldValue[key] = "FILL-VALUE"
                  Object.assign(allFieldValues,fieldValue)
                }
              }
            })
          }
        )
        //console.log("resolved........data being sent is ",allFieldValues)
        resolve(allFieldValues)
      })
    return promise
  }
  getComponentName(component:any){
    let promise = new Promise((resolve,reject)=>{
      this.componentList.forEach(item=>{
        if(item._id.toString() == component.toString()){
          resolve(item.componentName)
        }
      })
    })
    return promise;
  }
  getValues(name: any){
    for(let field of this.componentFields){
      if(field.name == name){
        let values = field.values.split(',');
        return values;
      }
    }
    return null;
  }
  getComponentDisplayName(component: any){
    let promise = new Promise((resolve,reject)=>{
      this.componentList.forEach(item=>{
        if(item._id.toString() == component.toString()){
          resolve(item.displayName)
        }
      })
    })
    return promise
  }
  getMaxCheckForPackageComponent(){
    for(let i=0; i < this.packageComponents.length;i++){
      return this.packageComponents[i].maxChecks
    }
  }
  cancelButtonClicked(){
    this.dialogRef.close()
  }
  // uploadFile(){
  //   if(this.check_id == null){
  //     this.showError("Please add the check first")
  //   }else{
  //     let componentData = ({
  //       caseId:this.addCheckForm.get('caseId')!.value,
  //       case:this.case_id,
  //       _id:this.check_id,
  //       fileName:this.fileUploadForm.get('fileTitle')!.value
  //     })
  //     this.componentDataService.uploadFile(this.selectedComponentName,componentData,this.fileUploadForm.get('candidateDocFile')!.value.files[0]).subscribe(
  //       response=>{
  //         this.showMessage("File Uploaded")
  //         this.readCandidateDocs()
  //       },
  //       error=>{
  //         this.showError("Error  uploading the file")
  //       }
  //     )
  //   }

  // }

  //added code nov-20//
uploadFile() {
  if (this.check_id == null) {
    this.showError("Please add the check first");
  } else {
    const files: FileList = this.fileUploadForm.get('candidateDocFile')!.value.files;
    
    if (!files || files.length === 0) {
      this.showError("Please select at least one file");
      return;
    }

    // Convert FileList to array for easier handling
    const fileArray = Array.from(files);
    
    // Upload each file with its own name as title (without extension)
    const uploadPromises = fileArray.map(file => {
      // Remove file extension for the title
      const fileNameWithoutExtension = file.name.replace(/\.[^/.]+$/, "");
      
      let componentData = {
        caseId: this.addCheckForm.get('caseId')!.value,
        case: this.case_id,
        _id: this.check_id,
        fileName: fileNameWithoutExtension // Use file name without extension as title
      };

      return this.componentDataService.uploadFile(
        this.selectedComponentName,
        componentData,
        file
      ).toPromise();
    });

    // Handle all uploads
    Promise.all(uploadPromises)
      .then(responses => {
        this.showMessage(`Successfully uploaded ${responses.length} file(s)`);
        this.readCandidateDocs();
        this.clearFileInput();
      })
      .catch(error => {
        this.showError("Error uploading one or more files");
        console.error('Upload error:', error);
      });
  }
}

// Method to clear file input
clearFileInput() {
  this.fileUploadForm.patchValue({
    candidateDocFile: '',
    fileTitle: '' // Clear title as well
  });
}

// Handle file selection changes - auto-fill title based on file names
onFileSelected(event: any) {
  const files: FileList = event.target.files;
  if (files && files.length > 0) {
    // Auto-fill file title based on selected files
    this.autoFillFileTitle(files);
    
    // Validate files
    this.validateFiles(files);
  }
}

// Auto-fill file title based on selected files
autoFillFileTitle(files: FileList) {
  const fileArray = Array.from(files);
  
  if (fileArray.length === 1) {
    // For single file: use file name without extension
    const fileName = fileArray[0].name;
    const fileNameWithoutExtension = fileName.replace(/\.[^/.]+$/, "");
    this.fileUploadForm.patchValue({
      fileTitle: fileNameWithoutExtension
    });
  } else {
    // For multiple files: combine all file names without extensions
    const fileNamesWithoutExtensions = fileArray.map(file => 
      file.name.replace(/\.[^/.]+$/, "")
    );
    
    // Join with comma and space, limit to reasonable length
    const combinedTitles = fileNamesWithoutExtensions.join(', ');
    
    // If too long, truncate and add ellipsis
    if (combinedTitles.length > 100) {
      const truncatedTitles = combinedTitles.substring(0, 97) + '...';
      this.fileUploadForm.patchValue({
        fileTitle: truncatedTitles
      });
    } else {
      this.fileUploadForm.patchValue({
        fileTitle: combinedTitles
      });
    }
  }
}

// Validate files before upload
validateFiles(files: FileList): boolean {
  const fileArray = Array.from(files);
  const maxSize = 10 * 1024 * 1024; // 10MB max file size
  const allowedTypes = ['application/pdf'];
  
  for (const file of fileArray) {
    if (file.size > maxSize) {
      this.showError(`File ${file.name} is too large. Maximum size is 10MB.`);
      return false;
    }
    
    if (!allowedTypes.includes(file.type)) {
      this.showError(`File ${file.name} is not a PDF. Only PDF files are allowed.`);
      return false;
    }
  }
  
  return true;
}

// Helper method to display selected file names
getSelectedFileNames(): string {
  const files: FileList = this.fileUploadForm.get('candidateDocFile')!.value?.files;
  if (!files || files.length === 0) {
    return 'No files selected';
  }
  
  const fileNames = Array.from(files).map(file => file.name);
  
  if (fileNames.length === 1) {
    return fileNames[0];
  } else {
    return `${fileNames.length} files selected`;
  }
}
  //ended//
  
  downloadCandidateDoc(file: string){
    this.displayedCandidateDocName = file;
    let componentDetails = {
      caseId : this.addCheckForm.get('caseId')!.value,
      id : this.check_id
    }
    this.componentDataService.downloadFile(this.selectedComponentName,componentDetails,file).subscribe(
      (response:HttpResponse<Blob | null>)=>{
        if (response.body !== null) {
          this.candidateDocsBlob = response.body;
          this.showCandidateDocsDialog = true;
        } else {
          this.showError("Response body is null");
        }
      },
      error=>{
        this.showError(error.error.message);
      }
    )

  }
  componentSelectionChanged(event: any){
    this.componentFields = []
    this.selectedComponentName = this.getSelectedComponentName();
    this.componentFieldService.findAllFieldsForAComponent(this.addCheckForm.get('selectedComponent')!.value).subscribe(
      response=>{
        response.forEach(item=>{
             if(item.lhsRhs == 'BOTH' || item.lhsRhs =='LHS'){
               this.componentFields.push(item)
             }
        })
        this.addFormFields();
//        this.getLhsAndRhsDetails();
      },
      error=>{
        //console.log(error);
      }
    )
  }
  getSelectedComponentName(){
    for(let i=0; i < this.componentList.length;i++){
      let component = this.componentList[i]
      //console.log("Selected component is ",this.addCheckForm.get('selectedComponent').value);
      //console.log("Component being checked is ",this.componentList[i]);
      if(component._id.toString() == this.addCheckForm.get('selectedComponent')!.value){
        return component.componentName
      }
    }
  }
  addFormFields(){
    this.componentFields.forEach(item=>{
      if(item.lhsRhs=='LHS' || item.lhsRhs=='BOTH'){
        this.addCheckForm.addControl(item.name,new FormControl(''));
      }
    })
  }

  showMessage(msg: string) {
    this.snackBar.open(msg, "Info", { duration: 4000, horizontalPosition: 'end', verticalPosition: 'top' })
  }
  showError(msg: string) {
    this.snackBar.open(msg, "Error", { duration: 4000, horizontalPosition: 'end', verticalPosition: 'top' })
  }
}
