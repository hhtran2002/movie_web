import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { UserType } from "./userType";
import { Rating } from "./rating";
import { WatchHistory } from "./watchHistory";
import { Token } from "./token";

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

    @OneToMany(() => Token, (token) => token.user)
    tokens!: Token[];

    @Column({ nullable: true })
    resetToken?: string;

    @Column({ type: "datetime", nullable: true })
    resetTokenExpires?: Date;
}