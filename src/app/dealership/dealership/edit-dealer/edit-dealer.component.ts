
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DbService } from '../../service/db.service';
@Component({
  selector: 'app-edit-dealer',
  templateUrl: './edit-dealer.component.html',
  styleUrls: ['./edit-dealer.component.css']
})
export class EditDealerComponent {

  addDealer!: FormGroup;
  DealerName: any;
  logitude: any;
  latitude: any;
  TotalBudget : any;
  firstName: any;
  lastName: any;
  getdata: any;
  selectedData: any;
  juhi: any = [];
  constructor(private _formBuilder: FormBuilder,
  private router: Router,
  private dbService: DbService,
  public dialogRef: MatDialogRef<EditDealerComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any
) {}
ngOnInit(): void {
  this.initializeForm();
  this.patchForm();
}

initializeForm() {
  this.addDealer = this._formBuilder.group({
    name: ['', Validators.required],          
    totalBudget: ['', Validators.required],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    latitude: ['', Validators.required],
    longitude: ['', Validators.required],
    remainingBudget:[''],
    cars:[''] 
   });
   }

 
patchForm() {
  this.juhi = this.data.delerData;
  console.log(this.juhi)
  this.addDealer.patchValue({
    name: this.juhi.name || '',
    totalBudget: this.juhi.totalBudget,
    firstName: this.juhi.owner?.firstName,
    lastName: this.juhi.owner?.lastName,
    latitude: this.juhi.location?.latitude,
    longitude: this.juhi.location?.longitude,
    remainingBudget:'',
    cars:''

  
  });

}

onCloseClick(): void {
  this.dialogRef.close();
}



submitForm() {
  this.addDealer.value.location = { latitude:this.addDealer.value.latitude, longitude: this.addDealer.value.longitude };
  this.addDealer.value.owner = { firstName: this.addDealer.value.firstName, lastName: this.addDealer.value.lastName };           
  delete this.addDealer.value.latitude;
  delete this.addDealer.value.longitude;
  delete this.addDealer.value.firstName;
  delete this.addDealer.value.lastName;
  if (this.juhi) this.updateDealer(this.juhi.id);
  else this.addDealers(); 
}


updateDealer(id: any) {       
this.dbService.updateDealer(this.juhi.id, this.addDealer.value).subscribe(data => {
  window.location.reload();
})
}



addDealers(){
  this.addDealer.value.cars = [];
  this.dbService.addDealer(this.addDealer.value).subscribe(data => {
    window.location.reload();
  })

}
}
