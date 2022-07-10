import { useState } from "react";

const values = () => {
  const [token, setToken] = useState("null");
  const [details, setDetails] = useState({
    message: "hello world",
    name: "John Doe",
  });
  return { token, setToken, details, setDetails };
};

export default values;
