import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user: User;
  private readonly localstorageUserKey = 'user';

  private cameraOptions: CameraOptions;

  public userSubject: BehaviorSubject<User>;

  constructor(private cameraPlugin: Camera) {
    let user: User = new User('José Pequeno', new Date(2020, 1, 1, 0, 0, 0, 0), 'assets/avatar.png');
    this.user = 
    localStorage.getItem(this.localstorageUserKey) === null
    ?  user
    : JSON.parse(localStorage.getItem(this.localstorageUserKey));
    this.userSubject = new BehaviorSubject<User>(this.user);

    this.cameraOptions = {
      quality: 100,
      destinationType: this.cameraPlugin.DestinationType.DATA_URL,
      encodingType: this.cameraPlugin.EncodingType.JPEG,
      mediaType: this.cameraPlugin.MediaType.PICTURE,
    };
  }

  private streamUpdatedUser(): void {
    this.userSubject.next(this.user);
  }

  private saveUser(): void {
    localStorage.setItem(
      this.localstorageUserKey, JSON.stringify(this.user)
    );
  }

  public editUser(editedUser: User): void {
    this.user = editedUser;
    this.streamUpdatedUser();
    this.saveUser();
  }

  takePicture(): Promise<any> {
    return this.cameraPlugin.getPicture(this.cameraOptions);
  }
}
