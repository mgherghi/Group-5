/* eslint-disable import/no-cycle */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
} from 'typeorm';
import Topic from './topic';
import Question from './question';
import Course from './course';

@Entity()
export default class User {
  @PrimaryGeneratedColumn()
  id

  @Column({ type: 'varchar', unique: true })
  email

  @Column({ type: 'varchar', nullable: false })
  password

  @OneToMany(() => Topic, (topic) => topic.user)
  topics

  @OneToMany(() => Question, (question) => question.user)
  questions

  @ManyToMany(() => Course, (course) => course.user)
  courses
}
