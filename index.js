// Import express 
const express = require('express')

// import file system and path
const fs = require('fs')
const path = require('path')

//Import other packages
const bodyParser = require('body-parser')
const multer = require('multer') 

// Create a server
const server = express()

server.use(bodyParser.urlencoded({extended: true}))
// Serve our static files (public folder)
server.use(express.static('public'))

// SETUP MULTER
const storage = multer.diskStorage({
    destination: './public/documents',
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

const upload = multer({storage})

server.post('/api/upload', upload.single('document'), (req, res) => {
    res.json({message: "Document uploaded"})
} )

// ENDPOINTS 
server.get('/api/greet', (req, res) => {
    res.send('<h1> This is the server message </h1>')
})

server.get('/api/resources', (request, response) => {
    const directoryPath = './public/documents'
    // READ DIRECTORY (FOLDER)
    fs.readdir(directoryPath, (error, files) => {
        // if we have an error send the error message then stop running
        if (error) {
            console.error('Error reading from folder:', error)
            return
        }

        const documents = []
        files.forEach(file => {
            const filePath = path.join(directoryPath, file)
            const document = {
                name: file,
                path: filePath
            }
            documents.push(document)
        })

        // SEND DATA TO OUR BROWSER
        console.log(documents)
        response.json({documents})
    })
})




// Listen on a port for incoming requests
server.listen(3000, () => {
    console.log('server running on port 3000')
})