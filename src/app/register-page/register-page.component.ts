import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserSettingsService } from '../core/services/user-settings.service';
import { UserSettings } from '../types/electron-api';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent {
  settings: UserSettings | null = null;

  constructor(
    private userSettings: UserSettingsService,
    private router: Router
  ) {
    console.log('✅ RegisterPageComponent loaded');
  }

  async onSaveUsername(username: string): Promise<void> {
    console.log('✅ Saving username: ' + username);
    await this.userSettings.updateUsername(username);
    this.router.navigateByUrl('');
  }
}
