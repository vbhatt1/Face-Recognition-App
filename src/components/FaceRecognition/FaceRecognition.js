import React from 'react';

const FaceRecognition = ({imagelink}) => {
	return (
		<div className="center ma">
			<div className="absolute mt2">
				<img src={imagelink} alt="Face detection" width="400px" height="auto"/>
			</div>
		</div>
	);
};

export default FaceRecognition;