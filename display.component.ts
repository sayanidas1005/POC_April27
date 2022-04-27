import { Component, OnInit } from '@angular/core';
import { DisplayService } from './display.service';
import { AgGridModule } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';
import { ButtonRendererComponent } from './button-renderer.component';

@Component({
	selector: 'app-display',
	templateUrl: './display.component.html',
	styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {

	dataObject: any;
	sheetNames: any;
	dataSheets: any;
	selectedSheet: string = '';
	selectedSheetStore: string = '';
	dataForTable: any;

	//edit parameters
	sheetEdited:any;
	userId:any;
	recordData:any;

	frameworkComponents: any;
	api: any;


	constructor(private displayservice: DisplayService) {
		this.frameworkComponents = {
			buttonRenderer: ButtonRendererComponent,
		}
	}

	userArray = [
		{
			uid: '10',
			age: 22,
			username: 'John Paul',
			Year_of_Birth: 2000
		},
		{
			uid: '11',
			age: 35,
			username: 'Peter Jackson',
			Year_of_Birth: 1987
		},
		{
			uid: '12',
			age: 30,
			username: 'Will Smith',
			Year_of_Birth: 1992
		},
		{
			uid: '13',
			age: 25,
			username: 'Peter Paul',
			Year_of_Birth: 1997
		},
		{
			uid: '14',
			age: 34,
			username: 'Johnson Peter',
			Year_of_Birth: 1988
		},
		{
			uid: '15',
			age: 30,
			username: 'Eric Smidth',
			Year_of_Birth: 1992
		},
		{
			uid: '16',
			age: 40,
			username: 'Sheryl Sandberg',
			Year_of_Birth: 1982
		}
	];

	columnDefs: ColDef[] = []


	// 	columnDefs: ColDef[] = [
	//     { field: 'uid' },
	//     { field: 'age' },
	//     { field: 'username'}
	// ];

	rowData: any;

	// rowData= [
	//     { make: 'Toyota', model: 'Celica', price: 35000 },
	//     { make: 'Ford', model: 'Mondeo', price: 32000 },
	//     { make: 'Porsche', model: 'Boxster', price: 72000 }
	// ];


	// columnDefs = [];
	// columnDefs:any;

	checkcol() {
		this.rowData = this.userArray;
		this.columnDefs.length = 0;
		const keys = Object.keys(this.userArray[0]);
		console.log(keys);
		keys.forEach(key => this.columnDefs.push({ field: key,editable: true }));
		this.columnDefs.push({      //for edit and delete
			headerName: 'Edit',
			cellRenderer: 'buttonRenderer',
			cellRendererParams: {
				onClick: this.onEditButtonClick.bind(this),
				label: 'Edit'
			},
		},
			{
				headerName: 'Save',
				cellRenderer: 'buttonRenderer',
				cellRendererParams: {
					onClick: this.onSaveButtonClick.bind(this),
					label: 'Save'
				},
			},
			{
				headerName: 'Delete',
				cellRenderer: 'buttonRenderer',
				cellRendererParams: {
					onClick: this.onDeleteButtonClick.bind(this),
					label: 'Delete'
				},
			});
		console.log(this.rowData);

	}

	onRowEditingStopped(params: any) {
		debugger;
	}

	onEditButtonClick(params: any) {
		console.log(params.data)

		this.api.startEditingCell({
			rowIndex: params.rowIndex,
			colKey: 'uid',
		});
	}

	postEditData(sheetEdited: any,userId:any,recordData:any) {
		this.displayservice.postEditedRecord(sheetEdited,userId,recordData).subscribe(
			data => {
				console.log(data);
				this.dataForTable = data;     //stores the json object to be displayed
			}
		);
	}

	onSaveButtonClick(params: any) {
		console.log(params.data.uid)
		console.log(this.selectedSheetName);

		this.sheetEdited=this.selectedSheetName;
		this.userId=params.data.uid
		this.recordData=params.data;
		this.api.stopEditing();
		//calling post function to call the method to send the data to backend
		this.postEditData(this.sheetEdited,this.userId,this.recordData);
	}

	onDeleteButtonClick(params: any) {
		console.log(params.data)
		// debugger;
		this.api.updateRowData({ remove: [params.data] });
	}

	onGridReady(params: any) {
		console.log(params.api)
		this.api = params.api;
	}



	selectChangeHandler(event: any) {
		this.selectedSheet = event.target.value;
		console.log(this.selectedSheet)
		this.selectedSheetName = this.selectedSheet
		console.log(this.selectedSheetName)
		// this.selectedSheetStore=JSON.stringify(this.selectedSheet)
		// console.log(this.selectedSheetStore);
		this.postSheet(this.selectedSheet);

		this.checkcol();

		//dynamically putting in data
		// this.rowData=this.userArray;
		// this.columnDefs.length=0;
		// const keys=Object.keys(this.rowData[0]);
		// keys.forEach(key=>this.columnDefs.push({field:key}));

	}

	postSheet(sheet: any) {
		this.displayservice.postSheetName(sheet).subscribe(
			data => {
				console.log(data);
				this.dataForTable = data;     //stores the json object to be displayed
			}
		);
	}

	ngOnInit(): any {
		// this.dataObject= this.displayservice.getData();      //not required

		//get sheetnames from the available records
		this.displayservice.getSheetNames().subscribe(
			response => {
				// console.log(response);
				this.sheetNames = response;     //stores the passed object containing sheetnames
				console.log(this.sheetNames.data);
				console.log(Object.keys(this.sheetNames.data[0]));
				this.dataSheets = this.sheetNames.data;
			}

		);


		// console.log(this.sheetNames);

		//sending sheet to backend to get the dataof that sheet
		// console.log(this.selectedSheet+"vvvvvvvvvvvvvvvvvvvvvvvvvvvv");
		// if(this.selectedSheet!=""){
		// this.displayservice.postSheetName(this.selectedSheet).subscribe(
		// 	data => {
		// 		console.log(data);
		// 		this.dataForTable = data;     //stores the json object to be displayed
		// 	});
		// }
	}

	//demo data
	selectedUser = null;
	selectedSheetName: any;

	// selectChangeHandler(event: any) {
	// 	this.selectedSheet = event.target.value;
	// 	console.log(this.selectedSheet)
	// 	this.selectedSheetName=this.selectedSheet
	// 	console.log(this.selectedSheetName)
	// 	// this.selectedSheetStore=JSON.stringify(this.selectedSheet)
	// 	// console.log(this.selectedSheetStore);
	// }


}
