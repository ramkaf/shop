import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Set up storage with dynamic folder creation
const storage = (folderName: string) =>
  multer.diskStorage({
    destination: (req, file, cb) => {
      const folderPath = `./images/${folderName}`;
      
      // Check if the folder exists, if not, create it
      if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
      }

      cb(null, folderPath); // Save the file to the folder
    },
    filename: (req, file, cb) => {
      // Get the file extension
      const ext = path.extname(file.originalname);

      // Generate a filename using the original name and date to avoid collisions
      const filename = `${Date.now()}-${file.originalname.replace(/\s+/g, '_')}`;

      // Ensure that the file is saved with the original extension
      cb(null, `${filename}${ext}`);
    },
  });

const fileFilter = (req: Express.Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true); // Accept the file
  } else {
    cb(new Error('Invalid file type. Only JPEG, PNG, and GIF are allowed.')); // Reject the file
  }
};

// Function to initialize Multer with a dynamic folder
export const upload = (folderName: string) =>
  multer({
    storage: storage(folderName),
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5 MB
  });
