		import React from 'react';
import './ImageLinkForm.css'

const ImageLinkForm = ({textchange,buttondetect}) => {
	return (
		<div>
			<p className="f3">
				{'This Magic Brain will detect faces in your pictures. Give it a try.'}
			</p>
			<div className="center">
				<div className="form center pa4 br3 shadow-5">
					<input type="text" className="f4 pa2 w-70 center" onChange={textchange}/>
					<button className="tc w-30 grow f6 link ph3 pv2 dib white bg-light-purple" 
					onClick={buttondetect}>Detect</button>
				</div>
			</div>
		</div>
	);
}

export default ImageLinkForm;