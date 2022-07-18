import jwt from "jsonwebtoken";

const auth = async (ctx) => {
  try {
    const { req } = ctx;
    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      return { id: null };
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return { id: null };
    }

    return decoded;
  } catch (err) {
    return { id: null };
  }
};

export default auth;
