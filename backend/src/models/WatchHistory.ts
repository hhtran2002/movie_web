import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./user";
import { Movie } from "./movie";

@Entity()
export class WatchHistory {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    ep_number!: number;

    @Column({ type: "datetime2", nullable: true }) // Đảm bảo nullable
    watch_time!: Date;

    @ManyToOne(() => User, (user) => user.watchHistories)
    @JoinColumn({ name: "user_id" }) // Định nghĩa khóa ngoại rõ ràng
    user!: User;

    @ManyToOne(() => Movie, (movie) => movie.watchHistories)
    @JoinColumn({ name: "movie_id" }) // Định nghĩa khóa ngoại rõ ràng
    movie!: Movie;
}
