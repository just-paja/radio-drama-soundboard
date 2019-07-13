export function listStories (storyManager) {
  return (messenger, routine, action) =>
    storyManager.listStories()
      .then(stories => messenger.sendMessage(routine.success(stories)))
      .catch(error => messenger.sendMessage(routine.failure(error.message)))
}

export function loadStory (storyManager) {
  return (messenger, routine, action) =>
    storyManager.loadStory(action.payload)
      .then(story => messenger.sendMessage(routine.success(story)))
      .catch(error => messenger.sendMessage(routine.failure(error.message)))
}

export function removeStory (storyManager) {
  return (messenger, routine, action) =>
    storyManager.removeStory(action.payload)
      .then(story => messenger.sendMessage(routine.success(story)))
      .catch(error => messenger.sendMessage(routine.failure(error.message)))
}

export function renameStory (storyManager) {
  return (messenger, routine, action) =>
    storyManager.renameStory(action.payload)
      .then(story => messenger.sendMessage(routine.success(story)))
      .catch(error => messenger.sendMessage(routine.failure(error.message)))
}

export function saveStory (storyManager) {
  return (messenger, routine, action) =>
    storyManager.saveStory(action.payload)
      .then(story => messenger.sendMessage(routine.success(story)))
      .catch(error => messenger.sendMessage(routine.failure(error.message)))
}
