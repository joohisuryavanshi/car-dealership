import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DbService } from '../../service/db.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { AddCarComponent } from '../add-car/add-car.component';
import { MatDialog } from '@angular/material/dialog';
import { DeleteCarComponent } from '../delete-car/delete-car.component';
import { EditCarComponent } from '../edit-car/edit-car.component';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css'],
})
export class CarsComponent implements OnInit {
  displayedColumns: string[] = ['Sr', 'brand', 'model', 'price', 'button'];
  searchTerm: string = '';

  dataSource: MatTableDataSource<any>;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild('TABLE', { static: true }) table!: ElementRef;
  caresList: any = [];
  error: any;
  dealerId: any;

  constructor(
    private dbService: DbService,
    public _matDialog: MatDialog,
    private route: ActivatedRoute
  ) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit() {
    this.dealerId = this.route.snapshot.paramMap.get('id');
    this.getCars(this.dealerId);
  }

  deleteDialog(row: any) {
    const dialogRef = this._matDialog.open(DeleteCarComponent, {
      width: 'auto',
      height: 'auto',
      disableClose: true,
      data: {
        dealerId: this.dealerId,
        carlist: this.caresList,
        dataa: row,
      },
    });
  }
  getCars(id: any) {
    this.dbService.getCars(id).subscribe((res) => {
      this.caresList = res;
      this.dataSource.data = this.caresList.cars; 
    });
    (error: any) => {
      this.error = error.message;
    };
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
  searchCars(event: any) {
    this.searchTerm = (event.target as HTMLInputElement).value;
    this.dataSource.data = this.caresList.cars.filter(
      (car: { brand: string }) =>
        car.brand.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  editDialog(row: any) {
    const dialogRef = this._matDialog.open(EditCarComponent, {
      width: '600px',
      height: '600px',
      maxWidth: '800px',
      disableClose: true,
      data: {
        delerData: row,
        carList: this.caresList,
        dealerId: this.dealerId,
      },
    });
  }
  openAddCarDialog() {
    const dialogRef = this._matDialog.open(AddCarComponent, {
      width: '600px',
      height: '600px',
      maxWidth: '800px',
      disableClose: true,
      data: {
        carList: this.caresList,
        dealerId: this.dealerId,
      },
    });
  }
}
