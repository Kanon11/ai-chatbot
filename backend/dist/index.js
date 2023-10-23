import app from "./app.js";
const PORT = process.env.DEFAULT_BACKEND_PORT || 5001;
// app.post("/user/:id/:roll", (req, res, next) => {
//     console.log(req.body)
//     res.status(200).send({id:req.params.id,roll:req.params.roll})
// })
import * as connection from "./db/connection.js";
connection.connectToDatabase().then(() => {
    app.listen(PORT, () => {
        console.log(`server open in ${PORT} & connected to Database`);
    });
}).catch((err) => { console.log(err); });
//# sourceMappingURL=index.js.map