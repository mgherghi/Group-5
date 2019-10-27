import { Router } from 'express';
import { getRepository, getManager } from 'typeorm';
import isAuthenticated from '../middleware/isAuthenticated';
import Question from '../entities/question';
import Topic from '../entities/topic';
import SubTopic from '../entities/subtopic';

const router = Router();
router.route('/questions')
  .all(isAuthenticated)
  .get((req, res) => {
    getRepository(Question).find({ where: { userId: req.user.id } }).then((questions) => {
      res.send(questions);
    });
  })
  .post((req, res) => {
    const { name, topic, subtopic } = req.body;
    getRepository(Topic).findOneOrFail(
      { where: { userId: req.user.id, name: topic } },
    ).then((_foundTopic) => {
      getRepository(SubTopic).findOneOrFail(
        { where: { topic: _foundTopic, name: subtopic } },
      ).then((_foundSubTopic) => {
        const manager = getManager();
        const question = manager.create(Question, { name });
        question.user = req.user;
        question.topic = _foundTopic;
        question.subtopic = _foundSubTopic;
        manager.save(question).then((savedQuestion) => {
          res.send(savedQuestion);
        });
      }, () => {
        res.send(404);
      });
    }, () => {
      res.send(404);
    });
  });

export default router;
