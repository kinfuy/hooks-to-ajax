import { resolve } from 'path';
import { updateVersion } from '@alqmc/build-utils';
import { enterPath, rootPath } from './path';

const targetPkgPath = [
  resolve(rootPath, 'package.json'),
  resolve(enterPath, 'package.json'),
];
updateVersion({
  targetPkgPath,
});
