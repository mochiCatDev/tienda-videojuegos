//import { defineConfig } from 'vite'
//import react from '@vitejs/plugin-react'

// https://vite.dev/config/
//export default defineConfig({
//  plugins: [react()],
//})


// Eliminar estas lineas al finalizar los cambios
import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    allowedHosts: [
      'agent-quickstep-elixir.ngrok-free.dev'
    ]
  }
})