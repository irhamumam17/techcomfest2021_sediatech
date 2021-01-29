import React , {Component} from 'react';
import company1 from '../../assets/company/company-1.svg';
import company2 from '../../assets/company/company-2.svg';
import company3 from '../../assets/company/company-3.svg';
import company4 from '../../assets/company/company-4.svg';

class Partner extends Component {
	render() {
		return(
			<section className="p-8 md:p-16 bg-white">
				<h2 className="text-2xl text-center uppercase md:capitalize md:text-5xl mb-2">Media Partner</h2>
				<div className="flex flex-col md:flex-row gap-6 m-auto w-full md:w-4/5">
					<div className="w-full md:w-1/4 bg-opacity-75">
						<img src={company1} className="w-5/6 mx-auto md:w-3/5" alt="company 1" />
					</div>
					<div className="w-full md:w-1/4 bg-opacity-75">
						<img src={company2} className="w-5/6 mx-auto md:w-3/5" alt="company 1" />
					</div>
					<div className="w-full md:w-1/4 bg-opacity-75">
						<img src={company3} className="w-5/6 mx-auto md:w-3/5" alt="company 1" />
					</div>
					<div className="w-full md:w-1/4 bg-opacity-75">
						<img src={company4} className="w-5/6 mx-auto md:w-3/5" alt="company 1" />
					</div>
				</div>
			</section>
		);
	}
}

export default Partner;
	