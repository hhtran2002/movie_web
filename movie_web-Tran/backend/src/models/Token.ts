import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class Token {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => User, (user) => user.tokens, { onDelete: "CASCADE" })
    user!: User;

    @Column({ type: "nvarchar(max)" })
    token!: string;

    @CreateDateColumn()
    createdAt!: Date;

    @Column({ type: "datetime" })
    expiresAt!: Date;
}
