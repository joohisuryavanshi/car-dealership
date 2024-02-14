import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DbService } from '../service/db.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AddDealerComponent } from './add-dealer/add-dealer.component';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDealerComponent } from './delete-dealer/delete-dealer.component';
import { EditDealerComponent } from './edit-dealer/edit-dealer.component';

@Component({
  selector: 'app-dealership',
  templateUrl: './dealership.component.html',
  styleUrls: ['./dealership.component.css'],
})
export class DealershipComponent implements OnInit {
  dealers: any = [];
  error: any;
  isLoading: boolean = false;
  isSort: boolean = false;
  sortKey: any;
  sortOrder: boolean = false;
  displayedColumns: string[] = [
    'Sr',
    'name',
    'length',
    'totalBudget',
    'button',
  ];
  dataSource: MatTableDataSource<any>;
  searchText: string = '';

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild('TABLE', { static: true }) table!: ElementRef;

  constructor(private dbService: DbService, public _matDialog: MatDialog) {
    this.dataSource = new MatTableDataSource();
  }
  ngOnInit() {
    this.getDealers();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  getDealers() {
    this.dbService
      .getDealers(this.searchText, this.sortKey, this.sortOrder)
      .subscribe((data: any) => {
        this.dealers = data;
        this.dealers.filter((dealer: { name: string }) =>
          dealer.name.toLowerCase().includes(this.searchText.toLowerCase())
        );
        this.dataSource.data = this.dealers;
        this.dataSource.sort = this.sort;
        console.log('Filtered dealers', this.dealers);
      });
    (error: any) => {
      this.error = error.message;
    };
  }

  openAddDealerDialog(): void {
    const dialogRef = this._matDialog.open(AddDealerComponent, {
      width: '600px',
      height: '600px',
      disableClose: true,
      minWidth: '800px',
      data: {
        delerData: this.dealers,
      },
    });
  }

  editDialog(row: any) {
    const dialogRef = this._matDialog.open(EditDealerComponent, {
      width: '600px',
      height: '600px',
      disableClose: true,
      minWidth: '800px',
      data: {
        delerData: row,
      },
    });
  }
  deleteDialog(row: any) {
    const dialogRef = this._matDialog.open(DeleteDealerComponent, {
      width: 'auto',
      height: 'auto',
      disableClose: true,
      data: {
        delerData: row,
      },
    });
  }
}
