import { Component, Inject } from '@angular/core';
import { DbService } from '../../service/db.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
@Component({
  selector: 'app-delete-dealer',
  templateUrl: './delete-dealer.component.html',
  styleUrls: ['./delete-dealer.component.css']
})
export class DeleteDealerComponent {

  deleteData: any;
  
  constructor(private dbService: DbService,
    
    private router: Router,
    public dialogRef: MatDialogRef<DeleteDealerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any ){}

  ngOnInit() {

    this.deleteData = this.data.delerData;
    console.log("fdhj", this.deleteData)
}

  delete(){
    this.dbService.deleteDealer(this.deleteData.id).subscribe(_data => {
      // this.router.navigate(['/dealership']);
      window.location.reload();

  });
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }
}
