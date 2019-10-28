import { Router } from 'express';
import { getRepository, getManager } from 'typeorm';
import isAuthenticated from '../middleware/isAuthenticated';
import Question from '../entities/question';
import Answer from '../entities/answer';
import Topic from '../entities/topic';
import SubTopic from '../entities/subtopic';

function deleteQuestion(question) {
  getRepository(Answer).findOneOrFail(
    { where: { id: question.answer.id } },
  ).then((_foundAnswer) => {
    getManager().delete(Answer, _foundAnswer.id);
  });

  getManager().delete(Question, question.id);
}

function deleteQuestions(questions) {
  for (const question of questions) {
    deleteQuestion(question);
  }
}

const router = Router();
router.route('/questions')
  .all(isAuthenticated)
  .get((req, res) => {
    getRepository(Question).find({ where: { userId: req.user.id }, relations: ['answer', 'topic', 'subtopic'] }).then((questions) => {
      res.send(questions);
    });
  })
  .post((req, res) => {
    const {
      content, data, topic, subtopic,
    } = req.body;
    getRepository(Topic).findOneOrFail(
      { where: { userId: req.user.id, name: topic } },
    ).then((_foundTopic) => {
      getRepository(SubTopic).findOneOrFail(
        { where: { topic: _foundTopic, name: subtopic } },
      ).then((_foundSubTopic) => {
        const manager = getManager();
        const answer = manager.create(Answer, { data });
        const question = manager.create(Question, { content });

        question.user = req.user;
        question.answer = answer;
        question.topic = _foundTopic;
        question.subtopic = _foundSubTopic;

        manager.save(answer).then(() => {
          manager.save(question).then((savedQuestion) => {
            res.send(savedQuestion);
          });
        });
      }, () => {
        res.sendStatus(404);
      });
    }, () => {
      res.sendStatus(404);
    });
  })
  .delete((req, res) => {
    getRepository(Question).find(
      { where: { userId: req.user.id }, relations: ['answer', 'topic', 'subtopic'] },
    ).then((questions) => {
      deleteQuestions(questions);
      res.sendStatus(200);
    });
  });

router.route('/questions/:id')
  .all(isAuthenticated)
  .all((req, res, next) => {
    getRepository(Question).findOneOrFail(
      { where: { userId: req.user.id, id: req.params.id }, relations: ['answer', 'topic', 'subtopic'] },
    ).then((_foundQuestion) => {
      req.question = _foundQuestion;
      next();
    }, () => {
      res.sendStatus(404);
    });
  })
  .get((req, res) => {
    res.send(req.question);
  })
  .put((req, res) => {
    const foundQuestion = req.question;
    const { content } = req.body;
    foundQuestion.content = content;

    getManager().save(foundQuestion).then((updatedQuestion) => {
      res.send(updatedQuestion);
    });
  })
  .delete((req, res) => {
    deleteQuestion(req.question);
    res.sendStatus(200);
  });

export default router;
