import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DrunkCocktailPage } from './drunk-cocktail.page';

const routes: Routes = [
  {
    path: '',
    component: DrunkCocktailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DrunkCocktailPageRoutingModule {}
