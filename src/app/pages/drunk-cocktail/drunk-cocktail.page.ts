import { Component, OnDestroy, OnInit } from '@angular/core';
import { Cocktail } from 'src/app/models/cocktail.model';
import { CocktailsService } from 'src/app/services/cocktails.service';
import { ViewDidEnter } from '@ionic/angular';
import { Map, tileLayer, marker, Marker, icon, LatLng } from 'leaflet';

@Component({
  selector: 'app-drunk-cocktail',
  templateUrl: './drunk-cocktail.page.html',
  styleUrls: ['./drunk-cocktail.page.scss'],
})
export class DrunkCocktailPage implements ViewDidEnter, OnDestroy, OnInit {

  public drunkCocktail: Cocktail;

  private coordinates: LatLng;
  private map: Map;
  private marker: Marker;
  
  constructor(private cocktailsService: CocktailsService) {}

  ngOnInit(): void {
    this.drunkCocktail = this.cocktailsService.getDrunkCocktail();
  }

  ionViewDidEnter(): void {
    this.loadMap();
  }

  ngOnDestroy(): void {
    this.destroyMap();
  }

  public loadMap(): void {
    this.placeMap();
    this.placeMarker();
    this.map.flyTo(this.coordinates);
    this.marker.setLatLng(this.coordinates);
  }

  private placeMap(): void {
    this.coordinates = this.drunkCocktail.local;
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
    this.marker.bindPopup(this.drunkCocktail.date);
  }

  destroyMap(): void {
    this.map.remove();
    this.marker.remove();
  }

}
