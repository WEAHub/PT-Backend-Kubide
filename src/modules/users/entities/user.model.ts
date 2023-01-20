import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
class UserEntity {

	@PrimaryGeneratedColumn()
	id: number

	@Column()
	username: string

	@Column()
	password: string

	@Column()
	email: string

	@Column()
	created_dt: Date

	@Column()
	updated_dt: Date

	@Column({ default: false })
	isOnline: Boolean
}

export {
	UserEntity
}