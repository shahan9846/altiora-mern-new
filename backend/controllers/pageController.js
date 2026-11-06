import PageContent from '../models/PageContent.js';
import homeDefaults from '../defaults/homeDefaults.js';
import aboutDefaults from '../defaults/aboutDefaults.js';
import whyDefaults from '../defaults/whyDefaults.js';
import servicesPageDefaults from '../defaults/servicesPageDefaults.js';
import trainingPageDefaults from '../defaults/trainingPageDefaults.js';
import contactPageDefaults from '../defaults/contactPageDefaults.js';
import siteDefaults from '../defaults/siteDefaults.js';
import careerDefaults from '../defaults/careerDefaults.js';
import mergeWithDefaults from '../defaults/mergeWithDefaults.js';

// The pages that exist so far. Only these names are accepted.
// To add a page: create its defaults file and list it here.
const defaultsByPage = {
  home: homeDefaults,
  about: aboutDefaults,
  why: whyDefaults,
  services: servicesPageDefaults,
  training: trainingPageDefaults,
  contact: contactPageDefaults,
  site: siteDefaults,
  career: careerDefaults,
};

// GET /api/pages/:pageName  (public)
// Sends the saved text for the page, or the original text if nothing is saved yet.
export const getPage = async (req, res) => {
  try {
    const pageName = req.params.pageName;
    const defaultContent = defaultsByPage[pageName];

    if (!defaultContent) {
      return res.status(404).json({ message: 'Page not found' });
    }

    const savedPage = await PageContent.findOne({ page: pageName });
    // Saved text wins; anything not saved yet falls back to the original text
    const pageContent = mergeWithDefaults(defaultContent, savedPage?.content);

    res.json(pageContent);
  } catch (error) {
    console.error('Get page error:', error.message);
    res.status(500).json({ message: 'Could not load the page' });
  }
};

// No single piece of text on a page may be longer than this (the admin boxes allow less).
const MAX_TEXT_LENGTH = 1000;

// True when some text inside the value (a string, a list or an object) is too long
const hasTooLongText = (value) => {
  if (typeof value === 'string') return value.length > MAX_TEXT_LENGTH;
  if (Array.isArray(value)) return value.some(hasTooLongText);
  if (value && typeof value === 'object') return Object.values(value).some(hasTooLongText);
  return false;
};

// A section is valid when it is an object and each of its lists
// (slides, cards, items...) has the same number of entries as the original.
const isSectionValid = (section, defaultSection) => {
  if (!section || typeof section !== 'object') return false;
  if (hasTooLongText(section)) return false;

  return Object.keys(defaultSection).every((key) => {
    if (Array.isArray(defaultSection[key])) {
      return Array.isArray(section[key]) && section[key].length === defaultSection[key].length;
    }
    return true;
  });
};

// PUT /api/pages/:pageName  (admin only)
// Body: { hero: { ... }, about: { ... }, ... }. Saves every section that is sent.
export const savePage = async (req, res) => {
  try {
    const pageName = req.params.pageName;
    const defaultContent = defaultsByPage[pageName];

    if (!defaultContent) {
      return res.status(404).json({ message: 'Page not found' });
    }

    // Collect the sections to save, for example { 'content.hero': {...}, 'content.about': {...} }
    const changes = {};

    for (const sectionName of Object.keys(defaultContent)) {
      const section = req.body[sectionName];

      if (section === undefined) continue; // this section was not sent, leave it as it is

      if (!isSectionValid(section, defaultContent[sectionName])) {
        return res.status(400).json({ message: `The "${sectionName}" text is not in the right shape` });
      }

      changes[`content.${sectionName}`] = section;
    }

    if (Object.keys(changes).length === 0) {
      return res.status(400).json({ message: 'Nothing to save' });
    }

    await PageContent.findOneAndUpdate(
      { page: pageName },
      { $set: changes },
      { upsert: true } // create the page record the first time
    );

    res.json({ message: 'Saved' });
  } catch (error) {
    console.error('Save page error:', error.message);
    res.status(500).json({ message: 'Could not save, please try again' });
  }
};
