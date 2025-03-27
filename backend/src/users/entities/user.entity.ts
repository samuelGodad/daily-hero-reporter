
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Report } from '../../reports/entities/report.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  department: string;

  @Column({ nullable: true })
  phone?: string;

  @Column({ nullable: true })
  avatar?: string;

  @OneToMany(() => Report, (report) => report.user)
  reports: Report[];
}
