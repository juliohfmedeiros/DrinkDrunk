import { Component, OnDestroy, OnInit } from '@angular/core';
import { Cocktail } from 'src/app/models/cocktail.model';
import { CocktailsService } from 'src/app/services/cocktails.service';
import { ViewDidEnter } from '@ionic/angular';

@Component({
  selector: 'app-drunk-cocktail',
  templateUrl: './drunk-cocktail.page.html',
  styleUrls: ['./drunk-cocktail.page.scss'],
})
export class DrunkCocktailPage implements ViewDidEnter, OnDestroy, OnInit {

  public drunkCocktail: Cocktail;

  constructor(private cocktailsService: CocktailsService) {}

  ngOnInit(): void {
    this.drunkCocktail = this.cocktailsService.getDrunkCocktail();
  }

  ionViewDidEnter(): void {
    this.cocktailsService.loadMap();
  }

  ngOnDestroy(): void {
    this.cocktailsService.destroyMap();
  }

}
