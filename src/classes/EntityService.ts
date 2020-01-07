import IEntityService from '@interfaces/IEntityService';
import { Document } from 'mongoose';

export class EntityService<P extends Document> implements IEntityService<P> {
  public async saveModel(newModel: P): Promise<P> {
    try {
      const savedModel = await newModel.save();
      return savedModel;
    } catch (err) {
      console.log(err);
      return null;
    }
  }
}
