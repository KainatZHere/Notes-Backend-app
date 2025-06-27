const express= require("express")
const router= express.Router()
const {handleCreateNotes ,handleGetNotes ,handleGetNotesByUserId ,handleGetNotesByCategorie}= require("../Controllers/notes")

router.get("/api/notes",handleGetNotes)
router.get("/api/notes/userCreatedNotes",handleGetNotesByUserId)
router.get("/api/notes/:categorie",handleGetNotesByCategorie)
router.post("/api/notes/create" ,handleCreateNotes)

module.exports = router