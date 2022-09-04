import { Request, Response } from "express";
import { Post } from "@tsed/schema";
import { Controller } from "@tsed/di";
import {
  ormCreateUser as _createUser,
  ormCheckUserExist as _checkUserExist,
  ormVerifyUserCredentials as _verifyUserCredentials,
  ormGetUserId as _getUserId,
} from "../model/user-orm";
import jwt from "jsonwebtoken";

@Controller("/user")
export default class UserCtrl {
  @Post("/signup")
  async createUser(req: Request, res: Response) {
    try {
      const { username, password } = req.body;
      if (username && password) {
        // check if user exists

        const isExist = await _checkUserExist(username);
        if (isExist) {
          return res.status(409).json({ message: "Account already exists!" });
        }

        // create a new user
        const resp = await _createUser({ username, password });
        console.log(resp);
        if (!resp) {
          return res
            .status(400)
            .json({ message: "Could not create a new user!" });
        }
        console.log(`Created new user ${username} successfully!`);
        return res
          .status(201)
          .json({ message: `Created new user ${username} successfully!` });
      }
      return res
        .status(401)
        .json({ message: "Username and/or Password are missing!" });
    } catch (err) {
      return res
        .status(500)
        .json({ message: "Database failure when creating new user!" });
    }
  }

  @Post("/login")
  async loginUser(req: Request, res: Response) {
    try {
      const { username, password } = req.body;
      if (username && password) {
        const isMatch = await _verifyUserCredentials(username, password);
        if (isMatch) {
          const userId = await _getUserId(username);
          console.log("userId", userId);
          const user = { username: username, id: userId };
          const accessToken = jwt.sign(user, process.env.LOGIN_SECRET_KEY!);
          return res.status(200).json({ accessToken: accessToken });
          // return res.status(200).json({ message: `Logged in as ${username} successfully!`});
        }
        return res
          .status(403)
          .json({ message: "Invalid Username and/or Password!" });
      }
      return res
        .status(401)
        .json({ message: "Username and/or Password are missing!" });
    } catch (err) {
      return res
        .status(400)
        .json({ message: "No Username and/or Password sent!" });
    }
  }

  // @Post("/verify")
  // async verifyUser(req: Request, res: Response) {
  //   try {
  //     // const authHeader = req.headers['authorization'];
  //     // const token = authHeader && authHeader.split(' ')[1];
  //     const token = req.body;
  //     if (token === null) {
  //       return res.sendStatus(401);
  //     }
  //     const accessToken = token || 'WRONG';
  //     jwt.verify(accessToken, process.env.LOGIN_SECRET_KEY || 'WRONG', (err, user) => {
  //       if (err) {
  //         return res.sendStatus(403);
  //       }
  //       console.log(user);
  //       // If no error
  //       // const { username, password } = user
  //       // if (username && password) {
  //       //   const isMatch = await _verifyUserCredentials(username, password);
  //       //   if (isMatch) {
  //       //     return res.status(200).json({ message: `Logged in as ${username} successfully!`});
  //       //   }
  //       //   return res.status(401).json({ message: 'Invalid Username and/or Password!'});
  //       // }
  //       // return res.status(400).json({ message: 'Username and/or Password are missing!' });

  //     })
  //     } catch (err) {
  //       return res.status(500).json({ message: 'Database failure when signing in user!' });
  //     }

  // }
}
