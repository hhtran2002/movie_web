import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { UserType } from "./UserType";
import { Rating } from "./Rating";
import { WatchHistory } from "./WatchHistory";
import { FavoriteMovies } from "./FavoriteMovies";
import { Token } from "./Token"; // Import Token model

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column()
    password!: string;

    @Column({ unique: true })
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

    @OneToMany(() => Token, (token) => token.user)
    tokens!: Token[];  // Thêm quan hệ với bảng Token

     // Thêm các cột cho reset mật khẩu
     @Column({ nullable: true })
     resetToken?: string;
 
     @Column({ type: "datetime", nullable: true })
     resetTokenExpires?: Date;
}
