import { UserModel as User } from "../models/index.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import auth from "../middleware/auth.js";

const userMutations = {
  createUser: async (_, { input }) => {
    const { email } = input;

    const emailExist = await User.findOne({ email });

    if (emailExist) {
      return {
        sucess: false,
        message: "Email already exist",
        data: null,
      };
    }

    const hashedPassword = await bcrypt.hash(input.password, 10);

    const user = await User.create({
      ...input,
      username: input.name.toLowerCase().trim().replace(/\s/g, ""),
      password: hashedPassword,
    });

    if (user) {
      return {
        sucess: true,
        message: "User created successfully",
        data: user,
      };
    } else {
      return {
        sucess: false,
        message: "Something went wrong",
        data: null,
      };
    }
  },

  loginUser: async (_, { input }, { res }) => {
    const { emailOrUsername, password } = input;

    const user = await User.findOne({
      $or: [{ email: emailOrUsername }, { username: emailOrUsername }],
    });

    if (!user) {
      return {
        sucess: false,
        message: "User not found",
        data: null,
      };
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    console.log(token);

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365,
      sameSite: "strict",
    });

    if (!isPasswordValid) {
      return {
        sucess: false,
        message: "Invalid Credentials",
        data: null,
      };
    }

    return {
      sucess: true,
      message: "User logged in successfully",
      data: user,
    };
  },

  followUnfollowUser: async (_, { input }, ctx) => {
    try {
      const { id } = await auth(ctx);

      if (!id) {
        return {
          sucess: false,
          message: "User not found",
        };
      }

      const { userId } = input;

      if (userId === id) {
        return {
          sucess: false,
          message: "You can't follow yourself",
        };
      }

      const userToFollow = await User.findById(userId);
      if (!userToFollow) {
        return {
          sucess: false,
          message: "User not found",
        };
      }

      const user = await User.findById(id);
      if (!user) {
        return {
          sucess: false,
          message: "User not found",
        };
      }

      if (user.following.includes(userId)) {
        user.following = user.following.filter((id) => id !== userId);
      } else {
        user.following.push(userId);
      }

      if (userToFollow.followers.includes(id)) {
        userToFollow.followers = userToFollow.followers.filter(
          (id) => id !== id
        );
      } else {
        userToFollow.followers.push(id);
      }

      await userToFollow.save();
      await user.save();
      return {
        sucess: true,
        message: "User followed successfully",
      };
    } catch (error) {
      return {
        sucess: false,
        message: error.message,
      };
    }
  },
};

export default userMutations;
