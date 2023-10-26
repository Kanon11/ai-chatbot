import app from "./app.js"
const PORT = process.env.DEFAULT_BACKEND_PORT || 5001;
import chalk from 'chalk'
import * as connection from "./db/connection.js"
connection.connectToDatabase().then(() => {
    app.listen(PORT, () => {
        console.log(chalk.greenBright(`server open in ${PORT} & connected to Database`));
    })
}).catch((err)=>{console.log(err)})
