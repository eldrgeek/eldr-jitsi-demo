import React from 'react';
const buildInfo = {
	0: {
		title: 'Build info',
		text: `When you go to the website, you'll see
    you a list of all the changes since the last time 
    that you visited on that device.`
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
	}
};
const BuildInfo = () => {
	return (
		<div>
			{Object.keys(buildInfo).map((key, index) => {
				const item = buildInfo[key];
				console.log(item);
				return (
					<div key={index}>
						<h1 className="leading-tight text-2xl py-0 px-4"> {item.title}</h1>
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
