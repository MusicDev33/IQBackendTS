import questionService from '@services/question.service';
import editLogService from '@services/editlog.service';
import userService from '@services/user.service';
import answerService from '@services/answer.service';
import { Request, Response } from 'express';
import { Question } from '@models/question.model';
import { Answer } from '@models/answer.model';
import { EditLog } from '@models/editlog.model';

export const addQuestionRoute = async (req: Request, res: Response) => {
  let newQuestion = new Question({
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
    details: '',
    time: '',
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
    const savedEditLog = await editLogService.addEditLog(newEditLog);
    if (!savedEditLog) {
      console.log('Edit Log for QuestionID ' + savedQuestion._id + ' could not be saved.');
    }
    return res.json({success: true, msg: 'Successfully added question'});
  } else {
    return res.json({success: false, msg: 'Could not add question...'});
  }
}

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
  }

  const foundQuestion = await questionService.findOneQuestionByParameter('_id', req.params.questionid);
  const numAnswers = foundQuestion.answerNum;
  const savedAnswer = await answerService.addAnswer(newAnswer);
  if (savedAnswer) {
    shortAnswer['_id'] = savedAnswer._id;
    foundQuestion.answerNum += 1;
    await questionService.saveQuestion(foundQuestion, 'answerNum');
    // If this is ever below 0 something is broken, but the backend still has to function correctly
    if (numAnswers <= 0) {
      foundQuestion.previewAnswer = shortAnswer;
      questionService.saveQuestion(foundQuestion, 'previewAnswer');
    }
    return res.json({success: true, msg: 'Answer most likely got saved!', answer: savedAnswer})
  }
  return res.json({success: false, msg: 'Answer wasn\'t saved, and it was our fault...'})
}

const questionTextToURL = (text: string): string => {
  let urlText = ""
  const specialChars = "!@#$%^&*()>< '/\\"

  for (let i = 0; i < text.length; i++) {
    if (specialChars.indexOf(text[i]) > -1){
      urlText += "-"
    } else if (text[i] == "?") {

    } else {
      urlText += text[i]
    }
  }
  return urlText
}
