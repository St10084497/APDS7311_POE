import express from "express";
import cors from "cors";
import "./loadEnvironment.mjs";
import https from "https";
import path from "path";
import http from "http";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

const key = process.env.key;
const cert = process.env.CERT;
console.log(cert + " CERT AND KEY " + key)


const options = {
  key: fs.readFileSync(key),
  cert: fs.readFileSync(cert),

}

import records from "./routes/record.mjs";
import users from "./routes/user.mjs";

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());

app.use((reg,res,next)=>
{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers','Origin,X-Requested-With,Contentype,Accept,Authorization');
    res.setHeader('Access-Control-Allow-Methods', '*');
    next();
})

app.use("/user", users);
app.use("/record", records);

let server = http.createServer(app)
let severns = https.createServer(app)

  app.get('/record',(req,res)=>{
    console.log(res)
    //res.send('HTTPS in ExpressJS YASSSSSS')
  })

/*ServerResponse.listen(5051, () =>{
  console.log(`Server that is not secure running on port: ${PORT}`);
});*/

//start the Express server
server.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);

});
