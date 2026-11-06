import mongoose from 'mongoose';

// One training program inside a category.
const trainingProgramSchema = new mongoose.Schema(
  {
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'TrainingCategory', required: true },
    title: { type: String, required: true, trim: true },
    text: { type: String, required: true, trim: true },
    tags: { type: [String], default: [] }, // the small "what you will learn" labels
    order: { type: Number, required: true }, // smaller number = shown first (inside its category)
    isVisible: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const TrainingProgram = mongoose.model('TrainingProgram', trainingProgramSchema);

export default TrainingProgram;
