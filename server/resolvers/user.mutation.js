import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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
};

export default userMutations;
