import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('notifications')
class NotificationEntity {

	@PrimaryGeneratedColumn()
	id: number

	@Column()
	userId: number
  
	@Column()
	message: string

	@Column()
	created_dt: Date

	@Column({default: false})
	checked: boolean

}

export {
	NotificationEntity
}