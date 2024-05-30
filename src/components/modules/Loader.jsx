import { RotatingLines } from "react-loader-spinner";
const Loader = () => {
  return <RotatingLines strokeColor="#3874ff" strokeWidth="2" />;
};
export const MiniLoader = () => {
  return (
    <RotatingLines
      width="50px"
      height="50px"
      strokeColor="#3874ff"
      strokeWidth="2"
    />
  );
};

export default Loader;
