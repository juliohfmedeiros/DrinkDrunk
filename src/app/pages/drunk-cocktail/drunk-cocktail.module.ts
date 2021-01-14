import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DrunkCocktailPageRoutingModule } from './drunk-cocktail-routing.module';

import { DrunkCocktailPage } from './drunk-cocktail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DrunkCocktailPageRoutingModule
  ],
  declarations: [DrunkCocktailPage]
})
export class DrunkCocktailPageModule {}
