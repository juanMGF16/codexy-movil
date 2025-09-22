import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'Codexy',
  webDir: 'www',
  server: {
    cleartext: true, // permite http://
    androidScheme: 'http',
    // hostname: '192.168.1.5', 
    hostname: '172.22.213.185',
  }
};

export default config;
