/**
 * MIDDLEWARE FOR CREATE FILE
 * _> file create in "PATH_STORAGE"
 * _> name single file is "file"
 */

import multer, { diskStorage } from 'multer';

const PATH_STORAGE = `${process.cwd()}/storage`;

const storage = diskStorage({
    destination(req, file, cb) {
        cb(null, PATH_STORAGE);
    },
    filename(req, file, cb) {
        const ext = file.originalname.split('.').pop();
        const fileDateName = `file-${Date.now()}.${ext}`;
        cb(null, fileDateName);
    }
});

const multerMiddleware = multer({ storage });

export default multerMiddleware
