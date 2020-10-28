import React from "react";
import { motion } from "framer-motion";
import { makeStyles } from "@material-ui/core";
import { TextField } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch"
    }
  }
}));
const Component = ({
  shouldShowChange,
  room,
  user,
  setRoom,
  setUser,
  changeRoom
}) => {
  console.log("show", window.location, shouldShowChange);
  const classes = useStyles();

  return (
    <React.Fragment>
      {changeRoom ? (
        <div id="room-form" className="mt-4 p-10 border border-black">
          <motion.div
            className=""
            // initial={{ scale: 0 }}
            // animate={{ scale: changeRoom ? 0 : 1 }}
            // transition={{ ease: 'easeOut', duration: 1 }}
          >
            <form className={classes.root} noValidate autoComplete="off">
              <div>
                <TextField
                  id="standard-editRoomName"
                  label="Enter name of room"
                  value={room}
                  onChange={(e) => setRoom(e.target.value)}
                />
              </div>
              <div>
                <TextField
                  id="standard-editUserName"
                  label="Enter the user's name"
                  value={user}
                  onChange={(e) => setUser(e.target.value)}
                />
              </div>
            </form>
          </motion.div>
        </div>
      ) : null}
    </React.Fragment>
  );
};
export default Component;
