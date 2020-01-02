import { Source, ISource } from '@models/source.model';

class SourceService {
  private static instance: SourceService;

  private constructor() {}

  static getInstance(): SourceService {
    if (!SourceService.instance) {
      SourceService.instance = new SourceService();
    }

    return SourceService.instance;
  }

  public async addSource(newSource: ISource): Promise<ISource> {
    try {
      const savedSource = await newSource.save();
      if (savedSource) {
        return savedSource;
      } else {
        return null;
      }
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  public async getAllSources(): Promise<ISource[]> {
    try {
      const allSources = await Source.find().exec();
      return allSources;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  public async searchSourceByParam(param: string, paramValue: string): Promise<ISource[]> {
    try {
      const regexp = '^' + paramValue;
      let query: any = {};
      query[param] = {$regex: regexp, $options: 'i'}
      const sources = Source.find(query).lean().exec();
      return sources;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  public async findOneSourceByParameter(param: string, paramValue: string): Promise<ISource> {
    try {
      let query: any = {};
      query[param] = paramValue;
      let foundSource = await Source.findOne(query).exec();
      return foundSource;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  public async findSourcesByParameter(param: string, paramValue: string, sort: any = {_id: 1}): Promise<ISource[]> {
    try {
      let query: any = {};
      query[param] = paramValue;
      let foundSources = await Source.find(query).sort(sort).exec();
      return foundSources
    } catch (err) {
      console.log(err);
      return null;
    }
  }
}

const sourceService = SourceService.getInstance();
export default sourceService;
