import boardCategoryCreate from './boardCategoryCreate';
import boardCreate from './boardCreate';
import boardSoundAdd from './boardSoundAdd';
import boardSoundDrop from './boardSoundDrop';
import boardTagAdd from './boardTagAdd';

export * from './boardCategoryCreateDefault';
export * from './boardCreate';

export default [
  ...boardSoundAdd,
  ...boardCreate,
  ...boardCategoryCreate,
  ...boardSoundDrop,
  ...boardTagAdd,
];