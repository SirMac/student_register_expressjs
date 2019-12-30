
exports.imgupload = (req,res) => {
    const {img} = req.files
    let imgfile = img
    let uploadpath = './static/uploads/' + imgfile.name

    imgfile.mv(uploadpath, er=>{
        return er ? console.log(er) : ''
     })
}

exports.imgdelete = (req,res) => {
    const fs = require('fs')
    const {img} = req.query
    let uploadpath = './static/uploads/'+img

    fs.unlink(uploadpath, er=>{
        er ? console.log('Image remove not successful',er) : console.log('Image removed Successfully')
     })
}