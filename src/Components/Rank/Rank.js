import React from 'react'


const Rank = ({name, entries}) => {
	return(
		<div>
			<div className='White f3'>
				{`${name}, your current rank is...`}
			</div>
			<div className='White f1'>
				{entries}
			</div>
		</div>
	)
}

export default Rank;