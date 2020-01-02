import { JobApplication, IJobApplication } from '@models/jobapplication.model';

class JobApplicationService {
  private static instance: JobApplicationService;

  private constructor() {}

  static getInstance(): JobApplicationService {
    if (!JobApplicationService.instance) {
      JobApplicationService.instance = new JobApplicationService();
    }

    return JobApplicationService.instance;
  }

  public async addJobApplication(newJobApp: IJobApplication): Promise<IJobApplication> {
    try {
      const savedJobApp = await newJobApp.save();
      if (savedJobApp) {
        return savedJobApp;
      } else {
        return null;
      }
    } catch (err) {
      console.log(err);
      return null;
    }
  }
}

const jobApplicationService = JobApplicationService.getInstance();
export default jobApplicationService;
