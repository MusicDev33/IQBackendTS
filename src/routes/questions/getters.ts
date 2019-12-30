import questionService from '@services/question.service';
import editLogService from '@services/editlog.service';
import userService from '@services/user.service';
import { Request, Response } from 'express';
import { Question } from '@models/question.model';
import { EditLog } from '@models/editlog.model';

export const getQuestionByParamRoute = async (req: Request, res: Response) => {
  const foundQuestion = await questionService.findOneQuestionByParameter(req.params.param, req.params.paramvalue);
  if (foundQuestion) {
    return res.json({success: true, question: foundQuestion});
  }
  return res.json({success: false});
}

export const getQuestionsByParamRoute = async (req: Request, res: Response) => {
  const foundQuestions = await questionService.findQuestionsByParameter(req.params.param, req.params.paramvalue, {_id: -1});
  if (foundQuestions) {
    return res.json({success: true, questions: foundQuestions});
  }
  return res.json({success: false});
}
