const connectToMongob = require("./db")
connectToMongob()
const expr = require("express")
const cors = require("cors")
const app = expr()
app.use(expr.json())
app.use(cors())
//for authentication of user 
app.use("/api/auth",require("./Routes/auth"))
app.use("/api/notes",require("./Routes/notes"))
app.listen(5000,()=>{
    console.log("Inotebook http://localhost:3000")
})
