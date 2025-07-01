const express= require("express")
const {restrictToVerifyToken}= require("../middlewears/notes")
const router= express.Router()
const {handleCreateNotes ,handleGetNotes ,handleGetNotesByUserId ,handleGetNotesByCategorie}= require("../Controllers/notes")

router.get("/api/notes",restrictToVerifyToken,handleGetNotes)
router.get("/api/notes/userCreatedNotes",restrictToVerifyToken,handleGetNotesByUserId)
router.get("/api/notes/:categorie",restrictToVerifyToken,handleGetNotesByCategorie)
router.post("/api/notes/create",restrictToVerifyToken ,handleCreateNotes)

module.exports = router