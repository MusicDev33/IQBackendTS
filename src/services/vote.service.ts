import { Vote, IVote } from '@models/vote.model';
import { EntityService } from '@classes/EntityService';

class VoteService extends EntityService<IVote> {
  private static instance: VoteService;

  private constructor() {
    super();
  }

  public static getInstance(): VoteService {
    if (!VoteService.instance) {
      VoteService.instance = new VoteService();
    }

    return VoteService.instance;
  }

  public async addVote(newVote: IVote): Promise<IVote> {
    try {
      let savedVote = await newVote.save();
      return savedVote;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  public async removeVote(answerID: string, userID: string): Promise<IVote> {
    try {
      const removedVote = await Vote.findOneAndRemove({answerID: answerID, userID: userID});
      return removedVote;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  public async removeVotes(answerID: string): Promise<number> {
    try {
      const removedVotes = await Vote.deleteMany({answerID: answerID});
      if (removedVotes.deletedCount) {
        return removedVotes.deletedCount;
      }
      return 0;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  public async getAnswerVotesFromUser(questionID: string, userID: string): Promise<IVote[]> {
    try {
      const votes = await Vote.find({questionID: questionID, userID: userID});
      if (votes.length) {
        return votes;
      }
      return null;
    } catch (err) {
      console.log(err);
      return null;
    }
  }
}

const voteService = VoteService.getInstance();
export default voteService;
