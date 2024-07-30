import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
})
export class ToolbarComponent implements OnInit {
  isSignedIn: boolean | null = null;
  private signinSubscription: Subscription = new Subscription();
  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    this.signinSubscription = this.authService.signinObservable.subscribe(
      (result) => {
        console.log('+++++++++++++++++', result)
        this.isSignedIn = result;
      }
    );
  }

  logout() {
    this.isSignedIn = null;
    this.authService.logout();
  }

  ngOnDestroy() {
    if (this.signinSubscription) {
      this.signinSubscription.unsubscribe();
    }
  }
}
