import React, { Component, createRef } from "react";
import styles from "./Modal.module.css";

class Modal extends Component {
  overlayRef = createRef();

  componentDidMount() {
    window.addEventListener("keydown", this.handleKeyPress);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKeyPress);
  }

  handleKeyPress = e => {
    if (e.code !== "Escape") return;
    this.props.onCloseModal();
  };

  handleOverlayClick = e => {
    const { current } = this.overlayRef;
    if (current && e.target !== current) return;
    this.props.onCloseModal();
  };

  render() {
    const { imgUrl } = this.props;
    return (
      <div
        ref={this.overlayRef}
        onClick={e => this.handleOverlayClick(e)}
        className={styles.Overlay}
      >
        <div className={styles.Modal}>
          <img src={imgUrl} alt="" width="880" />
        </div>
      </div>
    );
  }
}

export default Modal;
