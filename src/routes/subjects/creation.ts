import subjectService from '@services/subject.service';
import { Request, Response } from 'express';
import { Subject } from '@models/subject.model';
import { subjectNameToURL } from '@utils/string';

export const createSubjectRoute = async (req: Request, res: Response) => {
  if (req.params.subjectname.length < 3) {
    return res.json({success: false, msg: 'Subject name is too short'});
  }

  if (!req.params.subjectname.match(/^[a-zA-Z0-9\-']+$/g)) {
    return res.json({success: false, msg: 'Subject names are alphanumeric (and may contain dashes and apostrophes)'});
  }

  // Still not sure what the cutoff should be
  if (req.params.subjectname.length > 35) {
    return res.json({success: false, msg: 'Subject name is too long'});
  }

  let subjectName = req.params.subjectname.trim().toLowerCase().replace(/\b(\w)/g, s => s.toUpperCase());
  subjectName = subjectName.replace(/-/g, ' ');
  const subjectURL = subjectNameToURL(subjectName);

  const newSubject = new Subject({
    name: subjectName,
    followers: 0,
    subjectURL: subjectURL,
    views: 0
  });

  const savedSubject = await subjectService.addSubject(newSubject);
  if (savedSubject) {
    return res.json({success: true, subject: savedSubject});
  }
  return res.json({success: false, msg: 'Could not add subject'});
};
