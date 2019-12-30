import { Answer, IAnswer } from '@models/answer.model';

class AnswerService {
  private static instance: AnswerService;

  private constructor() {}

  static getInstance(): AnswerService {
    if (!AnswerService.instance) {
      AnswerService.instance = new AnswerService();
    }

    return AnswerService.instance;
  }

  public async addAnswer(newAnswer: IAnswer): Promise<IAnswer> {
    try {
      const savedAnswer = await newAnswer.save();
      return savedAnswer;
    } catch (err) {
      console.log(err);
      return null;
    }
  }
}

const answerService = AnswerService.getInstance();
export default answerService;
