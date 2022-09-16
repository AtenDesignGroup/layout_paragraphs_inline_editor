// rollup.config.js
import { terser } from 'rollup-plugin-terser';
import fs from 'fs';

const config = [];
const jsFiles = fs.readdirSync('./source/js');

jsFiles.forEach(function (file) {
  // Do whatever you want to do with the file
  config.push({
    input: `source/js/${file}`,
    external: ['Drupal', 'jQuery', 'drupalSettings'],
    output: [
      {
        file: `build/js/${file}`,
        format: 'iife',
        globals: {
          Drupal: 'Drupal',
          drupalSettings: 'drupalSettings',
          jQuery: '$',
        },
      },
      {
        file: `build/js/${file.replace(/\.js$/, '.min.js')}`,
        format: 'iife',
        plugins: [terser()],
        globals: {
          Drupal: 'Drupal',
          drupalSettings: 'drupalSettings',
          jQuery: '$',
        },
      },
    ]
  });
});
export default config;
