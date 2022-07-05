import { series } from 'gulp';
import { run, withTask } from '@alqmc/build-utils';
import { build } from './build';
import { copyFiles } from './copyfile';

export default series(
  withTask('update:version', () => run('pnpm run update:version')),
  withTask('clear', () => run('pnpm run clear')),
  build,
  copyFiles
);
