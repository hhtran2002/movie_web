import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Movie } from "./movie";

@Entity()
export class Episode {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    ep_link!: string;

    @Column()
    ep_number!: number;

    @ManyToOne(() => Movie, (movie) => movie.episodes)
    movie!: Movie;
}
