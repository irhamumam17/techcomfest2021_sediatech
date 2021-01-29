import React from 'react';


const Loading = (props) => {
	if(props.status) {
		if(props.size !== 'small') {
			return ( 
				<div className="text-center  text-gray-600"> 
					<div className="w-12 animate-spin mx-auto">
						<svg xmlns="http://www.w3.org/2000/svg" style={{transform: 'rotateX(180deg)'}} className="w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
						</svg>
					</div>
					<p className="mt-2 text-sm font-semibold">Loading...</p>
				</div> 
			) 
		} else {
			return (
				<React.Fragment>
					<div className="w-10 animate-spin mx-auto text-red-400 inline-block relative" style={{ top: '14px' , left: '20px' }}>
						<svg xmlns="http://www.w3.org/2000/svg" style={{transform: 'rotateX(180deg)'}} className="w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
						</svg>
					</div>
					<span className="text-red-400 ml-6 font-semibold">menghapus...
					</span>
				</React.Fragment>
			)
		}
	} else {
		return '';
	}
}

export default Loading;