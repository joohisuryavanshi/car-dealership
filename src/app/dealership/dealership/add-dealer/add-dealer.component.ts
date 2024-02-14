
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DbService } from '../../service/db.service';
@Component({
  selector: 'app-add-dealer',
  templateUrl: './add-dealer.component.html',
  styleUrls: ['./add-dealer.component.css']
})
export class AddDealerComponent implements OnInit {
  addDealer!: FormGroup;
  DealerName: any;
  logitude: any;
  latitude: any;
  TotalBudget : any;
  firstName: any;
  lastName: any;
  getdata: any;
  selectedData: any;
  constructor( private _formBuilder: FormBuilder,
    private router: Router,
    private dbService: DbService,
    public dialogRef: MatDialogRef<AddDealerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}


  ngOnInit(): void {
    this.initializeForm();
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
    this.addDealer.value.cars = [];
    this.dbService.addDealer(this.addDealer.value).subscribe(data => {
      window.location.reload();
    })
}
}
