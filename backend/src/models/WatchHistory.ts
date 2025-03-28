import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";
import { Movie } from "./Movie";

@Entity()
export class WatchHistory {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    ep_number!: number;

    @Column()
    watch_time!: number;

    @ManyToOne(() => User, (user) => user.watchHistories)
    user!: User;

    @ManyToOne(() => Movie, (movie) => movie.watchHistories)
    movie!: Movie;
}
