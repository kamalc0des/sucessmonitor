import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { UserSettings } from '../../types/electron-api';
import { Observable, from, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserSettingsService {
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  getSettings$(): Observable<UserSettings> {
    if (!this.isBrowser) {
      return of({
        username: '',
        profilePicture: '',
        sessionCount: 0
      });
    }

    return from(window.electronAPI.getSettings());
  }

  updateUsername(name: string): Observable<void> {
    if (!this.isBrowser) return of(void 0);
    return from(window.electronAPI.updateUsername(name));
  }

  updateProfilePicture(path: string): Observable<void> {
    if (!this.isBrowser) return of(void 0);
    return from(window.electronAPI.updateProfilePicture(path));
  }

  incrementSession(): Observable<void> {
    if (!this.isBrowser) return of(void 0);
    return from(window.electronAPI.incrementSession());
  }

  reset(): Observable<void> {
    if (!this.isBrowser) return of(void 0);
    return from(window.electronAPI.resetSettings());
  }
}
