import multer from 'multer';
import { TEMP_UPLOAD_DIR } from '../constants/index.js';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log('📂 TEMP_UPLOAD_DIR:', TEMP_UPLOAD_DIR);
    cb(null, TEMP_UPLOAD_DIR);
  },
  filename: function (req, file, cb) {
    console.log('📸 Uploading file:', file.originalname);
    const uniqueSuffix = Date.now();
    cb(null, `${uniqueSuffix}_${file.originalname}`);
  },
});

export const upload = multer({ storage });
