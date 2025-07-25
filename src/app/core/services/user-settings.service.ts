import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { UserSettings } from '../../types/electron-api';

@Injectable({
  providedIn: 'root'
})
export class UserSettingsService {
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  async getSettings(): Promise<UserSettings | null> {
    if (!this.isBrowser) return null;
    return await window.electronAPI.getSettings();
  }

  async updateUsername(name: string): Promise<void> {
    if (!this.isBrowser) return;
    return await window.electronAPI.updateUsername(name);
  }

  async updateProfilePicture(path: string): Promise<void> {
    if (!this.isBrowser) return;
    return await window.electronAPI.updateProfilePicture(path);
  }

  async incrementSession(): Promise<void> {
    if (!this.isBrowser) return;
    return await window.electronAPI.incrementSession();
  }

  async reset(): Promise<void> {
    if (!this.isBrowser) return;
    return await window.electronAPI.resetSettings();
  }
}
