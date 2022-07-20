import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.konnect_ptg.app',
  appName: 'Konnect',
  webDir: 'build',
  bundledWebRuntime: false,
  plugins: {
    SplashScreen: {
        launchShowDuration : 2000
    }
  }
};

export default config;
