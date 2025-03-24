// import { input } from '@inquirer/prompts';
import qr from "qr-image";
import * as fs from 'node:fs';
import express from 'express';
import { writeFile } from 'node:fs';
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const image_path  = 'public/images/qr_image.png'

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

var generated;

app.get("/",(req,res)=>{
  generated = false;
  res.render("index.ejs",{generated:generated})
});


app.post("/generate",(req,res)=>{
  generated = true;
  const url_prompt = req.body["link"]

  var qr_svg = qr.image(url_prompt);
qr_svg.pipe(fs.createWriteStream(image_path));
 

writeFile('URL.txt', url_prompt,"utf-8", (err) => {
  if (err) throw err;
  console.log('The file has been saved!');
});


  res.render("index.ejs",{generated:true})
})


app.listen(port,()=>{
  console.log(`Listening on port ${port}`)
})