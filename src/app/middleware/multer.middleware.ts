import multer from 'multer';
import ApiError from '../../errors/ApiError';
import httpStatus from 'http-status';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/temp');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

export const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.fieldname === 'cover' || file.fieldname === 'avatar') {
      if (
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg'
      ) {
        cb(null, true);
      } else {
        cb(
          new ApiError(
            httpStatus.BAD_REQUEST,
            'Only .jpg, .png or .jpeg format allowed!',
          ),
        );
      }
    } else if (file.fieldname === 'file' || file.fieldname === 'quickView') {
      if (
        file.mimetype === 'application/pdf' ||
        file.mimetype === 'application/epub+zip'
      ) {
        cb(null, true);
      } else {
        cb(
          new ApiError(
            httpStatus.BAD_REQUEST,
            'Only .pdf and .epub format is allowed!',
          ),
        );
      }
    } else {
      cb(new ApiError(httpStatus.BAD_REQUEST, 'There was an unknown error!'));
    }
  },
});
