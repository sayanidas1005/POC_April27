import { Component, OnInit } from '@angular/core';

import * as XLSX from 'xlsx';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public mssg = "";
  WorkSheet: any;
  ExistingSheets: any;
  update: any;
  ExistingSheetNames: any;
  conditionValueForUpdate: any;

  sendDataCondition: any;
  workSheetData:any;

  constructor(private homeservice: HomeService) { }

  ngOnInit(): void {
  }

  pushAlert(ExistingSheet: any,wsheet:any) {
    console.log(ExistingSheet)
    this.ExistingSheetNames = ExistingSheet;
    this.workSheetData=wsheet;

    this.update = true;
    
    // return this.conditionValueForUpdate;
  }

  onClickUpdate(condition: any) {
    console.log(this.ExistingSheetNames)
    console.log(condition);
    if (condition == true) {
      this.sendDataCondition = true;
    } else if (condition == false) {
      this.sendDataCondition = false;
    }

    if (this.ExistingSheetNames != null && this.sendDataCondition === true) {
      // console.log(this.sendDataCondition)
      //for condition when update is chosen as true
      this.homeservice.updateDB(this.workSheetData,true).subscribe(
        response => {
          console.log("Data Sent to DB for no sheet match");
        }
      )
    }
    else {           //sending data to be put into the DB directly
      // console.log(this.ExistingSheets)
      this.homeservice.updateDB(this.workSheetData,false).subscribe(
        response => {
          console.log("Data Sent to DB for no sheet match");
        }
      )
    }
    
  }


  onFileChange(evt: any) {
    // read the file
    const target: DataTransfer = <DataTransfer>(evt.target);

    const fileName = evt.target.files[0].name;
    const fileType = evt.target.files[0].type;

    console.log(fileName + " " + fileType);

    if (fileType !== "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" && fileType != "application/vnd.ms-excel") {
      console.log("File type not supported");
      this.mssg = "File type not supported";
    } else {
      console.log("");
      this.mssg = "";
    }

    if (target.files.length !== 1) {
      throw new Error('Cannot use multiple files');
    }

    if (this.mssg == "") {
      const reader: FileReader = new FileReader();

      reader.onload = (e: any) => {
        const bstr = e.target.result;
        // console.log(bstr);
        const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
        const wsname: any = wb.SheetNames;
        const ws: XLSX.WorkSheet = wb.Sheets;

        this.WorkSheet = ws;


        // console.log(ws);
        this.homeservice.jsonObject(this.WorkSheet).subscribe(
          data => {
            this.ExistingSheets = data;
            //for trial
            // console.log(data);

            //if need for updation is there then push data to the function else ask the user to push the entire data to DB



            if (this.ExistingSheets != null) {
              //store send data collection here
              this.pushAlert(this.ExistingSheets,this.WorkSheet);   //it's not updating the onclick function---resolve this!--------------------------

              // here goes the code for calling pushAlert for checking whether to update or delete



            }
            // if (this.ExistingSheets != null && this.sendDataCondition === true) {
            //   //for condition when update is chosen as true
            //   this.homeservice.updateDB(this.WorkSheet,true).subscribe(
            //     response => {
            //       console.log("Data Sent to DB for no sheet match");
            //     }
            //   )
            // }

            // else {           //sending data to be put into the DB directly
            //   // console.log(this.ExistingSheets)
            //   this.homeservice.updateDB(this.WorkSheet,false).subscribe(
            //     response => {
            //       console.log("Data Sent to DB for no sheet match");
            //     }
            //   )
            // }

            if(this.ExistingSheets==null) {           //sending data to be put into the DB directly
              // console.log(this.ExistingSheets)
              this.homeservice.updateDB(this.WorkSheet,false).subscribe(
                response => {
                  console.log("Data Sent to DB for no sheet match");
                }
              )
            }

          });
        // var sheet_data =XLSX.utils.sheet_to_json(wb.Sheets[wsname[0]],{header:0});

      };

      //trial for returned sheet names
      this.ExistingSheets = ["FTS_MATL", "FTS_PLATE"];
      this.pushAlert(this.ExistingSheets,this.WorkSheet);
      // console.log(this.sendDataCondition);

      reader.readAsBinaryString(target.files[0]);
    }
  }

}
