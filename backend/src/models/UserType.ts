import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { User } from "./User";

@Entity()
export class UserType {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    role_name!: string;

    @OneToMany(() => User, (user) => user.userType)
    users!: User[];
}
