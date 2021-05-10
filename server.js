const express = require('express')
const app = express()
const port = 3000
const server = require('http').createServer(app);

const socket = require("./socket");
socket(server, app);


// ************************************** 테스트용 **************************************
const testImages = [
  "https://caroom-storage.s3.ap-northeast-2.amazonaws.com/image_report/320d_sedan_e90_1.png",
  "https://caroom-storage.s3.ap-northeast-2.amazonaws.com/image_report/320d_xDrive_g20_1.png",
  "https://caroom-storage.s3.ap-northeast-2.amazonaws.com/image_report/320d_sedan_e90_2.png",
  "https://caroom-storage.s3.ap-northeast-2.amazonaws.com/image_report/320d_sedan_e90_2.png",
]
app.get("/some", (req,res) => {
  console.log("------------");
  const io = app.get("io");
  io.emit("tasks", { id: 9999,images: testImages});
  res.send("aa");
});
// *************************************************************************************

server.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})