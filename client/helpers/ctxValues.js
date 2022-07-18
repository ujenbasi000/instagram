import { useState } from "react";

const values = () => {
  const [user, setUser] = useState(null);
  const [menus, setMenus] = useState(false);
  const [token, setToken] = useState(null);
  const [createNew, setCreateNew] = useState(false);
  const [refetchState, setRefetchState] = useState(false);

  return {
    user,
    setUser,
    menus,
    setMenus,
    token,
    setToken,
    createNew,
    setCreateNew,
    refetchState,
    setRefetchState,
  };
};

export default values;
