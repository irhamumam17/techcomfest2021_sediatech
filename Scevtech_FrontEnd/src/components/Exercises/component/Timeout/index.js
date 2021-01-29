import React , {Component} from 'react';

class Timeout extends Component {
	render() {
		return(
			<React.Fragment>
				<div className="text-center mx-auto w-2/5 mt-20">
					<div className="card mx-auto">
						<h1 className="text-red-500 font-semibold text-2xl">Yeahh, Waktumu telah habis!!</h1>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

export default Timeout;
	