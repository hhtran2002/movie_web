import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Movie } from "./Movie";

@Entity()
export class Genre {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column({ nullable: true })
    description!: string;

    @ManyToOne(() => Movie, (movie) => movie.genres, { onDelete: "CASCADE" })
    movie!: Movie;
}
