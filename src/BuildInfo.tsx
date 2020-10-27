import React from 'react';
const buildInfo = {
	0: {
		title: 'Build info',
		text: `When you go to the website and there 
		have been changes since your last visit on that
		device you'll see a button that says "What's new". 

		If you Click it you will see a list of all the changes since the last time 
		that you visited on that device.

		Click the "Close" and you'll continue.
		`
	},
	1: {
		title: 'Change rooms',
		text: `If the link you've been given has a 
    room and user name embedded in it, you will
    go directly to that room.

    If not, a dialog will let you fill in that information
    and then click 'Join.' You'll be connected to 
    that room.
    
    If you want to change rooms later, you can click 'Leave'`
	},
	2: {
		title: 'Start on CSB',
		text: `When deploying on CSB show the change dialog`
	},
	3: {
		title: 'Full screen',
		text: `Full screen selection appears on settings menu`
	}
};
const BuildInfo = ({ lastBuild }) => {
	return (
		<div className="m-2 p-2">
			<div className="pl-4 mb-2">
				Your last build on this device was build {lastBuild}
				<br />
				Here's what's happened since then:
			</div>
			{Object.keys(buildInfo)
				.filter((key) => {
					console.log(key, typeof lastBuild);
					return parseInt(key, 10) >= lastBuild;
				})
				.map((key, index) => {
					const item = buildInfo[key];
					return (
						<div key={index}>
							<h1 className="leading-tight text-xl py-0 px-4">
								{parseInt(key) + 1} {item.title}
							</h1>
							{item.text.split('\n\n').map((para, index) => {
								return (
									<p className="font-serif px-4 text-base leading-tight pb-2">
										{para}
									</p>
								);
							})}
						</div>
					);
				})}
		</div>
	);
};
export default BuildInfo;
