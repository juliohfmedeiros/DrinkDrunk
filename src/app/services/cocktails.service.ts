  
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cocktails } from '../models/cocktails.model';
import { Cocktail } from '../models/cocktail.model';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CocktailsService {

  private baseApiUrl = 'https://www.thecocktaildb.com';

  public cocktails: Cocktail[];

  cocktailsSubscription: Subscription;
  
  constructor(private httpClient: HttpClient) {
    this.cocktailsSubscription = this.getAllCocktails().subscribe(
      (apiData) => {
        this.cocktails = apiData.drinks;
      }
    );
  }

  getAllCocktails(): Observable<Cocktails> {
    return this.httpClient.get<Cocktails>(this.baseApiUrl + '/api/json/v1/1/filter.php?a=Alcoholic');
  }

  search(searchValue: string): Cocktail[] {
    return [...this.cocktails].filter((cocktail) =>
    cocktail.strDrink.toLowerCase().includes(searchValue.toLowerCase())
    );
  }

  drunkDrink() {

  }
}