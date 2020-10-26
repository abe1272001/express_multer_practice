const express = require("express")
const multer = require("multer")
const app = express()




app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html", function(err) {
    if(err) res.send(404)
  })
})


let myStorage = multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, "./upload"); //保存路徑（須先創建）
  },
  filename: function(req,file, callback) {
    callback(null, Date.now()+ "-" + file.originalname) //自定義檔案名稱
  }
})

let upload = multer({
  storage: myStorage,
  fileFilter: function(req, file, callback) {
    if(file.mimetype != "image/jpeg") {
      return callback(new Error("Wrong file type"))
    }
    callback(null, true)
  }


})


//(router, upload接收檔案, callback)
app.post("/upload_file", upload.array('myfile',4),function(req, res){
  // console.log(req.file) single
  console.log(req.files)  //multiple
  res.send(`<h1>上傳成功</h1>`)
})

app.listen(3000)
console.log("Listen on Port 3000")