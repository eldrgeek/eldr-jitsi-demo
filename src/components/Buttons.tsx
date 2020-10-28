import React from 'react';
// import { makeStyles, ServerStyleSheets } from "@material-ui/core";
import { thisBuild } from './BuildInfo';
import { get, set } from 'local-storage';
import BuildInfo from './BuildInfo';
// const useStyles = makeStyles((theme) => ({
//   root: {
//     "& .MuiTextField-root": {
//       margin: theme.spacing(1),
//       width: "25ch"
//     }
//   }
// }));
const Component = ({
	setChangeRoom,
	changeRoom,
	showPostButton,
	setCounting,
	setRoomConnected,
	showSing,
	setShowSing
}) => {
	const [showAdvanced, setShowAdvanced] = React.useState(false);
	const [lastBuild, setLastBuild] = React.useState(get<number>('lastBuild'));
	const [showNew, setShowNew] = React.useState('button');
	const buttonClass =
		'border text-white bg-blue-400 border-black m-1 mx-2 p-1 px-3 w-18 rounded-lg shadow-sm';
	// const classes = useStyles();

	return (
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
						<button
							className={buttonClass}
							onClick={() => {
								setShowSing(!showSing);
							}}
						>
							{!showSing ? 'Sing' : 'Hide'}
						</button>
					</div>
				</div>
			)}
		</div>
	);
};
export default Component;
