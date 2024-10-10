import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FactureFormComponent } from './components/content/facture-form/facture-form.component';
import { ContactComponent } from './components/content/contact/contact.component';
import{ AProposComponent } from './components/content/a-propos/a-propos.component';


const routes: Routes = [
  { path: 'facture', component: FactureFormComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'a-propos', component: AProposComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
