import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./user";
import { Movie } from "./movie";

@Entity()
export class Rating {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    rating!: number;

    @Column()
    review!: string;

    @ManyToOne(() => User, (user) => user.ratings)
    user!: User;

    @ManyToOne(() => Movie, (movie) => movie.ratings)
    movie!: Movie;
}
