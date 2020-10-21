import React from 'react';
import { useQueryState } from 'use-location-state';
import JitsiHandler from './JtsiHandler';
import { TextField } from '@material-ui/core';
import { makeStyles, ServerStyleSheets } from '@material-ui/core';
import { get, set } from 'local-storage';
import { motion } from 'framer-motion';
import BuildInfo from './BuildInfo';
// import './styles.css';
// import 'tailwindcss';
const thisBuild = 2;
const showPostButton = false;
const buttonClass =
	'border text-white bg-blue-400 border-black m-1 mx-2 p-1 px-3 w-18 rounded-lg shadow-sm';
const useStyles = makeStyles((theme) => ({
	root: {
		'& .MuiTextField-root': {
			margin: theme.spacing(1),
			width: '25ch'
		}
	}
}));
const Test = () => {
	const [counting, setCounting] = React.useState(true);

	const [room, setRoom] = useQueryState('room', 'HootnetDesignTeam');
	const [user, setUser] = useQueryState('user', 'Mike');
	const [changeRoom, setChangeRoom] = React.useState(false);
	const [roomConnected, setRoomConnected] = React.useState(true);
	const [showAdvanced, setShowAdvanced] = React.useState(false);
	const [showNew, setShowNew] = React.useState('button');
	const [lastBuild, setLastBuild] = React.useState(get<number>('lastBuild'));

	const classes = useStyles();

	React.useEffect(() => {
		let count = 0;

		const listener = (event) => {
			if (event.origin === 'https://meet.jit.si') {
				return;
			}

			if (event.origin === 'https://codesandbox.io') {
				return;
			}
			if (++count === 10) {
				setCounting(false);
			} else if (count > 10) return;
			console.log('Event origin ' + count, event.origin);
			console.log(typeof event.data, event.data);
		};

		if (counting === true) window.addEventListener('message', listener, false);
		return () => window.removeEventListener('message', listener);

		// window.addEventListener("message", (event) => {
		//   if (event.origin !== "http://example.org:8080")
		//     return;

		//   // ...
		// }, false);
	}, [counting]);
	const [apis, setApis] = React.useState([]);
	const getApi = (index, api) => {
		console.log('INDEX', index);
		apis[index] = api;
		setApis(apis);
	};
	return (
		<div>
			{/* <motion.div>
				{buildNo !== lastBuild? <BuildInfo />: null}
				</motion.div> */}
			<div className="flex flex-col items-center bg-gray-200">
				{lastBuild !== thisBuild ? (
					<div>
						<button
							className={buttonClass}
							onClick={() => {
								if (showNew === 'button') {
									setShowNew('dialog');
								} else {
									setLastBuild(thisBuild);
									setShowNew('');
									set<number>('lastBuild', thisBuild);
								}
							}}
						>
							{showNew === 'button' ? "What's new?" : 'Close'}
						</button>
						{showNew === 'dialog' ? <BuildInfo lastBuild={lastBuild} /> : null}
					</div>
				) : (
					<div id="everything">
						<div id="button-container" className="">
							{showPostButton ? (
								<button
									className={buttonClass}
									onClick={() => {
										console.log('Origin', window.location.origin);
										setCounting(true);
										window.postMessage(
											'This is the message',
											window.location.origin
										);
									}}
								>
									Post
								</button>
							) : null}
							<button
								className={buttonClass}
								onClick={() => {
									if (changeRoom) {
										setTimeout(() => setRoomConnected(true), 1000);
									} else {
										// setRoom(editRoomName);
										// setUser(editUserName);
										setRoomConnected(false);
									}
									setChangeRoom(!changeRoom);
									// setTimeout(() => setChangeRoom(true), 1000);
								}}
							>
								{changeRoom ? 'Join' : 'Switch'}
							</button>
							<button
								className={buttonClass}
								onClick={() => {
									setShowAdvanced(!showAdvanced);
								}}
							>
								{!showAdvanced ? 'Advanced' : 'Normal'}
							</button>
						</div>
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
				)}
			</div>
		</div>
	);
};

export default Test;
