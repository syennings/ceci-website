import mongoose from "mongoose";

const { Schema } = mongoose;

const workSchema = new Schema({
  title: { type: String },
  editors: { type: String },
  year: { type: Number },
  dimensions: { type: String },
  pages: { type: Number },
  publisher: { type: [String] },
  location: { type: String },
  author: { type: String },
  copies: { type: Number },
  projectType: { type: String },
  school: { type: String },
  images: { type: [String] },
  slug: { type: String },
});

const Work = mongoose.models.Work || mongoose.model("Work", workSchema);

export default Work;
