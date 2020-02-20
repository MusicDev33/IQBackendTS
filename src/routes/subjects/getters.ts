import questionService from '@services/question.service';
import subjectService from '@services/subject.service';
import { Request, Response } from 'express';

// This route isn't quite as performant as it could be
export const getSubjectQuestionsRoute = async (req: Request, res: Response) => {
  const subject = await subjectService.findOneSubjectByParameter('subjectURL', req.params.subjecturl);
  const questions = await questionService.findQuestionsByParameter('subject', subject.name, {_id: -1});
  if (questions) {
    return res.json({success: true, questions: questions});
  }
  return res.json({success: false, msg: 'Could not find questions by subject'});
};

export const getAllSubjectsRoute = async (req: Request, res: Response) => {
  const allSubjects = await subjectService.getAllSubjects();
  if (allSubjects) {
    return res.json({success: true, subjects: allSubjects});
  }
  return res.json({success: false, msg: 'Couldn\'t find any subjects'});
};

export const getSubjectRoute = async (req: Request, res: Response) => {
  const subject = await subjectService.findOneSubjectByParameter('subjectURL', req.params.subjecturl);
  if (subject) {
    return res.json({success: true, subject: subject});
  }
  return res.json({sucess: false, msg: 'Could not get subject by URL...'});
};
