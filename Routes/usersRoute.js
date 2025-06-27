const express= require("express")
const router= express.Router()

const {handleLoginUser ,handleRegisterUser}= require("../Controllers/users")



router.post("/api/user/login",handleLoginUser)

router.post("/api/user/register" ,handleRegisterUser)

module.exports = router