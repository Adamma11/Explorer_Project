import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { ComponentDataService } from './component-data.service';

@Injectable({
  providedIn: 'root'
})
export class CaseDetailsForDataEntryService {

  caseOverallStatus!: string;
  caseDataEntryStatus!: string;
  caseInputqcStatus!: string;
  caseVerificationStatus!: string;
  caseMentorReviewStatus!: string;
  caseOutputqcStatus!: string;
  currentComponentIndex!: number;
  caseDetails:any;
  currentComponent:any;
  enteredComponents!: any[];
  requiredComponents!: any[];
  constructor(
    private componentDataService:ComponentDataService
  ) { }
  getCaseDetails(){
    return this.caseDetails;
  }
  setCaseDetails(cd:any){
    this.requiredComponents =new Array();
    this.caseDetails = cd;
    if(this.caseDetails.packageName){
      for(let packageComponent of this.caseDetails.packageComponents){
        for(let i=0;i < packageComponent.maxChecks;i++){
          let requiredComponent = ({
            component:packageComponent.component,
            componentName :packageComponent.componentName,
            current:false,
            enteredComponent:null
          })
          if(this.requiredComponents==null){
            this.requiredComponents = new Array();
          }
          this.requiredComponents.push(requiredComponent)
        }
      }
    }else if(this.caseDetails.profileName){
      for(let profileComponent of this.caseDetails.profileComponents){
        for(let i=0;i < profileComponent.maxChecks;i++){
          let requiredComponent = ({
            component:profileComponent.component,
            componentName :profileComponent.componentName,
            current:false,
            enteredComponent:null
          })
          if(this.requiredComponents==null){
            this.requiredComponents = new Array();
          }
          this.requiredComponents.push(requiredComponent)
        }
      }
    }else{
      //console.log('it is  neither package nor profile and hence trying to set components to check for others');
      //console.log("components to check are ",this.caseDetails.componentsToCheck);
      for(let comp of this.caseDetails.componentsToCheck){
        for(let i=0;i < comp.maxChecks;i++){
          let requiredComponent = ({
            component:comp.component,
            componentName :comp.componentName,
            current:false,
            enteredComponent:null
          })
          if(this.requiredComponents==null){
            this.requiredComponents = new Array();
          }
          this.requiredComponents.push(requiredComponent)
        }
      }
    }
    //console.log('required components are ',this.requiredComponents);
  }
  getCurrentComponent(){
    return this.currentComponent;
  }
  setCurrentComponent(cc:any){
    return this.currentComponent = cc;
  }
  getEnteredComponents(){
    return this.enteredComponents;
  }
  setEnteredComponent(enteredComponent:any){
    let currentComponentIndex = -1;
    for(let i=0; i < this.requiredComponents.length;i++){
      let comp = this.requiredComponents[i];
      if(comp.current){
        currentComponentIndex = i;
        break;
      }      
    }
    //console.log("in service current component index is ",currentComponentIndex);
    if(currentComponentIndex != -1){
      this.requiredComponents[currentComponentIndex].enteredComponent = enteredComponent;
      //console.log("since current component index != -1 entered Component is ",this.requiredComponents[currentComponentIndex]);
    }

  }
  getNextComponentToEnter(){
    this.currentComponentIndex = -1;
    for(let i=0; i < this.requiredComponents.length;i++){
      let comp = this.requiredComponents[i];
      if(comp.current){
        this.currentComponentIndex = i;
        break;
      }
    }
    this.currentComponentIndex = this.currentComponentIndex + 1;
    //console.log("Next component being returned from case details service ",this.requiredComponents[this.currentComponentIndex]);
    this.requiredComponents.forEach(item=>{
      item.current = false;
    })
    this.requiredComponents[this.currentComponentIndex].current = true;
    return this.requiredComponents[this.currentComponentIndex];        
  }
  getPreviousComponentEntered(){
    this.currentComponentIndex = -1;
    for(let i=0; i < this.requiredComponents.length;i++){
      let comp = this.requiredComponents[i];
      if(comp.current){
        this.currentComponentIndex = i;
        break;
      }
    }
    if(this.currentComponentIndex > 0){
      this.currentComponentIndex = this.currentComponentIndex -1;
    }    
    this.requiredComponents.forEach(item=>{
      item.current = false;
    })
    this.requiredComponents[this.currentComponentIndex].current = true;
    //console.log("Previous component being returned from case details service ",this.requiredComponents[this.currentComponentIndex]);    
    return this.requiredComponents[this.currentComponentIndex];            
  }  
  getMaxComponents(){
    return this.requiredComponents.length;
  }
  getCurrentComponentIndex(){
    return this.currentComponentIndex;
  }
  getAllRequiredComponents(){
    return this.requiredComponents;
  }
  async readRequireditems(){
    let enteredComponents = new Array();
    for(let comp of this.requiredComponents){
      let response:any = await this.componentDataService.findAllForACase(comp.componentName,this.caseDetails.case_id).toPromise();
      //console.log('now the response is ',response);
      response.forEach((item:any)=>{
        let enteredComponent = ({
          componentId:item._id,
          componentName:comp.componentName,
          considered:false
        })
        enteredComponents.push(enteredComponent);
      })
    }
    //console.log('entered comps ',enteredComponents);
    for(let reqComp of this.requiredComponents){
      for(let enteredComp of enteredComponents){
        if(reqComp.componentName == enteredComp.componentName && enteredComp.considered==false){
          reqComp.enteredComponent = enteredComp.componentId;
          enteredComp.considered = true;
          break;
        }
      }
    }
    //console.log(`the  new required components `,this.requiredComponents);
  }
  getCaseOverallStatus(){
    return this.caseOverallStatus;
  }
  getCaseDataEntryStatus(){
    return this.caseDataEntryStatus;
  }
  getCaseInputqcStatus(){
    return this.caseInputqcStatus;
  }
  getCaseVerificationStatus(){
    return this.caseVerificationStatus;
  }
  getCaseMetorReviewStatus(){
    return this.caseMentorReviewStatus;
  }
  getCaseOutputqcStatus(){
    return this.caseOutputqcStatus;
  }

  setCaseOverallStatus(caseOverallStatus:any){
    this.caseOverallStatus = caseOverallStatus;
  }
  setCaseDataEntryStatus(caseDataEntryStatus:any){
    this.caseDataEntryStatus = caseDataEntryStatus;
  }
  setCaseInputqcStatus(caseInputqcStatus:any){
    this.caseInputqcStatus = caseInputqcStatus;
  }
  setCaseVerificationStatus(caseVerificationStatus:any){
    this.caseVerificationStatus = caseVerificationStatus;
  }
  setCaseMetorReviewStatus(caseMentorReviewStatus:any){
    this.caseMentorReviewStatus = caseMentorReviewStatus;
  }
  setCaseOutputqcStatus(caseOutputqcStatus:any){
    this.caseOutputqcStatus = caseOutputqcStatus;
  }  
}
