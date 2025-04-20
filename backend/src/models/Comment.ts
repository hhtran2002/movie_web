import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from "typeorm";
import { User } from "./User";
import { Movie } from "./Movie";

@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    content!: string;

    @ManyToOne(() => User, (user) => user.comments)
    user!: User;

    @ManyToOne(() => Movie, (movie) => movie.comments)
    movie!: Movie;

    @CreateDateColumn()
    createdAt!: Date;
}