import { WhereOptions } from "sequelize";
import { ResponseHelper } from "../helpers";

import {
  UserFace,
} from "../interface/UserInterface";
import { User } from "../models"

// const responseHelper = new ResponseHelper();


export class UserService  {
  public async fetchUsers(): Promise<Array<User>> {
    let users;
    try {
      users = await User.findAll({
        order: [["createdAt", "DESC"]]
      });
    } catch (error) {
      console.log(error, "Error fetching users")
      return Promise.reject(error)
    }

		return Promise.resolve(users)
	}

  public async registerUser(createParams: UserFace): Promise<User> {
    let result: User;

    try {
      result = await User.findOne({
        where: {
        email: createParams.email,
        },
      });

      if (result != undefined || result != null) {
        return Promise.reject(new Error("This Email already in use"));
      }

      const {
        email, role, fullname
      } = createParams

      // create User data
      result = await User.create({
        email,
        fullname,
        role,
      })

    } catch (error) {
      return Promise.reject(error);
    }

    return Promise.resolve(result);
  }


  public async getUserById(id: number): Promise<User> {
    let user: User;
    try {
      user = await User.findByPk(id, {});

    } catch (error) {
      console.error(error);
      return Promise.reject(new Error("Oops.., there was an issue while retrieving record. Please try again"));
    }
    return user;
  }


  /**
   * 
   * @param id @description Deletes the user with the given id
   * @returns 
   */
  public async deleteUser(id: number): Promise<any> {
    let user: User;
    try {
        user = await User.findByPk(id);
        if (user) {
            await User.destroy({where: {id: user.id}});
        } else {
          return Promise.resolve(null);
        }
        return Promise.resolve("User was deleted successfully");
    } catch (error) {
        return Promise.reject(new Error("An error occurred while deleting record"));
    }
  }


  public async updateUser(userId: number, userUpdateRequest: UserFace): Promise<User> {
    let user: User;
    try {
      const result = await User.findOne({
        where: {id: userId},
      });

      if (result) {
          user = result;

          await user.update(userUpdateRequest);
    
          return Promise.resolve(user);
      } else {
          return Promise.reject(new Error("Could not find any user to update"));
      }
    } catch (error) {
        console.log(error);
        return Promise.reject(new Error("An error occurred while updating user's data"));
    }
  }


}
