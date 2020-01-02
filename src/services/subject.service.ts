import { Subject, ISubject } from '@models/subject.model';

class SubjectService {
  private static instance: SubjectService;

  private constructor() {}

  static getInstance(): SubjectService {
    if (!SubjectService.instance) {
      SubjectService.instance = new SubjectService();
    }

    return SubjectService.instance;
  }

  public async findOneSubjectByParameter(param: string, paramValue: string): Promise<ISubject> {
    try {
      let query: any = {};
      query[param] = paramValue;
      let foundSubject = await Subject.findOne(query).exec();
      return foundSubject;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  public async getAllSubjects(): Promise<ISubject[]> {
    try {
      const foundSubjects = await Subject.find().exec();
      return foundSubjects;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  public async addSubject(newSubject: ISubject): Promise<ISubject> {
    try {
      const savedSubject = await newSubject.save();
      return savedSubject;
    } catch (err) {
      console.log(err);
      return null;
    }
  }
}

const subjectService = SubjectService.getInstance();
export default subjectService;
