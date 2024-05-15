document.getElementById('uploadForm').addEventListener('submit', async (e) => {
    e.preventDefault()

    // Form data object
    const formData = new FormData()
    // Get the file Input
    const fileInput = document.getElementById('file')
    // add file to form data
    formData.append("document",fileInput.files[0])


    // Send a request to the server
    try {
        const response = await fetch('/api/upload', {
            method: 'POST',
            body: formData
        })

        if (response.ok) {
            console.log("uploaded successfully")
        } else {
            console.log("its not doing 😭😭😭😭")
        }
    } 
    catch(error){
        console.log(error)
    }

})




// GET OUR DATA
fetch('/api/resources')
.then(response => response.json())
.then(data => {
    console.log(data)
    documents = data.documents
    
    const resourceList = document.getElementById('resources-list')
// 1. GET THE PARENT HTML ELEMENT


// Loop over documents
    documents.forEach(doc => {
    const li = document.createElement('li')
    li.innerHTML = `<a href='/documents/${doc.name}'> ${doc.name} </a>`
    resourceList.appendChild(li)
})


})
.catch(error => {
    console.log("Fetching did not work", error)
})

