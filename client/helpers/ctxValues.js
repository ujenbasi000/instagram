import { useState } from "react";

const values = () => {
  const [user, setUser] = useState(null);
  const [menus, setMenus] = useState(false);
  const [token, setToken] = useState(null);

  return { user, setUser, menus, setMenus, token, setToken };
};

export default values;
