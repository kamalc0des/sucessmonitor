import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserSettingsService } from '../core/services/user-settings.service';
import { UserSettings } from '../types/electron-api';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {
  settings: UserSettings | null = null;

  constructor(
    private userSettings: UserSettingsService,
    private router: Router
  ) {
    console.log('✅ HomePageComponent loaded');
    this.loadUserSettings();
  }

  async loadUserSettings(): Promise<void> {
    this.settings = await this.userSettings.getSettings();
    console.log('✅ User settings loaded:', this.settings);
  }

  onStart(): void {
    this.router.navigateByUrl('/register');
  }
}
