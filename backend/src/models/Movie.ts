import "reflect-metadata";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Genre } from "./genre";
import { Category } from "./category";
import { Country } from "./country";
import { Episode } from "./episode";
import { Rating } from "./rating";
import { WatchHistory } from "./watchHistory";

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

  @ManyToMany(() => Genre, (genre) => genre.movies, { cascade: true })
  @JoinTable({
    name: "movie_genres",
    joinColumn: {
      name: "movieId",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "genreId",
      referencedColumnName: "id",
    },
  })
  genres!: Genre[];

  @ManyToMany(() => Category, { cascade: true })
  @JoinTable({
    name: "movie_categories",
    joinColumn: {
      name: "movieId",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "categoryId",
      referencedColumnName: "id",
    },
  })
  categories!: Category[];

  @ManyToMany(() => Country, (country) => country.movies, { cascade: true })
  @JoinTable({
    name: "movie_countries",
    joinColumn: {
      name: "movieId",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "countryId",
      referencedColumnName: "id",
    },
  })
  countries!: Country[];

  @OneToMany(() => Episode, (episode) => episode.movie)
  episodes!: Episode[];

  @OneToMany(() => Rating, (rating) => rating.movie)
  ratings!: Rating[];

  @OneToMany(() => WatchHistory, (watchHistory) => watchHistory.movie)
  watchHistories!: WatchHistory[];
}
