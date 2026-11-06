import mongoose from 'mongoose';

// One document = one service shown on the website (a card and its own detail page).
const serviceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    // The page address, for example "professional-development" -> /services/professional-development.
    // It is made from the title when the service is created and never changes after that,
    // so links to the service keep working.
    slug: { type: String, required: true, unique: true },
    text: { type: String, required: true, trim: true },
    image: { type: String, default: '' }, // for example "/uploads/slide-123.jpg"
    order: { type: Number, required: true }, // smaller number = shown first
    isVisible: { type: Boolean, default: true }, // false = hidden from the website
  },
  { timestamps: true }
);

const Service = mongoose.model('Service', serviceSchema);

export default Service;
