import mongoose from 'mongoose';

const sponsorSchema = new mongoose.Schema({
  organizationName: { type: String, required: true },
  organizationEmail: { type: String, required: true },
  contactName: { type: String, required: true },
  contactEmail: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  notes: { type: String, required: true },
});

const Sponsor = mongoose.models.Sponsor || mongoose.model('Sponsor', sponsorSchema);

export default Sponsor;
