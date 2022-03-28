const router = require('express').Router()
const cloudinary = require('cloudinary')
const req = require('express/lib/request')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')
const fs = require('fs')

//update image on cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})

//update image only admin can use
router.post('/upload',auth,authAdmin, (req, res) =>{
    try {
        if(!req.files || Object.keys(req.files).length === 0)
            return res.status(400).json({msg: 'Không có tập tin nào được tải lên.'})
        
        const file = req.files.file;
        if(file.size > 1024*1024*5) {
            removeTmp(file.tempFilePath)
            return res.status(400).json({msg: "Kích thước file quá lớn"})
        }

        if(file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png'){
            removeTmp(file.tempFilePath)
            return res.status(400).json({msg: "File định dạng không đúng."})
        }

        cloudinary.v2.uploader.upload(file.tempFilePath, {folder: "WebAoSecondHand_Mern"}, async(err, result)=>{
            if(err) throw err;

            removeTmp(file.tempFilePath)
            res.json({public_id: result.public_id, url: result.secure_url})
        })


    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
})
//delete image only admin can use
router.post('/destroy',auth,authAdmin,(req,res)=>{
    try {
        const {public_id} =req.body;
        if(!public_id){
            return res.status(400).json({msg:"Không hình ảnh được chọn."})
        }

        cloudinary.v2.uploader.destroy(public_id,async(err,result)=>{
            if(err) throw err;

            res.json({msg: "Đã xóa ảnh."})
        })
    } catch (err) {
       return res.status(500).json({msg:err.message})
    }
})

const removeTmp = (path) =>{
    fs.unlink(path,err =>{
        if(err) throw err;
    })
}

module.exports = router