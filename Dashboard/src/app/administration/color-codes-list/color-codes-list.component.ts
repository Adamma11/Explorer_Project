import { Component,OnInit,AfterViewInit,ViewChild } from '@angular/core';
import {Location} from "@angular/common";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort,Sort} from "@angular/material/sort";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {MatPaginator} from "@angular/material/paginator";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ColorMasterService} from "../service/color-master.service";
import {ColorMasterData} from "../model/color-master";

@Component({
  selector: 'app-color-codes-list',
  templateUrl: './color-codes-list.component.html',
  styleUrls: ['./color-codes-list.component.scss']
})
export class ColorCodesListComponent {
  colorDataSource = new MatTableDataSource<ColorMasterData>();
  colorDisplayedColumns: string[] =['serialNumber','colorCode','name','delete'];
  hoveredRow: number | null = null;

  @ViewChild(MatPaginator) paginator!:MatPaginator;
  @ViewChild(MatSort) sort!:MatSort;
  constructor(private colorMasterService:ColorMasterService,private location:Location,private snackBar:MatSnackBar,private _liveAnnouncer:LiveAnnouncer){}
  ngAfterViewInit(): void {
    this.colorDataSource.paginator=this.paginator;
    this.colorDataSource.sort = this.sort;
  }
  ngOnInit(): void {
   this.readAllDataFromColorMaster()
  }

  readAllDataFromColorMaster():void{
    this.colorMasterService.readAll().subscribe({
      next: (response:ColorMasterData[]) => {
        this.colorDataSource.data= response.map((element, index) => ({ ...element, serialNumber: index + 1 }));        
      },
      error: (error) => {
        this.showError("Error Reading Color Master");
      }
    })  
  }
  
  deleteColorCode(element:ColorMasterData){
        this.colorDataSource.data.splice(this.colorDataSource.data.indexOf(element),1);
        this.colorDataSource._updateChangeSubscription();
        this.showMessage("Click submit button to save changes");
  }

  addColorStatus(){
    let clrCd = ({
      colorCode:"#000",
      name:'' ,
      serialNumber:this.colorDataSource.data.length+1    
    })
    this.colorDataSource.data.push(clrCd);    
    this.colorDataSource._updateChangeSubscription();        
    this.showMessage("Fill color details & click submit button to save changes");
  }
  onColorChange(event: Event, element: any) {
    const color = (event as any).color;    
    if (color) {      
     return element.colorCode = color.hex;
    }
  }
isHovered(index: number): boolean {
  return this.hoveredRow === index;
}

highlightRow(index: number): void {
  this.hoveredRow = index;
}

unhighlightRow(index: number): void {
  this.hoveredRow = null;
}

saveButtonClicked(){
  let colorMasterData =({
    colorMasters:this.colorDataSource.data.map(element =>{
      return {...element,colorCode:(element.colorCode as any).hex ? "#"+(element.colorCode as any).hex :element.colorCode } 
    })
  })
  this.colorMasterService.update(colorMasterData).subscribe({
    next:(response) => {
      this.showMessage("Color Codes Saved")
      this.location.back();
    },
    error:(error) => {
      this.showError("Error in saving Color Master");
    }
  })
}

  announceSortChange(sortState:Sort){
    if(sortState.direction){
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    }else{
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
  showMessage(msg:string):void{
    this.snackBar.open(msg,'Info',{duration:4000,horizontalPosition:'end',verticalPosition:'top'});
  }
  showError(msg:string):void{
    this.snackBar.open(msg,'Error',{duration:4000,horizontalPosition:'end',verticalPosition:'top'});
  }
}
