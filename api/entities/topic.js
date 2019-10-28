/* eslint-disable import/no-cycle */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import User from './user';
import SubTopic from './subtopic';
import Question from './question';

@Entity()
export default class Topic {
  @PrimaryGeneratedColumn()
  id

  @Column({ type: 'varchar' })
  name

  @ManyToOne(() => User, (user) => user.topics)
  user

  @OneToMany(() => SubTopic, (subtopic) => subtopic.topic)
  subtopics

  @OneToMany(() => Question, (question) => question.topic)
  questions
}
