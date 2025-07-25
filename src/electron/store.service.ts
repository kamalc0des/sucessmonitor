// src/electron/store.service.ts

import Store from 'electron-store';

export interface UserSettings {
  username: string;
  profilePicture: string;
  sessionCount: number;
}

export class StoreService {
  private store: Store<UserSettings>;

  constructor() {
    this.store = new Store<UserSettings>({
      defaults: {
        username: '',
        profilePicture: '',
        sessionCount: 0
      }
    });
  }

  getSettings(): UserSettings {
    return { username: this.store.get('username'),
      profilePicture: this.store.get('profilePicture'),
      sessionCount: this.store.get('sessionCount') }
  }

  updateUsername(username: string): void {
    this.store.set('username', username);
  }

  updateProfilePicture(picture: string): void {
    this.store.set('profilePicture', picture);
  }

  incrementSessionCount(): void {
    const current = this.store.get('sessionCount') || 0;
    this.store.set('sessionCount', current + 1);
  }

  reset(): void {
    this.store.clear();
  }
}
