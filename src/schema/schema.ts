import mongoose, { Schema, Document } from 'mongoose';

// MongoDB connection and schema definition
mongoose.connect('mongodb://localhost:27017/linkedin');

// Prospect interface
interface Prospect extends Document {
  name: string;
  lastName: string;
  profilePicture: string | null;
}

// Prospect schema
const prospectSchema = new Schema<Prospect>({
  name: String,
  lastName: String,
  profilePicture: { type: String, default: null }
});

// Prospect model
const ProspectModel = mongoose.model<Prospect>('Prospect', prospectSchema);

// Saving prospect to MongoDB
export async function saveProspectToMongoDB(prospectData: {
  name: string | undefined;
  lastName: string | undefined;
  profilePicture: string | null;
}) {
  const prospect = new ProspectModel(prospectData);
  await prospect.save();
}
