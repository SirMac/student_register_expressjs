
exports.imgupload = (img) => {
    let uploadpath = './static/uploads/' + img.name

    img.mv(uploadpath, er=>{
        return er ? console.log(er) : console.log('Image upload successful')
     })
}

exports.imgdelete = (img) => {
    const fs = require('fs')
    let uploadpath = './static/uploads/'+img

    fs.unlink(uploadpath, er=>{
        er ? console.log('Image remove not successful',er) : console.log('Image removed Successfully')
     })
}