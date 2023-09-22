import { resolve } from 'path';
import { defineConfig } from 'vite';
import handlebars from 'vite-plugin-handlebars';

const pageData = {
  '/index.html': {
    title: 'Hello!',
  },
  '/templates/pages/login/login.html': {
    title: 'Вход',
    firstname: 'Виталий'
  }
}

export default defineConfig({
  root: resolve(__dirname, 'src'),
  build: {
    outDir: resolve(__dirname, 'dist'),
    rollupOptions: {
      input: {
        index: resolve(__dirname, "/index.html"),
        login: resolve(__dirname, "/templates/pages/login/login.html"),
        signup: resolve(__dirname, "/templates/pages/signup/signup.html"),
        profile: resolve(__dirname, "/templates/pages/profile/profile.html"),
        profileEdit: resolve(__dirname, "/templates/pages/profile/profileEdit.html"),
        profileEditPassword: resolve(__dirname, "/templates/pages/profile/profileEditPassword.html"),
        404: resolve(__dirname, "/templates/pages/error/404.html"),
        500: resolve(__dirname, "/templates/pages/error/500.html"),
        chats: resolve(__dirname, "/templates/pages/chats/empty.html"),
      }
    }
  },
  plugins: [
    handlebars( {
      root: './src',
      context(pagePath) {
        return pageData[pagePath];
      },
      partialDirectory: resolve(__dirname, './src/templates/layout'),
    }),
  ],
})
