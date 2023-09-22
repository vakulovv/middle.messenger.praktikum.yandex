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
      }
    }
  },
  // plugins: [
  //   handlebars( {
  //     root: './src',
  //     context(pagePath) {
  //       return pageData[pagePath];
  //     },
  //     partialDirectory: resolve(__dirname, './src/templates/layout'),
  //   }),
  // ],
})
