const Variants = {
	sideInit: {
		x: '-100%',
	},
	sideAnimate: {
		x: 0,
	},
	sideTransition: {
		duration: 1.2,
		type: 'spring',
		bounce: .5,
	},


	tInit: {
		opacity: 0,
		x: 40,
	},
	tAnimate: {
		opacity: 1,
		x: 0,
	},
	tTransition: {
		duration: 1,
		type: 'spring',
		bounce: 0.6
	},

	btnHeadInit: {
		opacity: 0,
		x: 20,
	},
	btnHeadAnimate: {
		opacity: 1,
		x: 0,
	},
	btnHeadtransition: {
		duration: 1,
		delay: .1,
		type: 'spring',
		bounce: .7
	},

	cardInit: {
		opacity: 0,
		y: 40,
	},
	cardAnimate: {
		opacity: 1,
		y: 0,
	},
	cardTransition: {
		duration: 1,
		type: 'spring',
		bounce: .5
	},

	cDashInit: {
		opacity: 0,
		x: 30,
	},
	cDashAnimate: {
		opacity: 1,
		x: 0,
	},
	cDashTransition: {
		duration: 1,
		type: 'spring',
		bounce: .6,
	},
}

export default Variants;