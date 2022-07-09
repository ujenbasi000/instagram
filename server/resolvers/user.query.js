import auth from "../middleware/auth.js";
import { UserModel as User } from "../models/index.js";

const resolvers = {
  getGreetings: () => "Hello world!",

  getAuthorizedUser: async (_, __, ctx) => {
    const { id } = await auth(ctx);

    if (!id)
      return {
        sucess: false,
        message: "User not found",
        data: null,
      };

    const user = await User.findById(id);

    if (!user)
      return {
        sucess: false,
        message: "User not found",
        data: null,
      };

    return {
      sucess: true,
      message: "User found",
      data: user,
    };
  },
};

export default resolvers;
