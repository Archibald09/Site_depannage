import { Component } from '@angular/core';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-facture-form',
  templateUrl: './facture-form.component.html',
  styleUrls: ['./facture-form.component.css']
})
export class FactureFormComponent {
  factureData = {
    nom: '',
    prenom: '',
    adresse: '',
    telephone: '',
    marque: '',
    modele: '',
    signature: '',
    geolocation: '' 
  };

  geolocationMessage: string = ''; // Propriété pour le message de confirmation

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        this.factureData.geolocation = `Latitude: ${lat}, Longitude: ${lon}`;
        
        // Message de confirmation
        this.geolocationMessage = 'Géolocalisation activée avec succès !';
        
        // Masquer le message après 5 secondes
        setTimeout(() => {
          this.geolocationMessage = '';
        }, 5000);
      }, error => {
        console.error('Erreur de géolocalisation : ', error);
        this.geolocationMessage = 'Erreur lors de l\'activation de la géolocalisation.';
      });
    } else {
      alert("La géolocalisation n'est pas supportée par ce navigateur.");
    }
  }

  generateFacture() {
    const doc = new jsPDF();
    
    // Ajouter un titre
    doc.setFontSize(20);
    doc.text('Facture', 14, 20);

    // Ajouter une ligne de séparation
    doc.setLineWidth(0.5);
    doc.line(10, 25, 200, 25); // ligne horizontale

    // Ajouter les informations de la facture
    doc.setFontSize(12);
    doc.text(`Nom: ${this.factureData.nom}`, 14, 35);
    doc.text(`Prénom: ${this.factureData.prenom}`, 14, 45);
    doc.text(`Adresse: ${this.factureData.adresse}`, 14, 55);
    doc.text(`Téléphone: ${this.factureData.telephone}`, 14, 65);
    doc.text(`Marque du véhicule: ${this.factureData.marque}`, 14, 75);
    doc.text(`Modèle du véhicule: ${this.factureData.modele}`, 14, 85);
    doc.text(`Signature: ${this.factureData.signature}`, 14, 95);
    
    // Ajouter les informations de géolocalisation
    doc.text(`Géolocalisation: ${this.factureData.geolocation}`, 14, 105);

    // Ajouter un footer
    doc.setFontSize(10);
    doc.text('Merci de votre confiance!', 14, 130);
    
    // Enregistrer le PDF
    doc.save('facture.pdf');
  }
}
