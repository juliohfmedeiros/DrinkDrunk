  
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cocktails } from '../models/cocktails.model';

@Injectable({
  providedIn: 'root',
})
export class CocktailsService {

  private baseApiUrl = 'https://www.thecocktaildb.com';


  constructor(private httpClient: HttpClient) {
  }

  getAllCocktails(): Observable<Cocktails> {
    return this.httpClient.get<Cocktails>(this.baseApiUrl + '/api/json/v1/1/search.php?s=margarita');
  }

}