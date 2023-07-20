import express, { Application } from 'express'
import { userRouter } from './app/modules/user/user.route'
export const app: Application = express()
import cors from 'cors'
import { bookRouter } from './app/modules/book/book.route'
import { wishlistRouter } from './app/modules/wishlist/wishlist.route'
app.use(express.json())
app.use(cors())

app.use("/", (req, res) => {
    res.json({ data: "working" })
})

app.use('/api/v1/user', userRouter)
app.use('/api/v1/book', bookRouter)
app.use('/api/v1/wishlist', wishlistRouter)