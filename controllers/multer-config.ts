import multer from 'multer'

//Setting a config for saving files to server
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, './images/')
	},
	filename: function (req, file, cb) {
		cb(null, `${new Date().toISOString()}-${file.originalname}`)
	}
})

//Setting a config to filter files by type and size
const fileFilter = (req: any, file: any, cb: any) => {
	if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') cb(null, true)

	cb(null, false)
}

//Creating a middleware to work with files
const upload = multer({
	storage,
	limits: {
		fileSize: 1024 * 1024 * 2
	},
	fileFilter
})

export default upload
