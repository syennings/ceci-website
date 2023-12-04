import mongoose from "mongoose";

const { Schema } = mongoose;

const wormSchema = new Schema(
  {
    label: { type: String },
    url: { type: String },
  },
  {
    timestamps: true,
  }
);

const Worm = mongoose.models.Worm || mongoose.model("Worm", wormSchema);

export default Worm;
