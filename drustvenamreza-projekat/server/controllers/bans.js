import Ban from '../models/Ban.js';

export const getBans = async (req, res) => {
  try {
    const reports = await Ban.find();
    res.status(200).json(reports);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const createBan = async (req, res) => {
  try {
    const { userId } = req.body;

    const newBan = new Ban({
      userId,
    });
    await newBan.save();

    const bans = await Ban.find();
    res.status(201).json(bans);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};
