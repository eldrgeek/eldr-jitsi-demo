import React from 'react';
import './styles.css';
import Jitsi from 'react-jitsi';
import WebTiming from './WebTiming';
// import JitsiHandler from './JtsiHandler';
//@ts-ignore
let xto: any;
//@ts-ignore
let array = [];
export default function App({
	index,
	getApi,
	roomName,
	userName
}: {
	index: number;
	getApi: any;
	roomName: string;
	userName: string;
}) {
	const [api, setAPI] = React.useState(null);
	const [time, setTime] = React.useState(null);
	const [to, setTimingObject] = React.useState(null);
	// const [tick, setTick] = React.useState(0);
	const [delta, setDelta] = React.useState('');
	const reportEvent = (event: any) => {
		const receiptTime = xto.query().position;
		if (event) {
			console.log('ENDPOINT EVENT IS NOW', event.data);
			const message = JSON.parse(event.data.eventData.text);
			console.log('TEXT TIME', message.time);
			const delta = ((receiptTime - message.time) * 1000).toFixed(1);
			console.log('DELTA VALUE ', delta);
			console.log('MESSAGE VALUE is ', message.array.length);
			setDelta(delta);
		}
		/*
    receiptTim
    */
		console.log(' Times', receiptTime);
	};
	React.useEffect(() => {
		// setInterval(reportEvent, 1000);
		const wt = new WebTiming();
		//@ts-ignore
		wt.onTimingObject = (newTo) => {
			setTimingObject(newTo);
			xto = newTo;
			// console.log("New to")
			// Hook up text UI
			newTo.on('timeupdate', function () {
				var v = newTo.query();
				// console.log("new time")
				setTime(v);
			});
		};
		xto = to;
		// }
		// wt.setRun(run, setTime);
	}, []); // eslint-disable-line
	const reset = () => {
		//@ts-ignore
		to.update({ position: 0.0 });
		//@ts-ignore
		to.update({ velocity: 1.0, acceleration: 0.0 });
	};
	const toggleChat = () => {
		//@ts-ignore
		if (api) {
			//@ts-ignore
			api.executeCommand('toggleChat');
		}
	};
	const startRecording = () => {
		console.log('Recording');
		//@ts-ignore
		api.executeCommand('startRecording', {
			mode: 'stream', //recording mode, either `file` or `stream`.
			// dropboxToken: string, //dropbox oauth2 token.
			// shouldShare: boolean, //whether the recording should be shared with the participants or not. Only applies to certain jitsi meet deploys.
			youtubeStreamKey: 'y8ra-pg6s-vbe9-3wer-66bp', //the youtube stream key.
			youtubeBroadcastID: 'rtmp://a.rtmp.youtube.com/live2' //the youtube broacast ID.
		});
	};
	const sendtoAll = () => {
		xto = to;
		const info = api.getParticipantsInfo();
		console.log('INFO is ', info);
		info.forEach((session: any) => {
			const id = session.participantId;
			const lastTime = to.query().position.toFixed(8);
			console.log('ID Is', id, lastTime, time.position);
			const base = array.length;
			for (let i = 0; i < 10000; i++) {
				array[base + i] = i;
			}
			let stringify = JSON.stringify({ time: lastTime, array: array });
			// console.log("STRINGIGY", stringify);
			//@ts-ignore
			api.executeCommand('sendEndpointTextMessage', id, stringify);
		});
	}; //this is a

	const handleAPI = (api: any) => {
		setAPI(api);
		getApi(index, api);

		api.addEventListener('endpointTextMessageReceived', (event) => {
			reportEvent(event);
		});
		api.addEventListener('incomingMessage', (event) => {
			console.log('Incominggg message', event);
		});

		api.addEventListener('participantLeft', (event) => {
			console.log('left', event);
		});
	};
	// const handleClick = (e) => {
	// 	console.log('click', e.target);
	// };

	//@ ts-ignore
	const jitsiConfig: any = {
		// requireDisplayName: false,
		prejoinPageEnabled: false,
		localRecording: {
			enabled: true,
			format: 'ogg'
		},
		fileRecordingsEnabled: true,
		liveStreamingEnabled: true
	};

	const interfaceConfig: any = {
		MOBILE_APP_PROMO: false,
		SHOW_BRAND_WATERMARK: true,

		BRAND_WATERMARK_LINK: '',
		SHOW_JITSI_WATERMARK: false,

		DEFAULT_BACKGROUND: '#000',
		JITSI_WATERMARK_LINK: 'https://singalong.vercel.app',
		// JITSI_WATERMARK_LINK: 'https://jitsi.org',

		// HIDE_INVITE_MORE_HEADER: true
		// @ts-ignore
		TOOLBAR_BUTTONS: [
			// @ts-ignore
			'microphone',
			'camera',
			'localrecording',
			'NOT closedcaptions',
			'desktop',
			'NOT embedmeeting',
			'NOT fullscreen',
			'fodeviceselection',
			'hangup',
			'profile',
			'chat',
			'NO recording',
			'livestreaming',
			'NOT etherpad',
			'sharedvideo',
			'settings',
			'NO raisehand',
			'videoquality',
			'filmstrip',
			'NOT invite',
			'NOT feedback',
			'NO stats',
			'shortcuts',
			'tileview',
			'NO videobackgroundblur',
			'download',
			'NO help',
			'NO mute-everyone',
			'NO security'
		]
	};
	//@ ts-ignore
	console.log('User IS ', userName);
	return (
		<div className="App">
			<button onClick={startRecording}> Record </button>
			<button onClick={toggleChat}> Toggle Chat </button>
			<button onClick={sendtoAll}>Send</button>
			<button onClick={reset}>Reset</button>

			<div id="position" style={{ fontWeight: 'bold' }}>
				{time ? time.position.toFixed(3) : ''} delta {delta}
			</div>

			<Jitsi
				roomName={roomName}
				displayName={userName}
				onAPILoad={handleAPI}
				// @ts-ignore
				config={jitsiConfig}
				// @ts-ignore
				interfaceConfig={interfaceConfig}
			/>
		</div>
	);
}

/*


export const App = () => (
  <>
    <h2>My First Meeting!</h2>
  </>
)
*/
