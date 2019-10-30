/* eslint-disable import/no-cycle */
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToMany,
  } from 'typeorm';
  import User from './user';
  
  @Entity()
  export default class Course {
    @PrimaryGeneratedColumn()
    id
  
    @Column({ type: 'varchar' })
    name
  
    @ManyToMany(() => User, (user) => user.class)
    user
  }