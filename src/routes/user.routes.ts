import { Router } from "express";
import { UsersController } from "../controllers/users.controller"

const usersRoutes = Router();
const usersController = new UsersController();

usersRoutes.route("/new")
.post(usersController.createUser)

usersRoutes.route("/all")
.get(usersController.viewUsers)

usersRoutes.route("/:id?")
.patch(usersController.updateUser)
.delete(usersController.deleteProfile)

export default usersRoutes