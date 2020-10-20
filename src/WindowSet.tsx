import React from 'react';
import { useQueryState } from 'use-location-state';
import JitsiHandler from './JtsiHandler';
import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

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

	const [roomx, setRoomx] = useQueryState('room', 'HotnetDesignTeam');
	const [userx, setUserx] = useQueryState('user', 'Mike');
	const [room, setRoom] = React.useState('HotnetDesignTeam');
	const [user, setUser] = React.useState('Mike');
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
					setRoom(roomx);
					setUser(userx);
				}}
			>
				Join
			</button>
			<form className={classes.root} noValidate autoComplete="off">
				<div>
					<TextField
						id="standard-room"
						label="Room"
						value={roomx}
						onChange={setRoomx}
					/>
				</div>
				<div>
					<TextField
						id="standard-user"
						label="User"
						value={userx}
						onChange={setUserx}
					/>
				</div>
			</form>
			<JitsiHandler roomName={room} userName={user} index={1} getApi={getApi} />
			<JitsiHandler
				roomName={room + '-alt'}
				userName={user + '-alt'}
				index={2}
				getApi={getApi}
			/>
		</div>
	);
};

export default Test;
