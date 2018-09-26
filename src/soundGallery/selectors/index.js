import { createSelector } from 'reselect';

import { clearSearch, splitSearchPatterns, stringSearch } from '../../search';
import { getSound, memoizeSoundList } from '../../sounds/selectors';
import { getTags } from '../../tags/selectors';
import { getCategories } from '../../soundCategories/selectors';

const memoizeSearch = state => state.soundGallery.search;

export const getSoundSearchValue = createSelector(
  memoizeSearch,
  state => state.search
);

export const getGallerySize = createSelector(
  memoizeSoundList,
  state => state.length
);

export const getSoundSearchValueCleared = createSelector(
  getSoundSearchValue,
  value => clearSearch(value)
);

const hasRelevantTitle = (item, search) => Boolean(item.title)
  && Object.keys(item.title).some(key => stringSearch(item.title[key], search).relevant);

const isRelevant = (item, search, inclusive = false) => (
  stringSearch(item.name, search, inclusive).relevant
  || hasRelevantTitle(item, search)
);

const hasRelevantTags = (sound, relevantTags) => relevantTags
  && sound.tags
  && relevantTags.every(
    tagGroup => tagGroup.some(
      tag => sound.tags.indexOf(tag) !== -1
    )
  );

const getRelevantTags = (tags, search) => {
  const searchSplit = splitSearchPatterns(search);
  return searchSplit.map(pattern => tags
    .filter(tag => isRelevant(tag, pattern))
    .map(tag => tag.name));
};

export const getGallerySoundListFiltered = createSelector(
  [memoizeSoundList, getTags, getSoundSearchValueCleared],
  (sounds, tags, search) => {
    const relevantTags = getRelevantTags(tags, search);
    if (search) {
      return sounds
        .filter(sound => isRelevant(sound, search) || hasRelevantTags(sound, relevantTags))
        .slice(0, 20);
    }
    return sounds.slice(0, 20);
  }
);

export const getGallerySoundList = createSelector(
  [getGallerySoundListFiltered, getCategories],
  (sounds, categories) => sounds.map(sound => ({
    ...sound,
    isUsed: categories.some(category => category.sounds.indexOf(sound.uuid) !== -1),
  }))
);

export const getGallerySound = createSelector(
  getSound,
  state => state
);
