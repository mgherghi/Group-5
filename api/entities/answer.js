/* eslint-disable import/no-cycle */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
} from 'typeorm';
import Question from './question';

@Entity()
export default class Answer {
  @PrimaryGeneratedColumn()
  id

  @Column({ type: 'varchar' })
  data

  @OneToOne(() => Question, (question) => question.answer)
  question
}
