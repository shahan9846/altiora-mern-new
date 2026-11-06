import mongoose from 'mongoose';

// One training area, for example "Leadership & Management Development".
// Its programs are in the TrainingProgram collection and point back to the category.
const trainingCategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    order: { type: Number, required: true }, // smaller number = shown first
    isVisible: { type: Boolean, default: true }, // false = hidden from the website
  },
  { timestamps: true }
);

const TrainingCategory = mongoose.model('TrainingCategory', trainingCategorySchema);

export default TrainingCategory;
