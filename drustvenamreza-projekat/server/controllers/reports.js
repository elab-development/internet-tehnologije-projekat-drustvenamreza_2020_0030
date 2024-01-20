import Report from '../models/Report.js';

export const getReports = async (req, res) => {
  try {
    const reports = await Report.find();
    res.status(200).json(reports);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const createReport = async (req, res) => {
  try {
    const { postId, reportedBy } = req.body;

    const newReport = new Report({
      postId,
      reportedBy,
    });
    await newReport.save();

    const reports = await Report.find();
    res.status(201).json(reports);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};
