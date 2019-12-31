import { Vote, IVote } from '@models/vote.model';

class VoteService {
  private static instance: VoteService;

  private constructor() {}

  static getInstance(): VoteService {
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
