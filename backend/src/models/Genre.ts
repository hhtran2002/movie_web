import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import { Movie } from "./movie";

@Entity()
export class Genre {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column({ nullable: true })
    description!: string;

    @ManyToMany(() => Movie, (movie) => movie.genres)
    movies!: Movie[];

}
