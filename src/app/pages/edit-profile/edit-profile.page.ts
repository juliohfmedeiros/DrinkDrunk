import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { AlertController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit, OnDestroy {
  private userSubscription: Subscription;

  public user: User;

  constructor(private userService: UserService,
    private navController: NavController,
    private cameraService: UserService,
    private alertController: AlertController) {}

  ngOnInit(): void {
    this.userSubscription = this.userService.userSubject.subscribe(
      (updatedUser) => {
        this.user = updatedUser;
      }
    );
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  public updateUser(): void {
    this.userService.editUser(this.user);
    this.navController.pop();
  }

  takePicture(): void {
    this.cameraService
      .takePicture()
      .then((encodedImage) => {
        this.user.photo = 'data:image/jpeg;base64,' + encodedImage;
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
