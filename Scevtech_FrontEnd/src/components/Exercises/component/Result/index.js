import React , {Component} from 'react';
import { Link } from 'react-router-dom';

class Result extends Component {
	render() {
		return(
			<React.Fragment>
				<div className="text-center w-2/5 mx-auto">
					<div className="card mx-auto">
						<p>Kamu mendapatkan nilai</p>
						<h1 className={`text-6xl font-bold ${ (this.props.score > 70) ? `text-teal-500` : `text-red-500`  }`}>{this.props.score}</h1>
						<p>Terima kasih telah mengerjakan denga sungguh-sungguh.</p>
						<p>Selamat belajar kembali!</p>
						<div className="text-center">
							<Link to="/student/dashboard" className="button bg-blue inline-block">Dashboard</Link>
						</div>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

export default Result;
	