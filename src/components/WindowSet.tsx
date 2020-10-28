import React from "react";
import JitsiHandler from "./JtsiHandler";
import { motion } from "framer-motion";
import Buttons from "./Buttons";
import RoomsSettings from "./RoomSetings";
import WindowListener from "./WindowListener";
import Singalong from "./Singalong";
import { useQueryState } from "use-location-state";
// import './styles.css';
// import 'tailwindcss';
const showPostButton = false;

const Test = () => {
  const shouldShowChange = !!window.location.origin.match(/csb\.app$/);

  const [roomConnected, setRoomConnected] = React.useState(!shouldShowChange);

  const [changeRoom, setChangeRoom] = React.useState(shouldShowChange);
  const [counting, setCounting] = React.useState(true);

  const [showSing, setShowSing] = React.useState(false);

  // const [animation, setAnimation] = React.useState("initial");
  const [room, setRoom] = useQueryState("room", "HootnetDesignTeam");
  const [user, setUser] = useQueryState("user", "Mike");

  const [apis, setApis] = React.useState([]);
  const getApi = (index, api) => {
    console.log("INDEX", index);
    apis[index] = api;
    setApis(apis);
  };
  return (
    <div>
      <WindowListener counting={counting} setCounting={setCounting} />
      <Buttons
        {...{
          showSing,
          setShowSing,
          setChangeRoom,
          setRoomConnected,
          changeRoom,
          showPostButton,
          setCounting
        }}
      />
      <RoomsSettings
        shouldShowChange={shouldShowChange}
        changeRoom={changeRoom}
        room={room}
        user={user}
        setRoom={setRoom}
        setUser={setUser}
      />

      {/* <motion.div>
				{buildNo !== lastBuild? <BuildInfo />: null}
				</motion.div> */}

      <Singalong {...{ showSing }} />
      <div id="jitsi-container">
        {roomConnected ? (
          <motion.div
          // initial={{ x: 0 }}
          // animate={{ x: !changeRoom ? 0 : -500 }}
          // transition={{ ease: 'easeOut', duration: 1 }}
          >
            <React.Fragment>
              <JitsiHandler
                index={1}
                roomName={room}
                userName={user}
                getApi={getApi}
              />
              {/* <JitsiHandler
									roomName={room + '-alt'}
									userName={user + '-alt'}
									index={2}
									getApi={getApi}
								/> */}
            </React.Fragment>
          </motion.div>
        ) : null}
      </div>
    </div>
  );
};

export default Test;
