import mongoose from 'mongoose';

// One message sent from the Contact form.
const enquirySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    company: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    service: { type: String, required: true, trim: true }, // the service the visitor picked
    message: { type: String, required: true, trim: true },
    // new = not looked at yet, contacted = we replied, closed = finished
    status: { type: String, enum: ['new', 'contacted', 'closed'], default: 'new' },
  },
  { timestamps: true } // createdAt tells us when it was sent
);

const Enquiry = mongoose.model('Enquiry', enquirySchema);

export default Enquiry;
