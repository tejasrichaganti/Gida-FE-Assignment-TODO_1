import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'checklist',
    pathMatch: 'full'
  },
  {
    path:'checklist',
    loadChildren : () => import('./components/checklist/checklist.module').then(m => m.CheckListModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
