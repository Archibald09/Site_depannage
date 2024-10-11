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

  geolocationMessage: string = '';

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        this.factureData.geolocation = `Latitude: ${lat}, Longitude: ${lon}`;
        this.geolocationMessage = 'Géolocalisation activée avec succès !';
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

    // Titre stylisé
    doc.setFontSize(26);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(40, 40, 40); // Gris foncé pour le titre
    doc.text('Facture', 105, 25, { align: 'center' });

    // Ligne de séparation avec couleur subtile
    doc.setDrawColor(0, 128, 255); // Bleu clair
    doc.setLineWidth(1);
    doc.line(20, 30, 190, 30);

    // Section "Informations Client"
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(0, 0, 0); // Noir pour les titres
    doc.text('Informations Client', 20, 40);
    
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(`Nom: ${this.factureData.nom}`, 20, 50);
    doc.text(`Prénom: ${this.factureData.prenom}`, 20, 60);
    doc.text(`Adresse: ${this.factureData.adresse}`, 20, 70);
    doc.text(`Téléphone: ${this.factureData.telephone}`, 20, 80);

    // Section "Informations du Véhicule"
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text('Informations du Véhicule', 20, 95);

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(`Marque: ${this.factureData.marque}`, 20, 105);
    doc.text(`Modèle: ${this.factureData.modele}`, 20, 115);

    // Section "Géolocalisation"
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text('Géolocalisation', 20, 130);

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(`Position: ${this.factureData.geolocation}`, 20, 140);

    // Section "Signature"
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text('Signature', 20, 155);

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(`Signature: ${this.factureData.signature}`, 20, 165);

    // Ligne de séparation avant le footer
    doc.setDrawColor(0, 128, 255); // Ligne bleue clair
    doc.setLineWidth(0.5);
    doc.line(20, 185, 190, 185);

    // Footer avec date
    const date = new Date().toLocaleDateString();
    doc.setFontSize(10);
    doc.setFont("helvetica", "italic");
    doc.setTextColor(100); // Gris clair pour le footer
    doc.text(`Date : ${date}`, 20, 195);
    doc.text('Merci de votre confiance !', 105, 205, { align: 'center' });

    // Générer le nom de fichier avec le nom du client
    const fileName = `facture_${this.factureData.nom}.pdf`;

    // Enregistrer le PDF avec le nom personnalisé
    doc.save(fileName);
  }
}
