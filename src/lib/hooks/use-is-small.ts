import {useMediaQuery} from "usehooks-ts";

const useIsSmall = () => {
  const isSmall = useMediaQuery("(max-width: 860px)");

  return {isSmall};
};

export {useIsSmall};
