import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Final configuration for Vite
export default defineConfig({
  plugins: [react()],
  // server: {
  //   host: '0.0.0.0', // Allow access from external devices and networks
  //   port: 5173, // Specify the port Vite should use
  //   strictPort: true, // Ensure the server fails if the port is already in use
  //   origin: 'https://sx3t4bjt-5173.inc1.devtunnels.ms', // The dev tunnel URL
  //   cors: true, // Enable Cross-Origin Resource Sharing
    // hmr: {
    //   protocol: 'wss', // Use WebSocket Secure for dev tunnel compatibility
    //   host: 'sx3t4bjt-5173.inc1.devtunnels.ms', // WebSocket host for HMR
    // },
  // },
});
