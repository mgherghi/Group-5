/* eslint-disable import/no-cycle */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import Topic from './topic';
import Question from './question';

@Entity()
export default class SubTopic {
  @PrimaryGeneratedColumn()
  id

  @Column({ type: 'varchar' })
  name

  @ManyToOne(() => Topic, (topic) => topic.subtopics)
  topic

  @OneToMany(() => Question, (question) => question.topic)
  questions
}
