import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
	filename: (req, file, cb) => {
		cb(null, file.fieldname + '-' + Date.now());
	},
});

export const uploadFiles = multer({
	storage: storage,
	fileFilter: (req, file, cb) => {
		const acceptedFormats = /jpg|jpeg|png|gif/;
		const fileExt = acceptedFormats.test(path.extname(file.originalname).toLowerCase());
		const fileMime = acceptedFormats.test(file.mimetype);
		if (fileExt && fileMime) {
			cb(null, true);
			return;
		}
		cb(new Error('File not supported'), false);
	},
});
