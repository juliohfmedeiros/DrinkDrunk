import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Cocktail } from 'src/app/models/cocktail.model';
import { CocktailsService } from 'src/app/services/cocktails.service';

@Component({
  selector: 'app-drunk-cocktail',
  templateUrl: './drunk-cocktail.page.html',
  styleUrls: ['./drunk-cocktail.page.scss'],
})
export class DrunkCocktailPage implements OnInit, OnDestroy {

  public drunkCocktail: Cocktail;

  private cocktailsSubscription: Subscription;

  constructor(private cocktailsService: CocktailsService) {}

  ngOnInit(): void {
    this.cocktailsSubscription = this.cocktailsService.drunkCocktailsSubject.subscribe(
      (newDrunkCocktails) => {
        this.drunkCocktail = newDrunkCocktails[this.cocktailsService.selectedIndex];
      }
    );
  }

  ngOnDestroy(): void {
    this.cocktailsSubscription.unsubscribe();
  }
}
