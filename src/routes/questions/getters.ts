import questionService from '@services/question.service';
import voteService from '@services/vote.service';
import answerService from '@services/answer.service';
import { Request, Response } from 'express';

export const getQuestionByParamRoute = async (req: Request, res: Response) => {
  const foundQuestion = await questionService.findOneQuestionByParameter(req.params.param, req.params.paramvalue);
  if (foundQuestion) {
    return res.json({success: true, question: foundQuestion});
  }
  return res.json({success: false});
};

export const getQuestionsByParamRoute = async (req: Request, res: Response) => {
  const foundQuestions = await questionService.findQuestionsByParameter(req.params.param, req.params.paramvalue, {_id: -1});
  if (foundQuestions) {
    return res.json({success: true, questions: foundQuestions});
  }
  return res.json({success: false});
};

export const getQuestionAnswers = async (req: Request, res: Response) => {
  const answers = await answerService.findAnswersByParameter('questionID', req.params.questionid, {votes: -1, _id: -1});
  if (answers) {
    return res.json({success: true, answers: answers});
  }
  return res.json({sucess: false, msg: 'Could not execute request to find answers...'});
};

export const getUserVotesRoute = async (req: Request, res: Response) => {
  const foundVotes = await voteService.getAnswerVotesFromUser(req.params.questionid, req.params.userid);
  if (foundVotes) {
    return res.json({success: true, votes: foundVotes});
  }
  return res.json({success: false, msg: 'Could not get votes from QuestionID'});
};

export const getHotQuestions = async (req: Request, res: Response) => {
  const hotQuestions = await questionService.getHotQuestions();
  if (hotQuestions) {
    return res.json({success: true, questions: hotQuestions});
  }
  return res.json({success: false, msg: 'Could not get trending questions...'});
};

export const getAllQuestions = async (req: Request, res: Response) => {
  const allQuestions = await questionService.getAllQuestions();
  if (allQuestions) {
    return res.json({success: true, questions: allQuestions});
  }
  return res.json({success: false, msg: 'Could not get all questions'});
};

export const getSitemapDataRoute = async (req: Request, res: Response) => {
  let urls = 'https://inquantir.com/\nhttps://inquantir.com/login\nhttps://inquantir.com/register\nhttps://inquantir.com/support\nhttps://inquantir.com/dashboard\n';
  const questions = await questionService.getAllQuestions();
  questions.forEach(question => {
    urls += 'https://inquantir.com/question/' + question.urlText + '\n';
  });
  return res.send(urls);
};
