
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DbService } from '../../service/db.service';

@Component({
  selector: 'app-edit-car',
  templateUrl: './edit-car.component.html',
  styleUrls: ['./edit-car.component.css']
})
export class EditCarComponent {


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
  juhi: any;
  constructor( private _formBuilder: FormBuilder,
    private router: Router,
    private dbService: DbService,

    public dialogRef: MatDialogRef<EditCarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}


  ngOnInit(): void {
    this.initializeForm();
    this.patchForm();
    
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
  patchForm() {
    this.juhi = this.data.delerData;
    console.log(this.juhi)
    this.addCars.patchValue({
        brand: this.juhi.brand,
        model: this.juhi.model,
        color: this.juhi.color,
        price: this.juhi.price
    })
   
  }

  submitForm() {
        
    if (this.juhi) this.updateCar(this.juhi.id);
    else this.addCar();
}

addCar() {
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

updateCar(id: any) {
  let data = this.carData.cars; 
  data = data.map((data:any, index:number) => {
      if(data.id == this.juhi.id) return data[index] = this.addCars.value;
      else return data;
  });
  this.carData.cars=data;  
  this.dbService.updateCar(this.dealerIds, this.carData).subscribe(data => {
    window.location.reload();
  })
}


}
