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

  public async saveAnswer(changedAnswer: IAnswer, changedParam: string): Promise<string> {
    changedAnswer.markModified(changedParam);
    try {
      const savedAnswer = await changedAnswer.save();
      if (savedAnswer) {
        return 'Successfully changed parameter \'' + changedParam + '\'';
      } else {
        return 'Couldn\'t change param \'' + changedParam + '\' and it\'s totally our fault. Try again?';
      }
    } catch (err) {
      console.log(err);
      return 'Error - Insert error code here'
    }
  }

  public async findOneAnswerByParameter(param: string, paramValue: string): Promise<IAnswer> {
    try {
      let query: any = {};
      query[param] = paramValue;
      let foundAnswer = await Answer.findOne(query).exec();
      return foundAnswer;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  public async findAnswersByParameter(param: string, paramValue: string, sort: any = {_id: 1}): Promise<IAnswer[]> {
    try {
      let query: any = {};
      query[param] = paramValue;
      let foundAnswers = await Answer.find(query).sort(sort).exec();
      return foundAnswers;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  public async removeAnswer(answerID: string): Promise<IAnswer> {
    try {
      const removedAnswer = await Answer.findByIdAndRemove(answerID);
      return removedAnswer;
    } catch (err) {
      console.log(err);
      return null;
    }
  }
}

const answerService = AnswerService.getInstance();
export default answerService;
