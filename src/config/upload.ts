import path from 'path';
import crypto from 'crypto';
import multer, { StorageEngine } from 'multer';

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');

const rootFolder = path.resolve(__dirname, '..', '..');

interface UploadConfig {
  rootFolder: string;
  directory: string;
  storage: StorageEngine;
}

const uploadConfig: UploadConfig = {
  rootFolder: rootFolder,
  directory: tmpFolder,
  storage: multer.diskStorage({
    destination: tmpFolder,
    filename: (request, file, callback) => {
      const fileName = file.originalname.replace(/\s/g, '+');
      callback(null, fileName);
    },
  }),
};

export default uploadConfig;
