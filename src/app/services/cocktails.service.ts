  
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cocktails } from '../models/cocktails.model';
import { Cocktail } from '../models/cocktail.model';
import { Map, tileLayer, marker, Marker, LatLng, icon } from 'leaflet';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CocktailsService {

  private baseApiUrl = 'https://www.thecocktaildb.com';
  private cocktails: Cocktail[];

  private drunkCocktails: Cocktail[];
  private readonly localStorageDrunkCocktailsKey = 'drunkCocktails';
  public selectedIndex: number;

  private coordinates: LatLng;
  private map: Map;
  private marker: Marker;

  private positionSubscription: Subscription;
  
  constructor(private httpClient: HttpClient, private geolocation: Geolocation){
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
  
  public getDrunkCocktails(): Cocktail[] {
    return this.drunkCocktails;
  }

  public getSortedDrunkCocktails(): Cocktail[] {
    return [...this.drunkCocktails].sort((cocktail1, cocktail2) => cocktail1.strDrink < cocktail2.strDrink? -1: 1
    );
  }

  public filterCocktailsByDate(): Cocktail[] {
    return [...this.drunkCocktails].sort((cocktail1, cocktail2) => cocktail1.date > cocktail2.date? 0:1);
  }

  public getDrunkCocktail(): Cocktail {
    return this.drunkCocktails[this.selectedIndex];
  }


  public addDrunkCocktail(newDrunkCocktail: Cocktail): void {
    newDrunkCocktail.date = new Date();
    newDrunkCocktail.local = this.coordinates;
    this.drunkCocktails.push(newDrunkCocktail);
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

  public loadMap(): void {
    this.placeMap();
    this.placeMarker();
    this.watchPosition();
  }

  private placeMap(): void {
    this.coordinates = new LatLng(37.7396, -25.6685); // by default it's Ponta Delgada
    this.map = new Map('map').setView(this.coordinates, 15);
    tileLayer(
      'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png',
      {
        maxZoom: 20,
        attribution:
          '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
      }
    ).addTo(this.map);
  }

  private placeMarker(): void {
    this.marker = marker(this.coordinates, {
      icon: icon({
        iconSize: [25, 41],
        iconAnchor: [13, 0],
        iconUrl: 'leaflet/marker-icon.png',
        shadowUrl: 'leaflet/marker-shadow.png',
      }),
    }).addTo(this.map);
    this.marker.bindPopup('You are here!');
  }

  public watchPosition(): void {
    this.positionSubscription = this.geolocation
      .watchPosition()
      .subscribe((data) => {
        if ('coords' in data) {
          this.updateMap(data.coords.latitude, data.coords.longitude);
        }
      });
  }

  private updateMap(latitude: number, longitude: number): void {
    this.coordinates = new LatLng(latitude, longitude);
    this.map.flyTo(this.coordinates);
    this.marker.setLatLng(this.coordinates);
  }

  destroyMap(): void {
    this.positionSubscription.unsubscribe();
    this.map.remove();
    this.marker.remove();
  }

}