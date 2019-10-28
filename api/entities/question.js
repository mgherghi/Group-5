/* eslint-disable import/no-cycle */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import User from './user';
import Topic from './topic';
import SubTopic from './subtopic';
import Answer from './answer';

@Entity()
export default class Question {
  @PrimaryGeneratedColumn()
  id

  @Column({ type: 'varchar' })
  content

  @ManyToOne(() => User, (user) => user.questions)
  user

  @ManyToOne(() => Topic, (topic) => topic.questions)
  topic

  @ManyToOne(() => SubTopic, (subtopic) => subtopic.questions)
  subtopic

  @OneToOne(() => Answer, (answer) => answer.question)
  @JoinColumn()
  answer
}
