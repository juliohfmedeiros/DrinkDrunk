import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Cocktail } from 'src/app/models/cocktail.model';
import { User } from 'src/app/models/user.model';
import { CocktailsService } from 'src/app/services/cocktails.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {

  public user: User;
  public allCocktails: Cocktail[];
  public drunkCocktails: Cocktail[];

  private userSubscription: Subscription;
  private allCocktailsSubscription: Subscription;
  drunkCocktailsSubscription: Subscription;

  constructor(private router: Router,
    private userService: UserService,
    private cocktailsService: CocktailsService) {}

    public ngOnInit(): void {
    this.userSubscription = this.userService.userSubject.subscribe(
      (updatedUser) => {
        this.user = updatedUser;
      }
    );
    this.allCocktailsSubscription = this.cocktailsService.getAllCocktails().subscribe(
      (apiData) => {
        this.allCocktails = apiData.drinks
      }
    );
    this.drunkCocktailsSubscription = this.cocktailsService.drunkCocktailsSubject.subscribe(
      (myData) => {
        this.drunkCocktails = myData;
      }
    );
  }

  public ngOnDestroy() : void {
    this.userSubscription.unsubscribe();
    this.allCocktailsSubscription.unsubscribe();
    this.drunkCocktailsSubscription.unsubscribe();
  }
  
  public openProfile(): void {
    this.router.navigateByUrl('/profile');
  }

  public onSearch(event): void {
    const searchValue = event.target.value;
    this.allCocktails = this.cocktailsService.search(searchValue);
  }

  public drunkDrink() : void {
  }
}
