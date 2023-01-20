import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('messages')
class MessageEntity {

	@PrimaryGeneratedColumn()
	id: number

	@Column()
	fromUserId: number

	@Column()
	toUserId: number
  
	@Column()
	message: string

	@Column()
	created_dt: Date

	@Column({default: false})
	checked: boolean

}

export {
	MessageEntity
}