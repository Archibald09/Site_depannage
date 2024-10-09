import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FactureFormComponent } from './facture-form/facture-form.component';
import { ContactComponent } from './contact/contact.component';


const routes: Routes = [
  { path: 'facture', component: FactureFormComponent },
  { path: 'contact', component: ContactComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
