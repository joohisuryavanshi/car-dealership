import { Component, Inject } from '@angular/core';
import { DbService } from '../../service/db.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-car',
  templateUrl: './delete-car.component.html',
  styleUrls: ['./delete-car.component.css']
})
export class DeleteCarComponent {

  deleteData: any;
  dealerId: any;
  ids: any;
  
  constructor(private dbService: DbService,
    
    private router: Router,
    public dialogRef: MatDialogRef<DeleteCarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any ){}

  ngOnInit() {

    this.deleteData = this.data.carlist;
    console.log("fdhj", this.deleteData)
    this.dealerId = this.data.dealerId;
    this.ids = this.data.dataa;
    console.log(this.ids)
}

delete() {
  let data = this.deleteData.cars;
  if (data) {
    console.log(this.deleteData.id)
    data = data.filter((item: any) => item.id !== this.ids.id);
    this.deleteData.cars = data;
    this.dbService.deleteCar(this.dealerId, this.deleteData).subscribe(data => {
      window.location.reload();
    });
  }
}


  onCloseClick(): void {
    this.dialogRef.close();
  }
}
