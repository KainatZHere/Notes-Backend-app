const notesModel = require("../Model/notes");

const handleCreateNotes = async (req, res) => {
  const { title, content, categories } = req.body;
  const allowedCategories = ["food", "movies", "study"];
  const isMatchCategories = allowedCategories.includes(
    categories.toLowerCase()
  );
  if (!isMatchCategories) {
    return res
      .status(400)
      .json({ msg: "Categories Should be one of Them food,movies,study " });
  }
  if (!title) {
    return res.status(400).json({ msg: "Title Are required" });
  }
  try {
    const existingNoteTitle = await notesModel.findOne({ title });
    if (existingNoteTitle) {
      return res.status(400).json({ msg: "This Note Title Already exist" });
    }
    const newNote = new notesModel({
      title,
      content,
      uploadedBy: req.user.userId,
      categories,
    });
    await newNote.save();
    return res
      .status(201)
      .json({ msg: "Note Successfully Created", result: newNote });
  } catch (error) {
    return res.status(400).json({ Error: error });
  }
};

const handleGetNotes = async (req, res) => {
  try {
    const allNotes = await notesModel.find({});
    if (!allNotes) {
      return res.status(400).json({ msg: "Notes are not exist" });
    }
    return res.status(200).json({
      msg: "All Notes Found Successfully",
      result: allNotes,
    });
  } catch (error) {
    return res.status(400).json({ Error: error });
  }
};

const handleGetNotesByUserId = async (req, res) => {
  try {
    const uploadedByUserId = req.user.userId;
    const userNotes = await notesModel.find({ uploadedBy: uploadedByUserId });
    if (!userNotes || userNotes.length === 0) {
      return res.status(400).json({ msg: "Notes are not exist" });
    }
    return res.status(200).json({
      msg: "User Notes Found Successfully",
      result: userNotes,
    });
  } catch (error) {
    return res.status(400).json({ Error: error });
  }
};

const handleGetNotesByCategorie = async (req, res) => {
  try {
    const categorie = req.params.categorie;
    const searchQuery = req.query.search || "";
    const page = parseInt(req.query.page) || 1; // default to page 1
    const limit = parseInt(req.query.limit) || 10; // default to 10 results per page
    const skip = (page - 1) * limit;

    const filters = {
      categories: categorie,
      $or: [
        { title: { $regex: searchQuery, $options: "i" } },
        { content: { $regex: searchQuery, $options: "i" } },
      ],
    };
    const total = await notesModel.countDocuments(filters);
    const userNotes = await notesModel.find(filters).skip(skip).limit(limit);
    if (!userNotes || userNotes.length === 0) {
      return res.status(400).json({ msg: "Notes are not exist" });
    }
    return res.status(200).json({
      msg: "User Notes Found Successfully",
      result: userNotes,
      Pagination: {
        totalItems: total,
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        pageSize: limit,
      },
    });
  } catch (error) {
    return res.status(400).json({ Error: error });
  }
};

module.exports = {
  handleCreateNotes,
  handleGetNotes,
  handleGetNotesByUserId,
  handleGetNotesByCategorie,
};
