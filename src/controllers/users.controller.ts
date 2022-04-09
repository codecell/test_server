// import * as Sentry from "@sentry/node";
import { Request, Response } from "express";
import { ResponseHelper } from "../helpers";
import { User } from "../models/user.model";
import { UserFace } from "../interface/UserInterface";
import { UserService } from "../services/user";

const responseHelper = new ResponseHelper();
const userService = new UserService();

export class UsersController {

  public createUser = async (req: Request, res: Response) => {
    try {
      const payload = req.body as UserFace;

      const user = await userService.registerUser(payload);

      if (user == null) {
        return responseHelper.error(res, {}, "An error occurred while adding new user, please try again", 400);
      }

      return responseHelper.success(res, { user }, "success", 201);

    } catch (err) {
      return responseHelper.error(res as any, {}, 
        "Sorry we could not add user at the moment, please try again", 500
      );
    }
  }

  public viewUsers = async (req: Request, res: Response) => {
    try {
      const users = await userService.fetchUsers();

      if (users == null) {
        return responseHelper.error(res, {}, "An error occurred while fetching users, please try again", 400);
      }

      return responseHelper.success(res, { users }, "success", 200);

    } catch (err) {
      return responseHelper.error(res as any, {}, 
        "Sorry we could not register you at the moment, please try again", 500
      );
    }
  }

  public async updateUser(request: Request, response: Response) {
    try {
      const payload = request.body as UserFace;

      await userService.updateUser(payload.id, payload).then((data) => {
        if (data) {
          return responseHelper.success(response, { user: data });
        } else {
          return responseHelper.error(response as any, {}, "Not found", 404);
        }
        },
        (error) => responseHelper.error(response as any, null, error.message, 400),
      );
    } catch (err) {
      return responseHelper.error(response as any, {}, "Error while updating user details, please try again", 500);
    }
  }


  public async deleteProfile(request: Request, response: Response) {
    try {
      const id = Number(request.params.id);
      await userService.deleteUser(id).then(
          (result) => responseHelper.success(response as any, { result }),
          (error) => responseHelper.error(response as any, null, error.message, 400),
      );
    } catch (e) {
      return responseHelper.error(response as any, {}, "Error while deleting user profile", 500);
    }
  }
}
