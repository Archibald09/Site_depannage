import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-facture-form',
  templateUrl: './facture-form.component.html',
  styleUrls: ['./facture-form.component.css']
})
export class FactureFormComponent {
  factureForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.factureForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      adresse: ['', Validators.required],
      lieuIntervention: ['', Validators.required],
      telephone: ['', [Validators.required, Validators.pattern(/^(\+33|0)[1-9]\d{8}$/)]], // Regex pour les numéros français
      prixHt: ['', [Validators.required, Validators.min(0)]],
      signature: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.factureForm.valid) {
      console.log(this.factureForm.value);
      // Vous pouvez ensuite traiter les données ici (envoyer à un serveur par exemple)
    } else {
      console.log('Formulaire non valide');
    }
  }
}
