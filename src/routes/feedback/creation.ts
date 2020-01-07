import feedbackService from '@services/feedback.service';
import { Feedback } from '@models/feedback.model';
import { Request, Response } from 'express';

export const addFeedbackRoute = async (req: Request, res: Response) => {
  const newFeedback = new Feedback({
    feedback: req.body.feedback,
    userHandle: req.body.userHandle,
    userName: req.body.userName,
    type: req.body.type
  });

  const savedFeedback = await feedbackService.saveModel(newFeedback);
  if (savedFeedback) {
    return res.status(200).json({success: true, msg: 'Thanks for your feedback!'});
  }
  return res.status(500).json({success: false, msg: 'Could not send feedback, and it\'s totally our fault...'});
};
