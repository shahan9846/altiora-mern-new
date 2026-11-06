// Puts the saved text on top of the original text, field by field.
// Why: if a new field is added to a section later, a section that was saved
// earlier does not have it yet. This fills the missing field with the original,
// so the website never receives "undefined".
//
// - A saved value (even an empty one) always wins over the original.
// - Lists keep the original length (the admin cannot add or remove list items).
const mergeWithDefaults = (defaultValue, savedValue) => {
  if (savedValue === undefined || savedValue === null) {
    return defaultValue;
  }

  if (Array.isArray(defaultValue)) {
    if (!Array.isArray(savedValue)) return defaultValue;
    return defaultValue.map((defaultItem, index) => mergeWithDefaults(defaultItem, savedValue[index]));
  }

  if (typeof defaultValue === 'object') {
    const merged = {};
    for (const key of Object.keys(defaultValue)) {
      merged[key] = mergeWithDefaults(defaultValue[key], savedValue[key]);
    }
    return merged;
  }

  return savedValue;
};

export default mergeWithDefaults;
