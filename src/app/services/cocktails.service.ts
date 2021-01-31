  
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { Cocktails } from '../models/cocktails.model';
import { Cocktail } from '../models/cocktail.model';
import { LatLng } from 'leaflet';

@Injectable({
  providedIn: 'root',
})
export class CocktailsService {

  private baseApiUrl = 'https://www.thecocktaildb.com';
  private cocktails: Cocktail[];
  private drunkCocktails: Cocktail[];
  private coordinates: LatLng;

  private readonly localStorageDrunkCocktailsKey = 'drunkCocktails';
  public selectedIndex: number;

  constructor(private httpClient: HttpClient){
    this.drunkCocktails =
    localStorage.getItem(this.localStorageDrunkCocktailsKey) === null
      ? []
      : JSON.parse(localStorage.getItem(this.localStorageDrunkCocktailsKey));
  }

  public getAllCocktails(): Observable<Cocktails> {
    return this.httpClient.get<Cocktails>(this.baseApiUrl + '/api/json/v1/1/filter.php?a=Alcoholic');
  }

  public search(searchValue: string): Cocktail[] {
    return [...this.cocktails].filter((cocktail) =>
    cocktail.strDrink.toLowerCase().includes(searchValue.toLowerCase())
    );
  }

  public setCocktails(cocktails: Cocktail[]): void {
    this.cocktails = cocktails;
  }
  public setCoordinates(local: LatLng): void {
    this.coordinates = local;
  }
  public getDrunkCocktails(): Cocktail[] {
    return this.drunkCocktails;
  }

  public getSortedDrunkCocktails(): Cocktail[] {
    return [...this.drunkCocktails].sort((cocktail1, cocktail2) => cocktail1.strDrink < cocktail2.strDrink? -1: 1
    );
  }

  public filterCocktailsByDateDesc(): Cocktail[] {
    return [...this.drunkCocktails].sort((cocktail1, cocktail2) => cocktail1.date < cocktail2.date? 1:-1);
  }

  public filterCocktailsByDateAsc(): Cocktail[] {
    return [...this.drunkCocktails].sort((cocktail1, cocktail2) => cocktail1.date > cocktail2.date? 1:-1);
  }

  public getDrunkCocktail(): Cocktail {
    return this.drunkCocktails[this.selectedIndex];
  }

  public addDrunkCocktail(newDrunkCocktail: Cocktail): void {
    let drunkCocktail = {...newDrunkCocktail};
    drunkCocktail.local = this.coordinates;
    drunkCocktail.date = new Date();
    this.drunkCocktails.push(drunkCocktail);
    localStorage.setItem(
      this.localStorageDrunkCocktailsKey,
      JSON.stringify(this.drunkCocktails)
    );
  }

  public searchDrunks(searchValue: string): Cocktail[] {
    return [...this.drunkCocktails].filter((cocktail) =>
    cocktail.strDrink.toLowerCase().includes(searchValue.toLowerCase())
    );
  }

  public removeCocktail(index: number): void {
    this.drunkCocktails.splice(index, 1);
    localStorage.setItem(
      this.localStorageDrunkCocktailsKey,
      JSON.stringify(this.drunkCocktails)
    );
  }

}