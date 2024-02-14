import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [        {
  path: '',
  loadChildren: () => import('./dealership/dealership/dealership.module').then(m => m.DealershipModule)
},];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }                              1
   