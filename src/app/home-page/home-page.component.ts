import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserSettingsService } from '../core/services/user-settings.service';
import { UserSettings } from '../types/electron-api';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {
  settings$: Observable<UserSettings>;

  constructor(
    private userSettings: UserSettingsService,
    private router: Router
  ) {
    this.settings$ = this.userSettings.getSettings$();
  }

  onStart(): void {
    this.router.navigateByUrl('/register');
  }
}
