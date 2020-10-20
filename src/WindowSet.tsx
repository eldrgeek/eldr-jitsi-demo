import React from 'react';
import { useQueryState } from 'use-location-state';
import JitsiHandler from './JtsiHandler';
import { TextField } from '@material-ui/core';
import { makeStyles, ServerStyleSheets } from '@material-ui/core/styles';

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
	const [editRoomName, setEditRoomName] = React.useState(room);
	const [editUserName, setEditUserName] = React.useState(user);
	const [displayRoom, setDisplayRoom] = React.useState(true);
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
			<button
				onClick={() => {
					console.log('Origin', window.location.origin);
					setCounting(true);
					window.postMessage('This is the message', window.location.origin);
				}}
			>
				Post
			</button>
			<button
				onClick={() => {
					setRoom(editRoomName);
					setUser(editUserName);
					setDisplayRoom(false);
					setTimeout(() => setDisplayRoom(true), 1000);
				}}
			>
				Join
			</button>

			<form className={classes.root} noValidate autoComplete="off">
				<div>
					<TextField
						id="standard-editRoomName"
						label="room"
						value={editRoomName}
						onChange={(e) => setEditRoomName(e.target.value)}
					/>
				</div>
				<div>
					<TextField
						id="standard-editUserName"
						label="User"
						value={editUserName}
						onChange={(e) => setEditUserName(e.target.value)}
					/>
				</div>
			</form>
			{displayRoom ? (
				<React.Fragment>
					<JitsiHandler
						index={1}
						roomName={room}
						userName={user}
						getApi={getApi}
					/>
					<JitsiHandler
						roomName={room + '-alt'}
						userName={user + '-alt'}
						index={2}
						getApi={getApi}
					/>
				</React.Fragment>
			) : null}
		</div>
	);
};

export default Test;
