import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FactureService {
  private apiUrl = 'http://localhost:4200/factures';

  constructor(private http: HttpClient) {}

  // Méthode pour enregistrer une facture
  saveFacture(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }
}
