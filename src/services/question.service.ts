import { Question, IQuestion } from '@models/question.model';

class QuestionService {
  private static instance: QuestionService;

  private constructor() {}

  static getInstance(): QuestionService {
    if (!QuestionService.instance) {
      QuestionService.instance = new QuestionService();
    }

    return QuestionService.instance;
  }

  public async getAllQuestions(): Promise<IQuestion[]> {
    try {
      const questions = await Question.find();
      return questions;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  public async addQuestion(newQuestion: IQuestion): Promise<IQuestion> {
    try {
      let savedQuestion = await newQuestion.save();
      return savedQuestion;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  public async findOneQuestionByParameter(param: string, paramValue: string): Promise<IQuestion> {
    try {
      let query: any = {};
      query[param] = paramValue;
      let foundQuestion = await Question.findOne(query).exec();
      return foundQuestion;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  public async findQuestionsByParameter(param: string, paramValue: string, sort: any = {_id: 1}): Promise<IQuestion[]> {
    try {
      let query: any = {};
      query[param] = paramValue;
      let foundQuestions = await Question.find(query).sort(sort).exec();
      if (foundQuestions.length) {
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
      return 'Error - Insert error code here'
    }
  }
}

const questionService = QuestionService.getInstance();
export default questionService;
