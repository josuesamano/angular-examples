import { FormsComponent } from './pages/forms/forms.component';
import { ConsumeApiComponent } from './pages/consume-api/consume-api.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'consume-api', component: ConsumeApiComponent },
  { path: 'forms', component: FormsComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'consume-api' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
