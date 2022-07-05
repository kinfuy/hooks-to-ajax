import { resolve } from 'path';
import { copyFile } from '@alqmc/build-utils';
import { enterPath, outputPath, rootPath } from './path';
export const copyFiles = async () => {
  Promise.all([
    copyFile(
      resolve(enterPath, 'package.json'),
      resolve(outputPath, 'package.json')
    ),
    copyFile(resolve(rootPath, 'README.md'), resolve(outputPath, 'README.md')),
  ]);
};
