import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(private http: HttpClient) { }

  getCountries() {
    let headers = new HttpHeaders();
    // headers.set('x-rapidapi-key', '477d35b54dmsh1174f8f0dd89fcbp1b629djsn768b5c21443a');
    // headers.set('x-rapidapi-host', 'ajayakv-rest-countries-v1.p.rapidapi.com');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.get<any>('https://cors-anywhere.herokuapp.com/restcountries.eu/rest/v2/all', {headers});
  }
}
