import express from 'express';
const router = express.Router();
import passport from 'passport';
import * as RouteFunctions from './route.controller';
import { S3 } from 'aws-sdk';
import multer from 'multer';
import multerS3 from 'multer-s3';

// AWS Setup
const s3 = new S3({
  endpoint: 'sfo2.digitaloceanspaces.com'
});

export const uploadQuestionImage = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'iqcdn1',
    acl: 'public-read',
    key: (request, file, cb) => {
      console.log(file);
      const date = '' + Date.now();
      const folderName = 'qcontent/';
      const fileName = date + Math.floor(Math.random() * 1000) + '.' + file.originalname.split('.').pop();
      cb(null, folderName + fileName);
    },
    contentType: (request, file, cb) => {
      const fileExtension = file.originalname.split('.').pop();
      cb(null, 'image/' + fileExtension);
    }
  })
}).array('upload', 1);

router.post('/question/img',
  uploadQuestionImage,
  passport.authenticate('jwt', {session: false}),
  (req, res, next) => {
    console.log(req.file);
    const file = req.file as any;
    const fileURL = 'https://cdn.inquantir.com/' + file['key'];
    console.log('File uploaded successfully.');
    return res.status(200).json({msg: 'File uploaded successfully!', fileURL: fileURL});
  }
);

const UploadRoutes = router;
export default UploadRoutes;
