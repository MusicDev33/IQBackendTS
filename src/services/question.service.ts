import { Question, IQuestion } from '@models/question.model';
import { EntityService } from '@classes/EntityService';

class QuestionService extends EntityService<IQuestion> {
  private static instance: QuestionService;

  private constructor() {
    super();
  }

  public static getInstance(): QuestionService {
    if (!QuestionService.instance) {
      QuestionService.instance = new QuestionService();
    }

    return QuestionService.instance;
  }

  public async getAllQuestions(): Promise<IQuestion[]> {
    try {
      const questions = await Question.find().sort({_id: -1});
      return questions;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  public async addQuestion(newQuestion: IQuestion): Promise<IQuestion> {
    try {
      const savedQuestion = await newQuestion.save();
      return savedQuestion;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  public async findOneQuestionByParameter(param: string, paramValue: string): Promise<IQuestion> {
    try {
      const query: any = {};
      query[param] = paramValue;
      const foundQuestion = await Question.findOne(query).exec();
      return foundQuestion;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  public async findQuestionsByParameter(param: string, paramValue: string, sort: any = {_id: 1}): Promise<IQuestion[]> {
    try {
      const query: any = {};
      query[param] = paramValue;
      const foundQuestions = await Question.find(query).sort(sort).exec();
      if (foundQuestions) {
        return foundQuestions;
      }
      return null;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  public async saveQuestion(changedQuestion: IQuestion, changedParam: string): Promise<string> {
    changedQuestion.markModified(changedParam);
    try {
      const savedQuestion = await changedQuestion.save();
      if (savedQuestion) {
        return 'Successfully changed parameter \'' + changedParam + '\'';
      } else {
        return 'Couldn\'t change param \'' + changedParam + '\' and it\'s totally our fault. Try again?';
      }
    } catch (err) {
      console.log(err);
      return 'Error - Insert error code here';
    }
  }

  public async searchQuestionsByParam(param: string, paramValue: string): Promise<IQuestion[]> {
    try {
      const regexp = '^' + paramValue;
      const query: any = {};
      query[param] = {$regex: regexp, $options: 'i'};
      const questions = Question.find(query).lean().exec();
      return questions;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  public async getHotQuestions(): Promise<IQuestion[]> {
    try {
      const hotQuestions = Question.find().sort({'previewAnswer.votes': 1}).limit(4).exec();
      return hotQuestions;
    } catch (err) {
      console.log(err);
      return null;
    }
  }
}

const questionService = QuestionService.getInstance();
export default questionService;
