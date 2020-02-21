import { Question, IQuestion } from '@models/question.model';
import { User, IUser } from '@models/user.model';

class FeedService {
  private static instance: FeedService;

  private constructor() {}

  public static getInstance(): FeedService {
    if (!FeedService.instance) {
      FeedService.instance = new FeedService();
    }

    return FeedService.instance;
  }

  // This should probably be implemented in a way that uses the question and user services...
  public async getUserFeed(userID: string, limit: number = 30): Promise<IQuestion[]> {
    try {
      const user = await User.findById(userID).exec();
      let questions: IQuestion[];
      if (user.currentSubjects.length) {
        questions = await Question.find({subject: {$in: user.currentSubjects}}).sort({_id: -1}).limit(limit).exec();
        return questions;
      }
      questions = await Question.find({}).sort({_id: -1}).limit(limit).exec();
      return questions;
    } catch (err) {
      console.log(err);
      return null;
    }
  }
}

const feedService = FeedService.getInstance();
export default feedService;
