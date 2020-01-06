import { EditLog, IEditLog } from '@models/editlog.model';

class EditLogService {
  private static instance: EditLogService;

  private constructor() {}

  public static getInstance(): EditLogService {
    if (!EditLogService.instance) {
      EditLogService.instance = new EditLogService();
    }

    return EditLogService.instance;
  }

  public async addEditLog(newEditLog: IEditLog): Promise<IEditLog> {
    try {
      const savedEditLog = await newEditLog.save();
      if (savedEditLog) {
        return savedEditLog;
      } else {
        return null;
      }
    } catch (err) {
      console.log(err);
      return null;
    }
  }
}

const editLogService = EditLogService.getInstance();
export default editLogService;
