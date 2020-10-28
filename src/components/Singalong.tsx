import React from "react";
const Component = ({ showSing }) => {
  return (
    <React.Fragment>
      {showSing ? (
        <iframe
          allow="camera;microphone;fullscreen"
          height="500px"
          width="100%"
          title="Sing along"
          src="https://singalong.vercel.app"
        />
      ) : null}
    </React.Fragment>
  );
};
export default Component;
