import React , { useContext } from 'react';
import { motion } from 'framer-motion';
import Variants from '../../../../../../../../components/Variants/';
import { DetailContext } from '../../context.js';
import Loading from '../../../../../../../../components/Loading/';

const Description = () => {
	let context = useContext(DetailContext);
	if (context.loading.payment) {
		return (
				<Loading status={context.loading.payment} size="large" />
		)
	} else {
		return (
			<React.Fragment>
				<motion.div className="card"
					variants={Variants}
					initial="cardInit"
					animate="cardAnimate"
					transition={{...Variants.cardTransition , delay: .2}}
				>
					<div className="my-2">
						<h3 className="font-semibold">Nama Pembayaran</h3>
						<p>{context.payment.name}</p>
					</div>
					<div className="my-2">
						<h3 className="font-semibold">Nominal</h3>
						<p>{context.payment.total}</p>
					</div>
					<div className="my-2">
						<h3 className="font-semibold">Kelas</h3>
						<p>{context.payment.class_name}</p>
					</div>
					<div className="my-2">
						<h3 className="font-semibold">Dibuat Pada</h3>
						<p>{context.payment.created_at}</p>
					</div>
					<div className="my-2">
						<h3 className="font-semibold">Deskripsi</h3>
						<p>{context.payment.description}</p>
					</div>
				</motion.div>	
			</React.Fragment>
		)
	}
	
}


export default Description;
	