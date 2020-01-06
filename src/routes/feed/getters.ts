import feedService from '@services/feed.service';
import { Request, Response } from 'express';

export const getUserFeedRoute = async (req: Request, res: Response) => {
  const questions = await feedService.getUserFeed(req.params.userid);
  if (questions) {
    return res.status(200).json({success: true, feed: questions});
  }
  return res.status(404).json({success: false, msg: 'Could not return feed'});
};
