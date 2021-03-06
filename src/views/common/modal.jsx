import React, {Component} from 'react';
import PropTypes from 'prop-types';
import '../../styles/modal.css';
import { createPortal } from 'react-dom';

class Modal extends Component {
	static get propTypes() {
		return {
			children: PropTypes.any,
			onHide: PropTypes.func,
			show: PropTypes.bool,
			title: PropTypes.string,
			width: PropTypes.number
		}
	}

	render(){
		const {title, children, show, onHide, width} = this.props;
		return createPortal(
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
			</div>,
			document.getElementById('modal_root')
		)
	}
}

export default Modal;