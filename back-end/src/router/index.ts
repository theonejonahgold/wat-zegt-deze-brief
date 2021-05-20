import { Router } from 'express'
import { userRouter } from './user.js'

const router = Router().use('/user', userRouter)

export default router
