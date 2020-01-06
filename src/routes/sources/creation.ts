import sourceService from '@services/source.service';
import { Request, Response } from 'express';
import { Source } from '@models/source.model';
import { nameToURL } from '@utils/string';

export const addSourceRoute = async (req: Request, res: Response): Promise<Response> => {
  if (!req.body.name.match(/^[a-zA-Z0-9\-' ]+$/g)) {
    return res.json({success: false, msg: 'Source names are alphanumeric (and may contain dashes and apostrophes)'});
  }

  const newSource = new Source({
    name: req.body.name,
    followers: 0,
    posterID: 'no ID',
    views: 0,
    sourceURL: nameToURL(req.body.name),
    tags: req.body.tags ? req.body.tags : [],
    edition: req.body.edition ? req.body.edition : '',
    author: req.body.author ? req.body.author : '',
    isbn: req.body.isbn ? req.body.isbn : ''
  });

  const savedSource = await sourceService.addSource(newSource);
  if (savedSource) {
    return res.json({success: true, source: savedSource});
  }
  return res.json({success: false, msg: 'Could not add source.'});
};
