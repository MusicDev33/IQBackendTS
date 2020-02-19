import express from 'express';
const router = express.Router();
import passport from 'passport';
import * as RouteFunctions from './route.controller';

router.post('/question/img',
  RouteFunctions.uploadQuestionImage,
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
