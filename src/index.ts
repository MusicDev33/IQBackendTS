require('tsconfig-paths/register');
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import fs from 'fs';
import helmet from 'helmet';
import https from 'https';
import mongoose from 'mongoose';
import passport from 'passport';
import path from 'path';
import { S3 } from 'aws-sdk';
import multer from 'multer';
import multerS3 from 'multer-s3';

import { dbConfig } from '@config/database';
import { userPassportAuth } from '@config/passport';
import { UserRoutes, QuestionRoutes, SubjectRoutes, SourceRoutes, FeedRoutes, FeedbackRoutes, SearchRoutes, UploadRoutes } from './config/routeDefs';
import { port, apiBase, acceptedAgents } from './config/constants';

import { Request, Response } from 'express';
dotenv.config();

// End of imports and dotenv

let credentials: any;

if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'DEVTEST') {
  const privateKey  = fs.readFileSync('/etc/letsencrypt/live/inquantir.com/privkey.pem', 'utf8');
  const certificate = fs.readFileSync('/etc/letsencrypt/live/inquantir.com/cert.pem', 'utf8');

  credentials = {key: privateKey, cert: certificate};
}

mongoose.connect(dbConfig.database, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

mongoose.connection.on('connected', () => {
  console.log('Database Connected: ' + dbConfig.database);
});

mongoose.connection.on('error', (err: any) => {
  console.log('Database Error: ' + err);
});

// Create Express instance
const app = express();

app.use(helmet());
app.disable('x-powered-by');
app.set('trust proxy', 1);

// Allows other domains to use this domain as an API
app.use(cors());

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

userPassportAuth(passport);

// Check IQ-User-Agent
const checkAgent = (req: Request, res: Response, next: any) => {
  if (acceptedAgents.indexOf(req.header('IQ-User-Agent')) <= -1) {
    res.sendStatus(404);
  } else {
    next();
  }
};

app.use(checkAgent);

// Routes
app.use(apiBase + 'users', UserRoutes);
app.use(apiBase + 'questions', QuestionRoutes);
app.use(apiBase + 'subjects', SubjectRoutes);
app.use(apiBase + 'sources', SourceRoutes);
app.use(apiBase + 'feed', FeedRoutes);
app.use(apiBase + 'feedback', FeedbackRoutes);
app.use(apiBase + 'search', SearchRoutes);
// app.use(apiBase + 'upload', UploadRoutes);

// AWS Setup
const s3 = new S3({
  endpoint: 'sfo2.digitaloceanspaces.com'
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'iqcdn1',
    acl: 'public-read',
    key: (request, file, cb) => {
      console.log(file);
      const date = '' + Date.now();
      const folderName = 'test/';
      const fileName = date + Math.floor(Math.random() * 1000) + '.' + file.originalname.split('.').pop();
      cb(null, folderName + fileName);
    },
    contentType: (request, file, cb) => {
      const fileExtension = file.originalname.split('.').pop();
      cb(null, 'image/' + fileExtension);
    }
  })
}).single('upload');

// create public folder with the index.html when finished
app.use(express.static(path.join(__dirname, 'public')));

app.get(apiBase + '/', (req, res) => {
  res.status(404).send('404 Error');
});

app.post(apiBase + 'upload/question/img', upload, passport.authenticate('jwt', {session: false}), (req, res, next) => {
  console.log(req.file);
  const file = req.file as any;
  const fileURL = 'https://cdn.inquantir.com/' + file['key'];
  console.log(file['key']);
  console.log('File uploaded successfully.');
  return res.status(200).json({msg: 'File uploaded successfully!', fileURL: fileURL});
});

if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'DEVTEST') {
  const httpsServer = https.createServer(credentials, app);
}

app.listen(port, () => {
  console.log('\nInquantir Backend (TypeScript) started in mode \'' + process.env.NODE_ENV + '\'');
  console.log('Port: ' + port);
});
