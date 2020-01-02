import questionService from '@services/question.service';
import voteService from '@services/vote.service';
import answerService from '@services/answer.service';
import { Request, Response } from 'express';

export const deleteAnswerRoute = async (req: Request, res: Response) => {
  const question = await questionService.findOneQuestionByParameter('_id', req.params.questionid);
  const removedAnswer = await answerService.removeAnswer(req.params.answerid);

  if (removedAnswer) {
    question.answerNum -= 1;
    await questionService.saveQuestion(question, 'answerNum');
    await voteService.removeVotes(req.params.answerid);
    return res.json({success: true, msg: 'Answer deleted.', answer: removedAnswer});
  }
  return res.json({success: false, msg: 'Could not remove answer. Contact the site owner at 208-631-0704 and tell him he\'s doing a bad job.'})
}
