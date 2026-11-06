import Enquiry from '../models/Enquiry.js';
import Service from '../models/Service.js';
import TrainingCategory from '../models/TrainingCategory.js';
import TrainingProgram from '../models/TrainingProgram.js';

// GET /api/dashboard  (admin only)
// The numbers and the latest enquiries shown on the Dashboard screen.
export const getDashboard = async (req, res) => {
  try {
    const [newCount, contactedCount, closedCount, servicesShown, servicesTotal, programs, categories, recentEnquiries] =
      await Promise.all([
        Enquiry.countDocuments({ status: 'new' }),
        Enquiry.countDocuments({ status: 'contacted' }),
        Enquiry.countDocuments({ status: 'closed' }),
        Service.countDocuments({ isVisible: true }),
        Service.countDocuments(),
        TrainingProgram.countDocuments(),
        TrainingCategory.countDocuments(),
        Enquiry.find().sort('-createdAt').limit(5),
      ]);

    res.json({
      enquiries: {
        total: newCount + contactedCount + closedCount,
        new: newCount,
        contacted: contactedCount,
        closed: closedCount,
      },
      services: { shown: servicesShown, total: servicesTotal },
      training: { programs, categories },
      recentEnquiries,
    });
  } catch (error) {
    console.error('Dashboard error:', error.message);
    res.status(500).json({ message: 'Could not load the dashboard' });
  }
};
