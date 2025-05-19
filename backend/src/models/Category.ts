import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import { Movie } from "./movie";


@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column()
    description!: string;

    @ManyToMany(() => Movie, (movie) => movie.categories)
    movies!: Movie[];

}