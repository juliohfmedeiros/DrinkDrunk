import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { AlertController } from '@ionic/angular';
import { CocktailsService } from 'src/app/services/cocktails.service';

@Component({
  selector: 'app-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit, OnDestroy {
  private userSubscription: Subscription;

  public user: User;

  picture: string;

  constructor(
    private cocktailsService: CocktailsService,
    private navController: NavController,
    private cameraService: CocktailsService,
    private alertController: AlertController
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

  takePicture(): void {
    this.cameraService
      .takePicture()
      .then((encodedImage) => {
        this.picture = 'data:image/jpeg;base64,' + encodedImage;
      })
      .catch(async (error) => {
        const alert = await this.alertController.create({
          header: 'Error',
          message: error,
        });
        await alert.present();
      });
  }
}
