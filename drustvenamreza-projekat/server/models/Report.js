import mongoose from 'mongoose';

const ReportSchema = new mongoose.Schema(
  {
    postId: {
      type: String,
      required: true,
    },
    reportedBy: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Report = mongoose.model('Report', ReportSchema);
export default Report;
