import "reflect-metadata";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable } from "typeorm";
import { Genre } from "./Genre";
import { Category } from "./Category";
import { Country } from "./Country";
import { Episode } from "./Episode";
import { Rating } from "./Rating";
import { WatchHistory } from "./WatchHistory";
import { FavoriteMovies } from "./FavoriteMovies";

@Entity()
export class Movie {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column()
    description!: string;

    @Column()
    status!: string;

    @Column()
    release_year!: number;

    @Column()
    total_ep!: number;

    @Column()
    thumbnail!: string;

    @Column()
    trailer_url!: string;

      // Thêm quan hệ OneToMany với Genre
      @OneToMany(() => Genre, (genre) => genre.movie)
      genres!: Genre[];

      // Thêm quan hệ OneToMany với Category
      @ManyToMany(() => Category, { cascade: true })
      @JoinTable()
      categories!: Category[];

    @OneToMany(() => Country, (country) => country.movie) // Thêm dòng này
    countries!: Country[];

    @OneToMany(() => Episode, (episode) => episode.movie)
    episodes!: Episode[];

    @OneToMany(() => Rating, (rating) => rating.movie)
    ratings!: Rating[];

    @OneToMany(() => WatchHistory, (watchHistory) => watchHistory.movie)
    watchHistories!: WatchHistory[];

    @OneToMany(() => FavoriteMovies, (favoriteMovie) => favoriteMovie.movie)
    favoriteMovies!: FavoriteMovies[];
}