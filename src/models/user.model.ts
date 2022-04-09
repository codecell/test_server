
import {
  AllowNull, 
  Column, DataType,
  Model, Table, IsEmail,
  Unique,
} from "sequelize-typescript";
import { UserFace } from "../interface/UserInterface"


@Table({
  tableName: "users",
})

export class User extends Model<UserFace> {
  @IsEmail
  @Unique({ name: 'email_unique', msg: 'email_should_be_unique' })
  @AllowNull(false)
  @Column({
    type: DataType.STRING(36),
  })
  public email: string;

  @AllowNull(false)
  @Column
  public fullname: string;

  @AllowNull(false)
	@Column(DataType.ENUM("User", "Admin"))
	public role: string;
}
