/* eslint-disable no-console */

import { app } from './app'
import { bootstrap } from './app/mongodb/mongodb.connection'
import { config } from './config'

app.listen(config.port, async () => {
    try {
        console.log(`app listening on port ${config.port}`)
        await bootstrap()
        console.log("mongodb connected")
    } catch (error) {
        console.log(error)
    }
})