import { useContext } from "react";
import { ctx } from "../helpers/ctx";

const useGlobalcontext = () => {
  return useContext(ctx);
};

export default useGlobalcontext;
