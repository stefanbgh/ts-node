import express from "express";

import { UserRepository } from "../repositories/user.repository";
import { UserController } from "../controllers/user.controller";
import { UserService } from "../services/user.service";

const router = express.Router();

// This is a nice start
// But maybe try to create in config folder folders named by the layers,example:
// https://www.oreilly.com/library/view/software-architecture-patterns/9781491971437/ch01.html read this
// In technical perspective it will look like this
/*

config-
       |
       _ controllers
                    |
                    _ users.controllers.js {
                                            import userService... - now you are only dependant on user service 
                                            const userController = new UserController(userService);
                                                In case userController has more dependencies like userService you will need to import more that will complicate stuff (hint: Think about stuff how not to import things or should I say think how can you scale the code just to get value in controller for this example instead of importing it)
                                            }
       _ services 
       _ repo
*/

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

router.get("/", (req, res) => userController.getUsers(req, res));
router.get("/:id", (req, res) => userController.getSingleUser(req, res));

export { router as userRoutes };
