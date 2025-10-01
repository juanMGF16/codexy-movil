import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'Codexy',
  webDir: 'www',
  server: {
    cleartext: true, // permite http://
    androidScheme: 'https',
    // hostname: '192.168.1.5', 
    hostname: 'localhost',
  }
};

export default config;
