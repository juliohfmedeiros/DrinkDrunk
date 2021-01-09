  
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cocktails } from '../models/cocktails.model';
import { Cocktail } from '../models/cocktail.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CocktailsService {

  private cocktails: Cocktail[] = [];
  private readonly localStorageCocktailsKey = 'cocktails';

  private baseApiUrl = 'https://www.thecocktaildb.com';

  public cocktailsSubject: BehaviorSubject<Cocktail[]>;

  constructor(private httpClient: HttpClient) {
    
    this.cocktails =
      localStorage.getItem(this.localStorageCocktailsKey) === null
        ? []
        : JSON.parse(localStorage.getItem(this.localStorageCocktailsKey));
    this.cocktailsSubject = new BehaviorSubject<Cocktail[]>(this.cocktails);
  }

  getAllCocktails(): Observable<Cocktails> {
      return this.httpClient.get<Cocktails>(this.baseApiUrl + '/api/json/v1/1/filter.php?a=Alcoholic');
  }

  private streamUpdatedCocktails(): void {
    this.cocktailsSubject.next(this.cocktails);
  }

  search(searchValue: string): Cocktail[] {
    return[...this.cocktails].filter((cocktail) =>
      cocktail.strDrink.toLowerCase().includes(searchValue.toLowerCase())
    );
  }

  drunkDrink() {

  }
}