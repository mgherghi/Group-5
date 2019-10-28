/* eslint-disable import/no-cycle */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne
} from 'typeorm';
import Question from './question';

@Entity()
export default class Answer {
  @PrimaryGeneratedColumn()
  id

  @Column({ type: 'varchar' })
  data

  @Column({ type: 'varbinary' })
  img
  
  @Column({ type: 'boolean' })
  correct

  @ManyToOne(() => Question, (question) => question.answers)
  question
}
