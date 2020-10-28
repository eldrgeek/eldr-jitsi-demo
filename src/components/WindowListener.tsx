import React from "react";
const Component = ({ counting, setCounting }) => {
  React.useEffect(() => {
    let count = 0;

    const listener = (event) => {
      if (event.origin === "https://meet.jit.si") {
        return;
      }

      if (event.origin === "https://codesandbox.io") {
        return;
      }
      if (++count === 10) {
        setCounting(false);
      } else if (count > 10) return;
      console.log("Event origin " + count, event.origin);
      console.log(typeof event.data, event.data);
    };

    if (counting === true) window.addEventListener("message", listener, false);
    return () => window.removeEventListener("message", listener);

    // window.addEventListener("message", (event) => {
    //   if (event.origin !== "http://example.org:8080")
    //     return;

    //   // ...
    // }, false);
  }, [counting, setCounting]);
  return null;
};
export default Component;
