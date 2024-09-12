import multer from 'multer';
import path from 'path';
import fs from 'fs';

const storage = (folderName: string) =>
  multer.diskStorage({
    destination: (req, file, cb) => {
      const folderPath = `./public/${folderName}`;
      if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
      }
      cb(null, folderPath); 
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname); // Get the extension
      const filename = `${Date.now()}-${path.basename(file.originalname, ext).replace(/\s+/g, '_')}`; // Remove extension before adding it again
      cb(null, `${filename}${ext}`); // Only add the extension once
    },
  });

  
const fileFilter = (req: Express.Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true); 
  } else {
    cb(new Error('Invalid file type. Only JPEG, PNG, and GIF are allowed.')); 
  }
};
export const upload = (folderName: string) =>
  multer({
    storage: storage(folderName),
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 }, 
  });
