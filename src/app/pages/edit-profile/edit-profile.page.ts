import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { CocktailsService } from 'src/app/services/cocktails.service';

@Component({
  selector: 'app-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit, OnDestroy {
  private userSubscription: Subscription;

  public user: User;

  constructor(
    private cocktailsService: CocktailsService,
    private navController: NavController
  ) {}

  ngOnInit(): void {
    this.userSubscription = this.cocktailsService.userSubject.subscribe(
      (updatedUser) => {
        this.user = updatedUser;
      }
    );
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  public updateUser(): void {
    this.cocktailsService.editUser(this.user);
    this.navController.pop();
  }
}
