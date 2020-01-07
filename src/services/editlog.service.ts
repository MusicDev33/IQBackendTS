import { EditLog, IEditLog } from '@models/editlog.model';
import { EntityService } from '@classes/EntityService';

class EditLogService extends EntityService<IEditLog> {
  private static instance: EditLogService;

  private constructor() {
    super();
  }

  public static getInstance(): EditLogService {
    if (!EditLogService.instance) {
      EditLogService.instance = new EditLogService();
    }

    return EditLogService.instance;
  }
}

const editLogService = EditLogService.getInstance();
export default editLogService;
