import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.konnect_ptg.app',
  appName: 'Konnect',
  webDir: 'build',
  bundledWebRuntime: false,
  plugins: {
    SplashScreen: {
        launchShowDuration : 2000
    },
    GoogleAuth: {
      scopes: ["profile","email"],
      serverClientId: "987108446678-c7b7e30tgfva58nd7ilt3ng5vjfnfaqn.apps.googleusercontent.com",
      forceCodeForRefreshToken: true,
    },
  }
};

export default config;
