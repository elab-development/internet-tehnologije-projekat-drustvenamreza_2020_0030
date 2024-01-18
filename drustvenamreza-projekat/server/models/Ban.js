import mongoose from 'mongoose';

const BanSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      default: 7,
    },
    expired: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Ban = mongoose.model('Ban', BanSchema);
export default Ban;
