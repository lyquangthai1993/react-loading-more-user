import React from "react";
import ClipLoader from "react-spinners/ClipLoader";
// Can be a string as well. Need to ensure each key-value pair ends with ;

const LoadingIndicator = props => {
  return <ClipLoader size={150} color={"#123abc"} loading={true} />;
};
export default LoadingIndicator;
