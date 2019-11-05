import { Router } from 'express';
import { getRepository, getManager } from 'typeorm';
import isAuthenticated from '../middleware/isAuthenticated';
import User from '../entities/user';


function deleteCourses(courses) {
    for (const course of courses) {
        getManager().delete(Course, course.id);
      }
}

const router = Router();
router.route('/courses')
  .all(isAuthenticated)
  .get((req, res) => {
    getRepository(Course).find({ where: { userId: req.user.id } }).then((courses) => {
      res.send(courses);
    });
  })
  .post((req, res) => {
    const { name } = req.body;
    const manager = getManager();
    const course = manager.create(Course, { name });
    course.user = req.user;
    manager.save(course).then((savedCourse) => {
      res.send(savedCourse);
    }, {});
  })
  .delete((req, res) => {
    getRepository(Question).find(
      { where: { userId: req.user.id } },
    ).then((courses) => {
      deleteCourses(courses);
      res.sendStatus(200);
    });
  });

router.route('/course/:id')
  .all(isAuthenticated)
  .all((req, res, next) => {
    getRepository(Course).findOneOrFail(
      { where: { userId: req.user.id, id: req.params.id } },
    ).then((_foundCourse) => {
      req.course = _foundCourse;
      next();
    }, () => {
      res.sendStatus(404);
    });
  })
  .put((req, res) => {
    const foundCourse = req.course;
    const { name } = req.body;
    foundCourse.name = name;

    getManager().save(foundCourse).then((updatedCourse) => {
      res.send(updatedCourse);
    });
  })
  .get((req, res) => {
    res.send(req.course);
  })
  .delete((req, res) => {
    getManager().delete(Course, req.course.id).then(() => {
      res.send(200);
    });
});

export default router;