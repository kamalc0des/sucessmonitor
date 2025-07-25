export interface UserSettings {
    username: string;
    profilePicture: string;
    sessionCount: number;
  }
  
  declare global {
    interface Window {
      electronAPI: {
        getSettings: () => Promise<UserSettings>;
        updateUsername: (username: string) => Promise<void>;
        updateProfilePicture: (path: string) => Promise<void>;
        incrementSession: () => Promise<void>;
        resetSettings: () => Promise<void>;
      };
    }
  }
  