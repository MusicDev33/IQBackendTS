import { Document } from 'mongoose';

interface IEntityService<P extends Document> {
  saveModel(newModel: P, changedParam: string): Promise<P>;
}

export default IEntityService;
