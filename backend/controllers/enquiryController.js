import mongoose from 'mongoose';
import Enquiry from '../models/Enquiry.js';

// ---------- Simple protection against spam ----------

// Each visitor (by IP address) may send at most 5 enquiries every 15 minutes.
// The list lives in memory, so it resets when the server restarts. That is fine for a small site.
const MAX_ENQUIRIES = 5;
const WINDOW_IN_MILLISECONDS = 15 * 60 * 1000;
const recentEnquiries = new Map(); // ip -> list of times

const isTooMany = (ip) => {
  const now = Date.now();
  const recent = (recentEnquiries.get(ip) || []).filter((time) => now - time < WINDOW_IN_MILLISECONDS);

  if (recent.length >= MAX_ENQUIRIES) return true;

  recentEnquiries.set(ip, [...recent, now]);
  return false;
};

// ---------- Checking the form ----------

const readText = (value) => (typeof value === 'string' ? value.trim() : '');

// Returns an error message, or '' when the form is fine
const findProblem = ({ name, company, email, phone, service, message }) => {
  if (!name || name.length > 120) return 'Please enter your name.';
  if (!company || company.length > 160) return 'Please enter your company or organization name.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 200) return 'Please enter a valid email address.';

  const phoneDigits = phone.replace(/\D/g, '');
  if (!/^[0-9+()\-\s]+$/.test(phone) || phoneDigits.length < 7 || phoneDigits.length > 15) {
    return 'Please enter a valid phone number, e.g. +974 5555 1234.';
  }

  if (!service || service.length > 200) return 'Please select an area of interest.';
  if (!message || message.length > 3000) return 'Please add a short message.';
  return '';
};

// ---------- Public route ----------

// POST /api/enquiries  (the Contact form)
export const createEnquiry = async (req, res) => {
  try {
    // Real visitors never fill this hidden field. Bots do. We pretend it worked and save nothing.
    if (req.body.website) {
      return res.status(201).json({ message: 'Sent' });
    }

    if (isTooMany(req.ip)) {
      return res.status(429).json({ message: 'Too many enquiries. Please try again in a few minutes.' });
    }

    const fields = {
      name: readText(req.body.name),
      company: readText(req.body.company),
      email: readText(req.body.email),
      phone: readText(req.body.phone),
      service: readText(req.body.service),
      message: readText(req.body.message),
    };

    const problem = findProblem(fields);
    if (problem) {
      return res.status(400).json({ message: problem });
    }

    await Enquiry.create(fields);
    res.status(201).json({ message: 'Sent' });
  } catch (error) {
    console.error('Create enquiry error:', error.message);
    res.status(500).json({ message: 'Something went wrong, please try again' });
  }
};

// ---------- Admin routes ----------

// GET /api/enquiries  -> every enquiry, newest first
export const listEnquiries = async (req, res) => {
  try {
    res.json(await Enquiry.find().sort('-createdAt'));
  } catch (error) {
    console.error('List enquiries error:', error.message);
    res.status(500).json({ message: 'Could not load the enquiries' });
  }
};

// PUT /api/enquiries/:id  -> body: { status: "new" | "contacted" | "closed" }
export const updateEnquiryStatus = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) return res.status(404).json({ message: 'Enquiry not found' });

    if (!['new', 'contacted', 'closed'].includes(req.body.status)) {
      return res.status(400).json({ message: 'The status is not valid' });
    }

    const enquiry = await Enquiry.findByIdAndUpdate(req.params.id, { status: req.body.status }, { returnDocument: 'after' });
    if (!enquiry) return res.status(404).json({ message: 'Enquiry not found' });

    res.json(enquiry);
  } catch (error) {
    console.error('Update enquiry error:', error.message);
    res.status(500).json({ message: 'Could not change the status' });
  }
};

export const deleteEnquiry = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) return res.status(404).json({ message: 'Enquiry not found' });

    const enquiry = await Enquiry.findByIdAndDelete(req.params.id);
    if (!enquiry) return res.status(404).json({ message: 'Enquiry not found' });

    res.json({ message: 'Deleted' });
  } catch (error) {
    console.error('Delete enquiry error:', error.message);
    res.status(500).json({ message: 'Could not delete the enquiry' });
  }
};
