import questionService from '@services/question.service';
import voteService from '@services/vote.service';
import { Request, Response } from 'express';

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

export const getUserVotesRoute = async (req: Request, res: Response) => {
  const foundVotes = await voteService.getAnswerVotesFromUser(req.params.questionid, req.params.userid);
  if (foundVotes) {
    return res.json({success: true, votes: foundVotes});
  }
  return res.json({success: false, msg: 'Could not get votes from QuestionID'});
}

export const getSitemapDataRoute = async (req: Request, res: Response) => {
  let urls = 'https://inquantir.com/\nhttps://inquantir.com/login\nhttps://inquantir.com/register\nhttps://inquantir.com/support\nhttps://inquantir.com/dashboard\n';
  const questions = await questionService.getAllQuestions();
  questions.forEach(question => {
    urls += 'https://inquantir.com/question/' + question.urlText + '\n';
  });
  return res.send(urls);
}
