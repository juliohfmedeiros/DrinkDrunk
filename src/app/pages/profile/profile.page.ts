import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { AlertController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit, OnDestroy {
  private userSubscription: Subscription;

  public user: User;

  constructor(
    private router: Router,
    private userService: UserService,
    private navController: NavController,
    private cameraService: UserService,
    private alertController: AlertController,
  ) {}

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

  openEditProfile(): void {
    this.router.navigateByUrl('/edit-profile');
  }

}
