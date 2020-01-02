import { Feedback, IFeedback } from '@models/feedback.model';

class FeedbackService {
  private static instance: FeedbackService;

  private constructor() {}

  static getInstance(): FeedbackService {
    if (!FeedbackService.instance) {
      FeedbackService.instance = new FeedbackService();
    }

    return FeedbackService.instance;
  }

  public async addFeedback(newFeedback: IFeedback): Promise<IFeedback> {
    try {
      const savedFeedback = await newFeedback.save();
      if (savedFeedback) {
        return savedFeedback;
      } else {
        return null;
      }
    } catch (err) {
      console.log(err);
      return null;
    }
  }
}

const feedbackService = FeedbackService.getInstance();
export default feedbackService;
