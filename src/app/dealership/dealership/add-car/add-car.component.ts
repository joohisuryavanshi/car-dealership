
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DbService } from '../../service/db.service';
@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.css']
})
export class AddCarComponent {
  addCars!: FormGroup;
  DealerName: any;
  logitude: any;
  latitude: any;
  TotalBudget : any;
  firstName: any;
  lastName: any;
  selectedData: any;
  caresList: any;
  dealerIds: any;
  carData: any;
  constructor( private _formBuilder: FormBuilder,
    private router: Router,
    private dbService: DbService,

    public dialogRef: MatDialogRef<AddCarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}


  ngOnInit(): void {
    this.initializeForm();
    this.carData = this.data.carList;
    this.dealerIds = this.data.dealerId;
  }
  initializeForm() {
    this.addCars = this._formBuilder.group({
      brand: ['', Validators.required],
      model: ['', Validators.required],
      color: ['', Validators.required],
      price: ['', Validators.required]
    
    });
  }
  onCloseClick(): void {
    this.dialogRef.close();
  }


submitForm() {
  let x = this.carData.cars.length-1;
  if(this.carData.cars.length==0){
      this.addCars.value.id = 1
  } else {
      this.addCars.value.id = parseInt(this.carData.cars[x].id)+1;
  }
  
  let data = this.carData;         
  data.cars.push(this.addCars.value); 
  console.log(this.dealerIds)
  this.dbService.addCars(this.dealerIds, data).subscribe((data: any )=> {
    window.location.reload();
  })
}

}
