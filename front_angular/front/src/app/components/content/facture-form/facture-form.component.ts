import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import SignaturePad from 'signature_pad';
import { FactureService } from './facture.service'; // Importer le service

@Component({
  selector: 'app-facture-form',
  templateUrl: './facture-form.component.html',
  styleUrls: ['./facture-form.component.css']
})
export class FactureFormComponent implements AfterViewInit {
  factureForm: FormGroup;
  signaturePad!: SignaturePad;
  @ViewChild('canvas') canvasEl!: ElementRef;

  constructor(private fb: FormBuilder, private factureService: FactureService) {
    this.factureForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      adresse: ['', Validators.required],
      telephone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      marque: ['', Validators.required],
      modele: ['', Validators.required],
      immatriculation: ['', Validators.required],
      geolocalisation: ['', Validators.required], 
      signature: ['']
    });
  }

  ngAfterViewInit() {
    this.signaturePad = new SignaturePad(this.canvasEl.nativeElement);
  }

  clearSignature() {
    this.signaturePad.clear();
  }

  onSubmit() {
    if (this.factureForm.valid) {
      const signatureData = this.signaturePad.toDataURL();
      this.factureForm.patchValue({ signature: signatureData });

      this.factureService.saveFacture(this.factureForm.value).subscribe(
        response => {
          console.log('Facture enregistrée avec succès', response);
          this.factureForm.reset();
          this.clearSignature();
        },
        error => {
          console.error('Erreur lors de l\'enregistrement de la facture', error);
        }
      );
    } else {
      console.log('Formulaire invalide');
    }
  }

  getGeolocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        this.factureForm.patchValue({ geolocalisation: `${lat}, ${lng}` });
      }, error => {
        console.error('Erreur lors de la récupération de la géolocalisation', error);
      });
    } else {
      console.log('Géolocalisation non supportée par ce navigateur.');
    }
  }
}

