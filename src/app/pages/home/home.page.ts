import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { CocktailsService } from 'src/app/services/cocktails.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  private userSubscription: Subscription;

  public user: User;

  constructor(
    private router: Router,
    private cocktailsService: CocktailsService
    ) {}

  ngOnInit(): void {
    this.userSubscription = this.cocktailsService.userSubject.subscribe(
      (updatedUser) => {
        this.user = updatedUser;
      }
    );
  }

  ngOnDestroy() : void {
    this.userSubscription.unsubscribe();
  }

  openEditProfile(): void {
    this.router.navigateByUrl('/edit-profile');
  }
}
