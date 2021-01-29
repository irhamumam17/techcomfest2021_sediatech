import React , {Component} from 'react';
import image from '../../assets/images/reason.png';

class WhyUs extends Component {
	render() {
		return(
			<section className="p-8 md:p-16">
				<h2 className="text-2xl text-center uppercase md:capitalize md:text-5xl mb-2">Mengapa Harus ScevTech ?</h2>
				<div className="w-full md:w-4/5 mx-auto">
					<div className="my-10 items-center text-center flex flex-col md:text-left md:flex-row md:my-20">
						<div className="w-full md:w-1/3">
							<img src={image} alt="reason" className="w-4/5 block m-auto" />
						</div>
						<div className="w-full md:w-2/3">
							<h3 className="text-2xl mb-2">Alasan ke-1</h3>
							<p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Saepe numquam, ea neque fugiat nobis. At quos, illum eveniet. Debitis quaerat, accusamus! Aliquid unde nihil veniam ex suscipit architecto tenetur sit!</p>
						</div>
					</div>
					<div className="my-10 items-center text-center flex flex-col md:text-left md:flex-row-reverse md:my-20">
						<div className="w-full md:w-1/3">
							<img src={image} alt="reason" className="w-4/5 block m-auto" />
						</div>
						<div className="w-full md:w-2/3">
							<h3 className="text-2xl mb-2">Alasan ke-1</h3>
							<p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Saepe numquam, ea neque fugiat nobis. At quos, illum eveniet. Debitis quaerat, accusamus! Aliquid unde nihil veniam ex suscipit architecto tenetur sit!</p>
						</div>
					</div>
					<div className="my-10 items-center text-center flex flex-col md:text-left md:flex-row md:my-20">
						<div className="w-full md:w-1/3">
							<img src={image} alt="reason" className="w-4/5 block m-auto" />
						</div>
						<div className="w-full md:w-2/3">
							<h3 className="text-2xl mb-2">Alasan ke-1</h3>
							<p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Saepe numquam, ea neque fugiat nobis. At quos, illum eveniet. Debitis quaerat, accusamus! Aliquid unde nihil veniam ex suscipit architecto tenetur sit!</p>
						</div>
					</div>
					<div className="my-10 items-center text-center flex flex-col md:text-left md:flex-row-reverse md:my-20">
						<div className="w-full md:w-1/3">
							<img src={image} alt="reason" className="w-4/5 block m-auto" />
						</div>
						<div className="w-full md:w-2/3">
							<h3 className="text-2xl mb-2">Alasan ke-1</h3>
							<p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Saepe numquam, ea neque fugiat nobis. At quos, illum eveniet. Debitis quaerat, accusamus! Aliquid unde nihil veniam ex suscipit architecto tenetur sit!</p>
						</div>
					</div>
					<div className="my-10 items-center text-center flex flex-col md:text-left md:flex-row md:my-20">
						<div className="w-full md:w-1/3">
							<img src={image} alt="reason" className="w-4/5 block m-auto" />
						</div>
						<div className="w-full md:w-2/3">
							<h3 className="text-2xl mb-2">Alasan ke-1</h3>
							<p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Saepe numquam, ea neque fugiat nobis. At quos, illum eveniet. Debitis quaerat, accusamus! Aliquid unde nihil veniam ex suscipit architecto tenetur sit!</p>
						</div>
					</div>
				</div>
			</section>
		);
	}
}

export default WhyUs;
	