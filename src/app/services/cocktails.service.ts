  
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
  public allCocktails: Cocktail[];
  public drunkCocktails: Cocktail[];

  private readonly localStorageDrunkCocktailsKey = 'drunkCocktails';

  public drunkCocktailsSubject: BehaviorSubject<Cocktail[]>;
  public selectedIndex: number;

  private baseApiUrl = 'https://www.thecocktaildb.com';

  constructor(private httpClient: HttpClient){
    this.drunkCocktails =
    localStorage.getItem(this.localStorageDrunkCocktailsKey) === null
      ? []
      : JSON.parse(localStorage.getItem(this.localStorageDrunkCocktailsKey));
    this.drunkCocktailsSubject = new BehaviorSubject<Cocktail[]>(this.drunkCocktails);
  }

  public getAllCocktails(): Observable<Cocktails> {
    return this.httpClient.get<Cocktails>(this.baseApiUrl + '/api/json/v1/1/filter.php?a=Alcoholic');
  }

  public getCocktails(): Observable<Cocktails> {
    return this.drunkCocktails;
  }

  public search(searchValue: string): Cocktail[] {
    return [...this.allCocktails].filter((cocktail) =>
    cocktail.strDrink.toLowerCase().includes(searchValue.toLowerCase())
    );
  }

  public addDrunkCocktail(newCocktail: Cocktail): void {
  }
}