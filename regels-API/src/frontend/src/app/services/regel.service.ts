import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Regels } from '../types/regels';

@Injectable({
  providedIn: 'root'
})
export class RegelService {
  private url = environment.baseUrl + '/regels';

  constructor(private httpClient: HttpClient) { }

  getByParams(params: HttpParams): Observable<Regels[]> {
    return this.httpClient.get<Regels[]>(this.url, {
      params: params
    }).pipe(
      retry(1)
    )
  }

  executeRegels(regels: Regels[], form: FormGroup): Observable<Object> {
    const data = {regels: regels, gegevens: {leeftijd: form.value.leeftijd, woonplaats: form.value.plaats, inkomen: form.value.inkomen, woonkosten: form.value.woonkosten, vermogen: form.value.vermogen}}
    return this.httpClient.post(this.url + '/execute', data)
  }
}
