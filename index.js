const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const fileType = require('file-type');
const ffmpeg = require('fluent-ffmpeg');
const multer = require('multer');
const AdmZip = require("adm-zip");

const port = 3000;

app.use(express.json());
app.use(express.static("public"));

//set Base path
let base_path = "";

const getFiles = async (dir) => {
    let files = fs.readdirSync(dir);

    let foundDir = [];
    let foundFiles = [];
    for (const file of files) {
        let fullLocation = dir+'/'+file;
        let fileStatus = fs.statSync(fullLocation);

        if(fileStatus.isDirectory()){
            foundDir.push(file)
        }

        if(fileStatus.isFile()){
            let fileInfo = await fileType.fromFile(fullLocation);
            foundFiles.push({
                fileName:file,
                fileType:fileInfo
            })
        }
        
    }
    
    return {dir:foundDir, files:foundFiles};
}

const generateThumbnail = (fileName, fnm) => {
    return new Promise((resolve,reject)=>{
        console.log(path.join(base_path,fileName));

        console.log(fs.existsSync(path.join(base_path,fileName)))
        
        ffmpeg({ source: path.join(base_path,fileName), nolog: true })
        .takeScreenshots(
            {
                timemarks: [ '00:00:10.000' ],
                filename:fnm+'.png',
                folder:'cache'
            }
        )
        .on('end', () => {
            resolve()
        }).
        on('error',(err)=>{
            return reject(new Error(err))
        })
        
    })
}

app.get('/api', async (req, res) => {
    let filesAndDir = await getFiles(base_path)

    return res.json(filesAndDir);
})

app.get('/api/get-file/:folderName', async (req, res) => {
    let filesAndDir = await getFiles(base_path+'/'+req.params.folderName)

    return res.json(filesAndDir);
})

app.get('/api/file-stream/:fileName', async (req, res) => {
    // ffmpeg(base_path+'/'+req.params.fileName)
    //     .withOutputFormat('mp4')
    //     .size('600x?')
    //     .on('end', function(stdout, stdrr){
    //         console.log('finished')
    //     })
    //     .on('error', function(err){
    //         console.log(err)
    //     })
    //     .saveToFile('o.mp4')
    console.log(base_path+'/'+req.params.fileName);
    return res.sendFile(base_path+'/'+req.params.fileName);
})

app.get('/api/file-thumbnail/:folderPath/:fileName', async (req, res) => {
    if (!fs.existsSync(__dirname+'/cache/'+req.params.fileName+'.png')) { 
        await generateThumbnail(decodeURIComponent(req.params.folderPath)+'/'+req.params.fileName, req.params.fileName)
    }

    return res.sendFile(__dirname+'/cache/'+req.params.fileName+'.png')
})

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log(req.params)
        const path = `${base_path}/${req.params.path}`
        fs.mkdirSync(path, { recursive: true })
        return cb(null, path)
    },
    filename: function (req, file, cb) {
        console.log(file)
      cb(null,  file.originalname);
    },
  });
  
const diskStorage = multer({ storage: storage });
  

app.post('/api/file-upload/:path', diskStorage.single('file'), async (req, res) => {
    res.send('asd')
})

app.post('/api/create-folder/:path', async (req, res) => {
    console.log(base_path+'/'+req.params.path+'/'+req.body.folderName);
    fs.mkdirSync(base_path+'/'+req.params.path+'/'+req.body.folderName);
    res.send('asd')
})

app.delete('/api/file-delete', async (req, res) => {
    const file_name_with_path = base_path+req.body.fileName;

    if(fs.existsSync(file_name_with_path)){
        fs.copyFileSync(base_path+req.body.fileName, __dirname+'/trash/'+req.body.fileName)
        console.log(base_path+req.body.fileName)

        res.json('ok')
    }
    
})

app.post('/api/file-unzip', async (req, res) => {
    const file_name_with_path = base_path+req.body.fileName;

    if(fs.existsSync(file_name_with_path)){
        
        var zip = new AdmZip(file_name_with_path);
        console.log(base_path+file_name_with_path.split('.')[0])
        zip.extractAllTo(base_path)

        res.json('ok')
    }else{
        res.json('file not found')
    }
    
})

app.listen(port,() => {
    console.log(`app listening at http://localhost:${port}`)
})
