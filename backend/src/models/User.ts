import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { UserType } from "./UserType";
import { Rating } from "./Rating";
import { WatchHistory } from "./WatchHistory";
import { FavoriteMovies } from "./FavoriteMovies";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column()
    password!: string;

    @Column()
    email!: string;

    @Column()
    phone!: string;

    @ManyToOne(() => UserType, (userType) => userType.users)
    userType!: UserType;

    @OneToMany(() => Rating, (rating) => rating.user)
    ratings!: Rating[];

    @OneToMany(() => WatchHistory, (watchHistory) => watchHistory.user)
    watchHistories!: WatchHistory[];

    @OneToMany(() => FavoriteMovies, (favoriteMovie) => favoriteMovie.user)
    favoriteMovies!: FavoriteMovies[];
}
