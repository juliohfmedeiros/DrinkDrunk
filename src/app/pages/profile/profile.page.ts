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
  public toShowIcon: string = "caret-down-outline";
  constructor(private router: Router,
    private userService: UserService,
    private cocktailsService: CocktailsService) {
    }

  public ngOnInit(): void {
    this.userSubscription = this.userService.userSubject.subscribe(
      (updatedUser) => {
        this.user = updatedUser;
      }
    );
    this.drunkCocktails = this.cocktailsService.getSortedDrunkCocktails();
  }

  public ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  public getSortedDrunks() {
    this.toShowIcon = 'caret-down-outline';
    this.drunkCocktails = this.cocktailsService.filterCocktailsByDateDesc();
    this.drunkCocktails = this.cocktailsService.getSortedDrunkCocktails();
  }
  public filterByDate(): void {
    if (this.toShowIcon == 'caret-up-outline') {
      this.toShowIcon = 'caret-down-outline';
      this.drunkCocktails = this.cocktailsService.filterCocktailsByDateDesc();
    }else{
      this.toShowIcon = 'caret-up-outline';
      this.drunkCocktails = this.cocktailsService.filterCocktailsByDateAsc();
    }
  }

  public openEditProfile(): void {
    this.router.navigateByUrl('/edit-profile');
  }

  public onSearch(event): void {
    const searchValue = event.target.value;
    this.drunkCocktails = this.cocktailsService.searchDrunks(searchValue);
  }

  public removeCocktail(index: number): void {
    this.cocktailsService.removeCocktail(index);
    this.drunkCocktails = this.cocktailsService.getSortedDrunkCocktails();
  }

  public openDrunkCocktail(index: number): void {
    this.cocktailsService.selectedIndex = index;
    this.router.navigateByUrl('/drunk-cocktail');
  }
}
