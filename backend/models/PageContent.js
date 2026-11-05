import mongoose from 'mongoose';

// One document per page. Example:
// { page: "home", content: { hero: { slides: [...], primaryButton: "...", secondaryButton: "..." } } }
// "content" is free-form, so each section can be added without changing this file.
const pageContentSchema = new mongoose.Schema(
  {
    page: {
      type: String,
      required: true,
      unique: true, // only one record per page
    },
    content: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
  },
  { timestamps: true }
);

const PageContent = mongoose.model('PageContent', pageContentSchema);

export default PageContent;
