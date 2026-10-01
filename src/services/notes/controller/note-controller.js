import NoteRepositories from "../repositories/note-repositories.js";
import { InvariantError, NotFoundError } from "../../../exceptions/index.js";
import response from "../../../utils/response.js";

export const createNote = async (req, res, next) => {
  const { title, body, tags } = req.validated;
  const note = await NoteRepositories.createNote({
    title,
    body,
    tags,
  });
  // const id = nanoid(16);
  // const createdAt = new Date().toISOString();
  // const updatedAt = createdAt;
  // const newNote = { title, tags, body, id, createdAt, updatedAt };
  // notes.push(newNote);

  // const isSuccess = notes.filter((note) => note.id === id).length > 0;

  if (!note) {
    return next(new InvariantError("Catatan gagal ditambahkan"));
    // return res.status(201).json({
    //   status: "success",
    //   message: "Catatan berhasil ditambahkan",
    //   data: { noteId: id },
    // });
  }

  return response(res, 201, "Catatan berhasil ditambahkan", { noteId: note.id });

  // return res.status(500).json({
  //   status: "fail",
  //   message: "Catatan gagal ditambahkan",
  // });
};

export const getAllNotes = async (req, res) => {
  const notes = await NoteRepositories.getAllNotes();
  return response(res, 200, "Catatan sukses ditampilkan", { notes: notes });
  // const { title = "" } = req.query;

  // if (title !== "") {
  //   const note = notes.filter((note) => note.title === title);
  //   return response(res, 200, "success", { notes: note });
  // }

  // return res.json({
  //   status: "success",
  //   data: { notes },
  // });
};

export const getNoteById = async (req, res, next) => {
  const { id } = req.params;
  const note = await NoteRepositories.getNoteById(id);
  // const note = notes.find((n) => n.id === id);

  if (!note) {
    return next(new NotFoundError("Catatan tidak ditemukan"));
    // return res.json({
    //   status: "success",
    //   data: { note },
    // });
  }
  return response(res, 200, "Catatan suskes ditampilkan", { note });

  // return res.status(404).json({
  //   status: "Fail",
  //   message: "Catatan tidak dapat ditemukan",
  // });
};

export const editNoteById = async (req, res, next) => {
  const { id } = req.params;
  const { title, body, tags } = req.validated;
  const note = await NoteRepositories.editNoteById({
    id,
    title,
    body,
    tags,
  });
  // const updatedAt = new Date().toISOString();
  // const index = notes.findIndex((n) => n.id === id);

  if (!note) {
    return next(new NotFoundError("Catatan tidak ditemukan"));
    // return res.json({
    //   status: "Success",
    //   message: "Catatan berhasil ditambahkan",
    // });
  }
  // notes[index] = { ...notes[index], title, tags, body, updatedAt };
  return response(res, 200, "Catatan berhasil diperbarui", { note });
  // return res.json({
  //   status: "Fail",
  //   message: "Gagal memperbarui data. Id tidak ditemukan",
  // });
};

export const deleteNoteById = async (req, res, next) => {
  const { id } = req.params;
  const deleteNoteById = await NoteRepositories.deleteNoteById(id);
  // const index = notes.findIndex((n) => n.id === id);

  if (!deleteNoteById) {
    return next(new NotFoundError("Catatan tidak ditemukan"));
    // return res.json({
    //   status: "Success",
    //   message: "Data berhasil dihapus",
    // });
  }
  // notes.splice(index, 1);
  return response(res, 200, "Catatan berhasil dihapus", deleteNoteById);
  // return res.status(404).json({
  //   status: "Fail",
  //   message: "Catatan Gagal dihapus. Id tidak dapat ditemukan",
  // });
};
