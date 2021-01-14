import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Cocktail } from 'src/app/models/cocktail.model';
import { User } from 'src/app/models/user.model';
import { CocktailsService } from 'src/app/services/cocktails.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit, OnDestroy {

  public user: User;
  public drunkCocktails: Cocktail[];

  private userSubscription: Subscription;
  private cocktailsSubscription: Subscription;

  constructor(private router: Router,
    private userService: UserService,
    private cocktailsService: CocktailsService) {}

  public ngOnInit(): void {
    this.userSubscription = this.userService.userSubject.subscribe(
      (updatedUser) => {
        this.user = updatedUser;
      }
    );
    this.cocktailsSubscription = this.cocktailsService.drunkCocktailsSubject.subscribe(
      (myData) => {
        this.drunkCocktails = myData
      }
    );
    this.drunkCocktails = this.cocktailsService.getSortedCocktails();
  }

  public ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
    this.cocktailsSubscription.unsubscribe();
  }

  public openEditProfile(): void {
    this.router.navigateByUrl('/edit-profile');
  }

  public onSearch(event): void {
    const searchValue = event.target.value;
    this.drunkCocktails = this.cocktailsService.searchDrunks(searchValue);
  }

  removeCocktail(index: number): void {
    this.cocktailsService.removeCocktail(index);
  }
  public openDrunkCocktail(index: number): void {
    this.cocktailsService.selectedIndex = index;
    this.router.navigateByUrl('/drunk-cocktail');
  }
}
