import { resolve } from 'path';
import { buildTypescriptLib } from '@alqmc/build-ts';
import { enterPath, rootPath } from './path';
import type { DefineLibConfig } from '@alqmc/build-ts';

const buildConfig: DefineLibConfig = {
  baseOptions: {
    input: resolve(enterPath, 'index.ts'),
    enterPath,
    outPutPath: resolve(rootPath, 'dist'),
    tsConfigPath: resolve(rootPath, 'tsconfig.json'),
    pkgPath: resolve(rootPath, 'package.json'),
  },
};

export const build = async () => {
  await buildTypescriptLib(buildConfig);
};
