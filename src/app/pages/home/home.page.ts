import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Cocktail } from 'src/app/models/cocktail.model';
import { User } from 'src/app/models/user.model';
import { CocktailsService } from 'src/app/services/cocktails.service';
import { UserService } from 'src/app/services/user.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LatLng } from 'leaflet';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {

  public user: User;
  public cocktails: Cocktail[];
  public coordinates: LatLng;

  private userSubscription: Subscription;
  private cocktailsSubscription: Subscription;
  private positionSubscription: Subscription;

  constructor(private router: Router,
    private userService: UserService,
    private cocktailsService: CocktailsService,
    private geolocation: Geolocation) {}

  public ngOnInit(): void {
    this.userSubscription = this.userService.userSubject.subscribe(
      (updatedUser) => {
        this.user = updatedUser;
      }
    );
    this.cocktailsSubscription = this.cocktailsService.getAllCocktails().subscribe(
      (apiData) => {
        this.cocktails = apiData.drinks;
        this.cocktailsService.setCocktails(this.cocktails);
      }
    );
    this.positionSubscription = this.geolocation
      .watchPosition().subscribe((data) => {
        if ('coords' in data) {
          this.coordinates = new LatLng(data.coords.latitude, data.coords.longitude);
          this.cocktailsService.setCoordinates(this.coordinates);
        }
    });
  }
  
  public ngOnDestroy() : void {
    this.userSubscription.unsubscribe();
    this.cocktailsSubscription.unsubscribe();
    this.positionSubscription.unsubscribe();
  }
  
  public openProfile(): void {
    this.router.navigateByUrl('/profile');
  }

  public onSearch(event): void {
    const searchValue = event.target.value;
    this.cocktails = this.cocktailsService.search(searchValue);
  }

  public drunkDrink(newDrunkCocktail: Cocktail) : void {
    this.cocktailsService.addDrunkCocktail( newDrunkCocktail);
  }
}
