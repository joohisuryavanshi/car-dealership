import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DealershipComponent } from './dealership.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CarsComponent } from './cars/cars.component';
import { AddDealerComponent } from './add-dealer/add-dealer.component';
import { EditDealerComponent } from './edit-dealer/edit-dealer.component';
import { EditCarComponent } from './edit-car/edit-car.component';
import { AddCarComponent } from './add-car/add-car.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { DeleteCarComponent } from './delete-car/delete-car.component';
import { DeleteDealerComponent } from './delete-dealer/delete-dealer.component';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'dealership',
    pathMatch: 'full'
  },

  {
    path: 'dealership',
    component: DealershipComponent
  },
  {
    path: 'dealership/:id',
    component: CarsComponent
  }
]

@NgModule({
  declarations: [
    DealershipComponent,
    CarsComponent,
    AddDealerComponent,
    EditDealerComponent,
    EditCarComponent,
    AddCarComponent,
    DeleteCarComponent,
    DeleteDealerComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MatSelectModule,
    MatDialogModule,
    MatRadioModule,
    RouterModule.forChild(routes),
    MatTableModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule
  ]
})
export class DealershipModule { }
