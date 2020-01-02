import questionService from '@services/question.service';
import subjectService from '@services/subject.service';
import sourceService from '@services/source.service';
import { Request, Response } from 'express';

// This route isn't quite as performant as it could be
// export const getSubjectQuestionsRoute = async (req: Request, res: Response) => {
//   const subject = await subjectService.findOneSubjectByParameter('subjectURL', req.params.subjecturl);
//   const questions = await questionService.findQuestionsByParameter('subject', subject.name);
//   if (questions) {
//     return res.json({success: true, questions: questions});
//   }
//   return res.json({success: false, msg: 'Could not find questions by subject'});
// }

export const getAllSourcesRoute = async (req: Request, res: Response) => {
  const allSources = await sourceService.getAllSources();
  if (allSources) {
    return res.json({success: true, subjects: allSources});
  }
  return res.json({success: false, msg: 'Couldn\'t find any subjects'});
}
