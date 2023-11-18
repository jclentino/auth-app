import express from "express";
import { signIn, signUp } from '../controllers/User.controllers'

const router = express.Router()

router.post('/signup', signUp )
router.post('/signin', signIn)

export default router