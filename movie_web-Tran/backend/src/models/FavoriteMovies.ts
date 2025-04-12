import { Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { User } from "./User";
import { Movie } from "./Movie";

@Entity()
export class FavoriteMovies {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => User, (user) => user.favoriteMovies)
    user!: User;

    @ManyToOne(() => Movie, (movie) => movie.favoriteMovies)
    movie!: Movie;
}
