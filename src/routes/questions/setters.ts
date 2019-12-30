import { Question } from '@models/question.model';
import questionService from '@services/question.service';
import { Request, Response } from 'express';

export const setQuestionPropertyRoute = async (req: Request, res: Response) => {
  // TODO: Figure out how the hell I'm supposed to type this
  const foundQuestion: any = await questionService.findOneQuestionByParameter('_id', req.params.questionid);
  if (foundQuestion) {
    foundQuestion[req.params.setparam] = req.body.paramValue;
    const savedQuestion = await questionService.saveQuestion(foundQuestion, req.params.setparam);

    // Ugh...more if statements...
    if (savedQuestion) {
      return res.json({success: true, msg: 'Successfully edited question!'})
    }
    return res.json({success: false, msg: 'Edited question. Could not save it. Call 911.'})
  }
  return res.json({success: false, msg: 'Could not edit question!'});
}
