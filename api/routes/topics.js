import { Router } from 'express';
import { getRepository, getManager } from 'typeorm';
import isAuthenticated from '../middleware/isAuthenticated';
import Topic from '../entities/topic';
import SubTopic from '../entities/subtopic';

function deleteSubTopics(subtopics) {
  for (const subtopic of subtopics) {
    getManager().delete(SubTopic, subtopic.id);
  }
}

function deleteTopics(topics) {
  for (const topic of topics) {
    getRepository(SubTopic).find(
      { where: { topic } },
    ).then((subtopics) => {
      deleteSubTopics(subtopics);
    });
    getManager().delete(Topic, topic.id);
  }
}

const router = Router();
router.route('/topics')
  .all(isAuthenticated)
  .get((req, res) => {
    getRepository(Topic).find({ where: { userId: req.user.id } }).then((topics) => {
      res.send(topics);
    });
  })
  .post((req, res) => {
    const { name } = req.body;
    const manager = getManager();
    const topic = manager.create(Topic, { name });
    topic.user = req.user;
    manager.save(topic).then((savedTopic) => {
      res.send(savedTopic);
    }, {});
  })
  .delete((req, res) => {
    getRepository(Topic).find(
      { where: { userId: req.user.id } },
    ).then((topics) => {
      deleteTopics(topics);
      res.sendStatus(200);
    });
  });

router.route('/topics/:id')
  .all(isAuthenticated)
  .all((req, res, next) => {
    getRepository(Topic).findOneOrFail(
      { where: { userId: req.user.id, id: req.params.id } },
    ).then((_foundTopic) => {
      req.topic = _foundTopic;
      next();
    }, () => {
      res.sendStatus(404);
    });
  })
  .get((req, res) => {
    res.send(req.topic);
  })
  .put((req, res) => {
    const foundTopic = req.topic;
    const { name } = req.body;
    foundTopic.name = name;

    getManager().save(foundTopic).then((updatedTopic) => {
      res.send(updatedTopic);
    });
  })
  .delete((req, res) => {
    getRepository(SubTopic).find(
      { where: { topic: req.topic } },
    ).then((subtopics) => {
      deleteSubTopics(subtopics);
    });

    getManager().delete(Topic, req.topic.id).then(() => {
      res.sendStatus(200);
    });
  });

router.route('/topics/:id/subtopics')
  .all(isAuthenticated)
  .all((req, res, next) => {
    getRepository(Topic).findOneOrFail(
      { where: { userId: req.user.id, id: req.params.id } },
    ).then((_foundTopic) => {
      req.topic = _foundTopic;
      next();
    }, () => {
      res.sendStatus(404);
    });
  })
  .get((req, res) => {
    getRepository(SubTopic).find(
      { where: { topic: req.topic } },
    ).then((subtopics) => {
      res.send(subtopics);
    });
  })
  .post((req, res) => {
    const foundTopic = req.topic;
    const { name } = req.body;
    const manager = getManager();
    const subtopic = manager.create(SubTopic, { name });
    subtopic.topic = foundTopic;
    manager.save(subtopic).then((savedSubTopic) => {
      res.send(savedSubTopic);
    });
  })
  .delete((req, res) => {
    getRepository(SubTopic).find(
      { where: { topic: req.topic } },
    ).then((subtopics) => {
      deleteSubTopics(subtopics);
      res.sendStatus(200);
    });
  });

router.route('/topics/:id/subtopics/:id2')
  .all(isAuthenticated)
  .all((req, res, next) => {
    getRepository(Topic).findOneOrFail(
      { where: { userId: req.user.id, id: req.params.id } },
    ).then((_foundTopic) => {
      getRepository(SubTopic).findOneOrFail(
        { where: { topic: _foundTopic, id: req.params.id2 } },
      ).then((_foundSubTopic) => {
        req.topic = _foundTopic;
        req.subtopic = _foundSubTopic;
        next();
      }, () => {
        res.sendStatus(404);
      });
    }, () => {
      res.sendStatus(404);
    });
  })
  .get((req, res) => {
    res.send(req.subtopic);
  })
  .put((req, res) => {
    const foundSubTopic = req.subtopic;
    const { name } = req.body;
    foundSubTopic.name = name;

    getManager().save(foundSubTopic).then((updatedSubTopic) => {
      res.send(updatedSubTopic);
    });
  })
  .delete((req, res) => {
    getManager().delete(SubTopic, req.subtopic.id).then(() => {
      res.sendStatus(200);
    });
  });

export default router;
