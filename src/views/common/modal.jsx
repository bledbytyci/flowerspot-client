import React, {Component} from 'react';
import PropTypes from 'prop-types';
import '../../styles/modal.css';

class Modal extends Component {
	static get propTypes() {
		return {
			title: PropTypes.string,
			children: PropTypes.any,
			show: PropTypes.bool,
			onHide: PropTypes.func,
			width: PropTypes.number
		}
	}

	render(){
		const {title, children, show, onHide, width} = this.props;
		return (
			<div className="modal-bg" style={{opacity: show ? '1' : '0'}}>
			<div className="modal-wrapper" style={{
				transform: show ? 'translateY(0vh)' : 'translateY(-100vh)',
				width: width ? `${width}px` : '440px'
				}}>
				<div className="modal-header">
					<div className="modal-title-wrapper">
						<p className="modal-title">{title}</p>
					</div>
					<span className="close-modal-btn" onClick={onHide}>x</span>
				</div>
				<div className="modal-content" style={{
					padding: width ? "0 4rem 3rem 4rem" : "0 1.5rem"
				}}>
					<div className="modal-body">
						{children}
					</div>
				</div>
			</div>
			</div>
		)
	}
}

export default Modal;