import { Injectable } from '@angular/core';
import { ComponentService } from 'src/app/administration/service/component.service';

@Injectable({
  providedIn: 'root'
})
export class CaseDetailsForDataEntryNewService {

  caseDetails:any;
  
  constructor(
    private componentService:ComponentService
  ) { }
  setCaseDetails(cd:any){
    this.setRequiredComponents(cd,this.setCd);
  }
  setCd(){
    //console.log("done");
  }
  setRequiredComponents(caseDetails:any,_callback:any){
    let reqComps = new Array();
    if(caseDetails.packageName){
      for(let packageComponent of caseDetails.packageComponents){      
        //console.log("Package component description is ",packageComponent.details);
          let requiredComponent = ({
            component:packageComponent.component,
            componentName :packageComponent.componentName,
            maxChecks : packageComponent.maxChecks,
            dataEntryInstructions:packageComponent.details
          })     
          reqComps.push(requiredComponent)
      } 
    }else if(caseDetails.profileName){
      for(let profileComponent of caseDetails.profileComponents){
        //console.log("Profile component description is ",profileComponent.details);
        let requiredComponent = ({
          component:profileComponent.component,
          componentName :profileComponent.componentName,
          maxChecks:profileComponent.maxChecks,
          dataEntryInstructions:profileComponent.details
        })
        reqComps.push(requiredComponent)
      }
    }else{
      for(let comp of caseDetails.componentsToCheck){
        //console.log("component to check isisisisisisisisisisis ",comp);
        //console.log("component description is ",comp.description);
          let requiredComponent = ({
            component:comp.component,
            componentName :comp.componentName,
            displayName:comp.currentComponentDisplayName,
            maxChecks:comp.maxChecks,
            dataEntryInstructions:comp.instructions
          })
          //console.log("required component in required components is......................",requiredComponent);
          reqComps.push(requiredComponent)
      }
    }
    caseDetails.requiredComponents = reqComps;
    this.caseDetails= caseDetails;
    _callback()
    
  }
  getCaseDetails(){
    return this.caseDetails;
  }
}
