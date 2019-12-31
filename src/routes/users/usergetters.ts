import userService from '@services/user.service';
import questionService from '@services/question.service';
import answerService from '@services/answer.service';
import { Request, Response } from 'express';

export const getUserByParamRoute = async (req: Request, res: Response) => {
  const foundUser = await userService.findOneUserByParameter(req.params.qparam, req.params.paramvalue);
  if (foundUser) {
    foundUser.password = '';
    return res.json({success: true, user: foundUser});
  }
  return res.json({success: false, msg: 'Could not find user'});
}

export const publicGetUserByHandleRoute = async (req: Request, res: Response) => {
  const foundUser = await userService.findOneUserByParameter('handle', req.params.userhandle);
  if (foundUser) {
    foundUser.password = '';
    foundUser.email = '';
    foundUser.paidProgram = false;
    foundUser.currentSources = [];
    foundUser.currentSubjects = [];
    foundUser.phoneNumber = '';
    foundUser.fbTokens = [];
    foundUser.googleID = '';
    return res.json({success: true, user: foundUser});
  }
  return res.json({success: false, msg: 'Could not find user'});
}

export const getUserAnswersRoute = async (req: Request, res: Response) => {
  const userAnswers = await answerService.findAnswersByParameter('posterID', req.params.userid);
  if (userAnswers) {
    return res.json({success: true, answers: userAnswers});
  }
  return res.json({success: false, msg: 'Could not find answers...'})
}

export const getUserQuestionsRoute = async (req: Request, res: Response) => {
  const foundQuestions = await questionService.findQuestionsByParameter('askerID', req.params.userid, {_id: -1});
  if (foundQuestions) {
    return res.json({success: true, questions: foundQuestions});
  }
  return res.json({success: false, msg: 'Could not find questions by User ID'});
}
