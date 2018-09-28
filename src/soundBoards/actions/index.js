import { createRoutine } from '../../actions/routines';
import { createListRoutine } from '../../lists';

export const soundBoard = createListRoutine('BOARD', [
  'CATEGORY_ADD',
  'CREATE',
  'RENAME',
  'SOUND_ADD',
  'SOUND_DROP',
  'TAG_ADD',
]);

export const categoryCreate = createRoutine('BOARD_CATEGORY', [
  'FORM_HIDE',
  'FORM_SHOW',
  'SUBMIT',
]);