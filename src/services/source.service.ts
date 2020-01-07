import { Source, ISource } from '@models/source.model';
import { EntityService } from '@classes/EntityService';

class SourceService extends EntityService<ISource> {
  private static instance: SourceService;

  private constructor() {
    super();
  }

  public static getInstance(): SourceService {
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
      const query: any = {};
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
      const query: any = {};
      query[param] = paramValue;
      const foundSource = await Source.findOne(query).exec();
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

  public async saveSource(modifiedSource: ISource, changedParam: string): Promise<string> {
    modifiedSource.markModified(changedParam);
    try {
      const savedSource = await modifiedSource.save();
      if (savedSource) {
        return 'Successfully changed parameter \'' + changedParam + '\'';
      } else {
        return 'Couldn\'t change param \'' + changedParam + '\' and it\'s totally our fault. Try again?';
      }
    } catch (err) {
      console.log(err);
      return 'Error - Insert error code here';
    }
  }
}

const sourceService = SourceService.getInstance();
export default sourceService;
