import questionService from '@services/question.service';
import userService from '@services/user.service';
import sourceService from '@services/source.service';
import subjectService from '@services/subject.service';
import { Request, Response } from 'express';

export const globalSearchRoute = async (req: Request, res: Response) => {
  const searchTerm = req.params.searchterm.replace(/[-]+/, ' ');

  const questions = await questionService.searchQuestionsByParam('questionText', searchTerm, 5);
  const sources = await sourceService.searchSourceByParam('name', searchTerm, 5);
  const subjects = await subjectService.searchSubjectByParam('name', searchTerm, 5);
  const users = await userService.searchUserByParam('name', searchTerm, 5);

  return res.status(200).json({success: true, users: users, questions: questions, subjects: subjects, sources: sources});
};

export const searchSourcesRoute = async (req: Request, res: Response) => {
  const searchTerm = req.params.searchterm.replace(/[-]+/, ' ');
  const sources = await sourceService.searchSourceByParam('name', searchTerm);

  res.status(200).json({success: true, sources: sources});
};

export const searchSubjectsRoute = async (req: Request, res: Response) => {
  const searchTerm = req.params.searchterm.replace(/[-]+/, ' ');
  const subjects = await subjectService.searchSubjectByParam('name', searchTerm);

  res.status(200).json({success: true, subjects: subjects});
};
