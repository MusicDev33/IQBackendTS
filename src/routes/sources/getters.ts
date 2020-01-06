import questionService from '@services/question.service';
import sourceService from '@services/source.service';
import { Request, Response } from 'express';

export const getAllSourcesRoute = async (req: Request, res: Response) => {
  const allSources = await sourceService.getAllSources();
  if (allSources) {
    return res.json({success: true, subjects: allSources});
  }
  return res.json({success: false, msg: 'Couldn\'t find any subjects'});
};

export const getQuestionsFromSourceRoute = async (req: Request, res: Response) => {
  const source = await sourceService.findOneSourceByParameter('_id', req.params.sourceid);
  const questions = await questionService.findQuestionsByParameter('homeworkSource', source.name);

  if (questions) {
    return res.json({success: true, questions: questions});
  }
  return res.json({success: false, msg: 'Could not find questions from source...'});
};

export const getSourceByURLRoute = async (req: Request, res: Response) => {
  const source = await sourceService.findOneSourceByParameter('sourceURL', req.params.sourceurl);
  if (source) {
    return res.json({success: true, source: source});
  }
  return res.json({success: false, msg: 'Couldn\'t find source by url...'});
};
