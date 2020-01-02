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
}

const sourceService = SourceService.getInstance();
export default sourceService;
