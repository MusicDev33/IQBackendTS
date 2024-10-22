import questionService from '@services/question.service';
import editLogService from '@services/editlog.service';
import userService from '@services/user.service';
import answerService from '@services/answer.service';
import voteService from '@services/vote.service';
import { Request, Response } from 'express';
import { Question } from '@models/question.model';
import { Answer } from '@models/answer.model';
import { EditLog } from '@models/editlog.model';
import { Vote } from '@models/vote.model';

export const addQuestionRoute = async (req: Request, res: Response) => {
  const newQuestion = new Question({
    answers: [],
    questionText: req.body.question,
    urlText: questionTextToURL(req.body.question),
    subject: req.body.subject,
    homeworkSource: req.body.source,
    asker: req.body.asker,
    askerID: req.body.askerID,
    askerHandle: req.body.askerHandle,
    votes: 1,
    views: 1,
    details: req.body.details ? req.body.details : '',
    time: req.body.time ? req.body.time : '',
    tags: req.body.tags ? req.body.tags : []
  });

  const savedQuestion = await questionService.addQuestion(newQuestion);
  if (savedQuestion) {
    const user = await userService.findOneUserByParameter('_id', req.body.askerID);
    const newEditLog = new EditLog({
      contentID: '' + savedQuestion._id,
      userID: req.body.askerID,
      userName: user.name,
      userHandle: user.handle,
      editType: 'question',
      paidContent: user.paidProgram
    });
    const savedEditLog = await editLogService.saveModel(newEditLog);
    if (!savedEditLog) {
      console.log('Edit Log for QuestionID ' + savedQuestion._id + ' could not be saved.');
    }
    return res.json({success: true, msg: 'Successfully added question'});
  } else {
    return res.json({success: false, msg: 'Could not add question...'});
  }
};

// UNFINISHED ROUTE - Probably doesn't quite work
export const addAnswerToQuestionRoute = async (req: Request, res: Response) => {
  const newAnswer = new Answer({
    questionURL: req.body.questionURL,
    answerText: req.body.answerText,
    votes: 0,
    views: 1,
    poster: req.body.poster,
    posterID: req.body.posterID,
    posterHandle: req.body.posterHandle,
    questionText: req.body.questionText,
    questionID: req.params.questionid,
    comments: [],
    time: 'null'
  });

  const shortAnswer: any = {
    answerText: req.body.answerText,
    poster: req.body.poster,
    posterID: req.body.posterID,
    posterHandle: req.body.posterHandle
  };

  const foundQuestion = await questionService.findOneQuestionByParameter('_id', req.params.questionid);
  const numAnswers = foundQuestion.answerNum;
  const savedAnswer = await answerService.saveModel(newAnswer);
  if (savedAnswer) {
    shortAnswer['_id'] = savedAnswer._id;
    foundQuestion.answerNum += 1;
    await questionService.saveQuestion(foundQuestion, 'answerNum');
    // If this is ever below 0 something is broken, but the backend still has to function correctly
    if (numAnswers <= 0) {
      foundQuestion.previewAnswer = shortAnswer;
      questionService.saveQuestion(foundQuestion, 'previewAnswer');
    }
    return res.json({success: true, msg: 'Answer most likely got saved!', answer: savedAnswer});
  }
  return res.json({success: false, msg: 'Answer wasn\'t saved, and it was our fault...'});
};

export const addVoteToAnswerRoute = async (req: Request, res: Response) => {
  const oldVote = await voteService.removeVote(req.params.answerid, req.params.userid);
  const newVote = new Vote({
    questionID: req.params.questionid,
    answerID: req.params.answerid,
    userID: req.params.userid,
    vote: req.body.vote
  });
  const savedVote = await voteService.saveModel(newVote);
  const answer = await answerService.findOneAnswerByParameter('_id', req.params.answerid);
  if (oldVote) {
    answer.votes -= oldVote.vote;
  }
  answer.votes += Number(req.body.vote);
  await answerService.saveAnswer(answer, 'votes');

  const answers = await answerService.findAnswersByParameter('questionID', req.params.questionid);
  const highestVotedAnswer = answers.reduce((prev, current) => {
    if (+current.votes > +prev.votes) {
      return current;
    } else {
      return prev;
    }
  });
  const shortAnswer = {
    _id: highestVotedAnswer._id,
    answerText: highestVotedAnswer.answerText,
    poster: highestVotedAnswer.poster,
    posterID: highestVotedAnswer.posterID,
    posterHandle: highestVotedAnswer.posterHandle
  };

  const question = await questionService.findOneQuestionByParameter('_id', req.params.questionid);
  if (question.previewAnswer._id !== highestVotedAnswer._id) {
    question.previewAnswer = shortAnswer;
    questionService.saveQuestion(question, 'previewAnswer');
  }
  if (savedVote) {
    return res.json({success: true, msg: 'Vote saved'});
  }

  return res.json({success: true, msg: 'I\'m not entirely sure if that vote saved...'});
};

export const editAnswerRoute = async (req: Request, res: Response) => {
  const answer = await answerService.findOneAnswerByParameter('_id', req.params.answerid);
  answer.answerText = req.body.newText;
  const answerDidSave = await answerService.saveAnswer(answer, 'answerText');

  const question = await questionService.findOneQuestionByParameter('_id', req.params.questionid);
  if (question.previewAnswer && answer._id.equals(question.previewAnswer._id)) {
    const newAnswer = question.previewAnswer;
    newAnswer.answerText = req.body.newText;
    question.previewAnswer = newAnswer;
    console.log(newAnswer);
    await questionService.saveQuestion(question, 'previewAnswer');
  }

  if (answerDidSave) {
    return res.json({success: true, answer: answerDidSave});
  }
  return res.json({success: false, msg: 'Could not save answer'});
};

const questionTextToURL = (text: string): string => {
  let urlText = '';
  const specialChars = "!@#$%^&*()>< '/\\";

  for (let i = 0; i < text.length; i++) {
    if (specialChars.indexOf(text[i]) > -1) {
      urlText += '-';
    } else if (text[i] === '?') {
      console.log('line 162, questions/creation.ts');
    } else {
      urlText += text[i];
    }
  }
  return urlText;
};
