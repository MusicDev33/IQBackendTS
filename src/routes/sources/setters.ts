import questionService from '@services/question.service';
import sourceService from '@services/source.service';
import { urlToName } from '@utils/string';
import { Request, Response } from 'express';

export const addTagRoute = async (req: Request, res: Response): Promise<Response> => {
  if (!req.params.tagname.match(/^[a-zA-Z0-9_\-]+$/g)) {
    return res.json({success: false, msg: 'Tags must be alphanumeric, but can also have dashes'})
  }

  const tag = urlToName(req.params.tagname);
  const source = await sourceService.findOneSourceByParameter('_id', req.params.sourceid);

  if (source.tags.indexOf(tag) > -1) {
    return res.status(304).json({success: false, msg: 'Source already includes tag!'})
  }
  source.tags.push(tag);
  const savedSource = await sourceService.saveSource(source, 'tags');
  if (savedSource) {
    return res.status(200).json({success: true, source: savedSource});
  }
  return res.status(500).json({success: false, msg: 'Could not add tag...'});
}

export const deleteTagRoute = async (req: Request, res: Response) => {
  const deleteTag = urlToName(req.params.tagname);
  const source = await sourceService.findOneSourceByParameter('_id', req.params.sourceid);

  source.tags = source.tags.filter(tag => tag !== deleteTag);
  const savedSource = await sourceService.saveSource(source, 'tags');

  if (savedSource) {
    res.status(200).json({success: true, source: savedSource});
  }
  res.status(500).json({success: false, msg: 'Could not edit source tags'});
}
