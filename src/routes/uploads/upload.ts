import { Request, Response } from 'express';

export const uploadQuestionRoute = async (req: Request, res: Response) => {
  /*
  if (req.file) {
    console.log(req.file);
    const file = req.file as any;
    const fileURL = 'https://cdn.inquantir.com/' + file['key'];
    console.log('File uploaded successfully.');
    return res.status(200).json({msg: 'File uploaded successfully!', fileURL: fileURL});
  } else {
    return res.status(500).json({msg: 'Something went wrong...'});
  }*/
  console.log(req.file);
  const file = req.file as any;
  const fileURL = 'https://cdn.inquantir.com/' + file['key'];
  console.log('File uploaded successfully.');
  return res.status(200).json({msg: 'File uploaded successfully!', fileURL: fileURL});
};
