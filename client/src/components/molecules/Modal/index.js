import React, { Component } from "react";
import "./index.css";
import Button from "../../atoms/Button";

export default class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listener: false,
      activePage: 0,
    };
  }

  static Pages = ({ actions, pages, setPage, active, closeModal }) => {
    const clonedPages = React.Children.map(pages, page =>
      React.cloneElement(page, {
        setPage,
        closeModal,
        actions,
      })
    );

    return <React.Fragment>{clonedPages[active]}</React.Fragment>;
  };

  static Header = ({ title, closeModal, titleStyle }) => {
    return (
      <React.Fragment>
        <div className="modal-header">
          <span style={titleStyle && { ...titleStyle }}>{title}</span>
          <Button
            background="none"
            onClick={closeModal}
            width="32px"
            height="32px"
          />
        </div>
        <Modal.Divider />
      </React.Fragment>
    );
  };

  static Divider = () => (
    <div className="modal-divider">
      <div className="border"></div>
    </div>
  );

  static Section = props => (
    <React.Fragment>
      <div className="modal-section">{props.children}</div>
      <Modal.Divider />
    </React.Fragment>
  );

  static MenuSection = props => (
    <React.Fragment>
      <div className="modal-menu-section">{props.children}</div>
    </React.Fragment>
  );

  static Column = props => (
    <div className="modal-column" style={props.extraStyles}>
      {props.children}
    </div>
  );

  static Row = props => (
    <div className="modal-row" style={props.extraStyles}>
      {props.children}
    </div>
  );

  static Button = ({ title, subtitle, onClick }) => (
    <button onClick={onClick} className="modal-button">
      {title} {subtitle && <span className="subtitle">{subtitle}</span>}
    </button>
  );

  static Footer = props => <div className="modal-footer">{props.children}</div>;

  static Input = ({ label, value, placeholder, onChange }) => (
    <div className="modal-input">
      {label && <label>{label}</label>}
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e)}
      />
    </div>
  );

  static TextArea = ({ value }) => (
    <textarea value={value} onChange={() => {}}></textarea>
  );

  static DetailedButton = props => (
    <button className="modal-detailed-button">
      <div className="button-title">
        <span className="title">{props.title}</span>
      </div>
      <span>{props.description}</span>
    </button>
  );

  componentDidUpdate = () => {
    const { open } = this.props;
    const { listener } = this.state;

    if (open && !listener) {
      document.addEventListener("mousedown", this.handleFocusClick, false);
      this.setState({ listener: true });
    } else if (!open && listener) {
      document.removeEventListener("mousedown", this.handleFocusClick, false);
      this.setState({ listener: false });
    }
  };

  componentWillUnmount = () => {
    const { listener } = this.state;
    if (!listener) return;

    document.removeEventListener("mousedown", this.handleFocusClick, false);
    this.setState({ listener: false });
  };

  handleFocusClick = e => {
    if (!this.modal.contains(e.target)) {
      this.props.closeModal();
    }
  };

  setActivePage = pageNum => {
    this.setState({ activePage: pageNum });
  };

  determineStyle = () => {
    const { width, height, position, setLocation } = this.props;

    if (setLocation) {
      return {
        width,
        top: position.top,
        right: position.right,
        bottom: position.bottom,
      };
    } else {
      const top = position.y + position.height + 6;
      let left = position.x;

      let widthNum = width.includes("px")
        ? width.slice(0, width.length - 2)
        : console.error("WIDTH CONVERSION NOT HANDLED IN MODAL.");
      widthNum = parseInt(widthNum);

      // don't allow modal to go off screen on horizontal axis
      // give at least 6px of margin to edge
      const modalEndX = widthNum + left + 6;
      if (modalEndX > window.innerWidth) {
        const difference = modalEndX - window.innerWidth;
        left -= difference;
      }

      return {
        width,
        height,
        top,
        left,
      };
    }
  };

  determineClassNames = () => {
    const { className } = this.props;
    return className ? `modal ${className}` : "modal";
  };

  render() {
    const {
      pages,
      open,
      position,
      setLocation,
      actions,
      closeModal,
    } = this.props;

    if (!((open && position.y) || (open && setLocation))) return null;
    return (
      <div
        className={this.determineClassNames()}
        style={this.determineStyle()}
        ref={modal => (this.modal = modal)}
      >
        {pages ? (
          <Modal.Pages
            closeModal={closeModal}
            actions={actions}
            pages={this.props.children}
            setPage={this.setActivePage}
            active={this.state.activePage}
          />
        ) : (
          React.Children.map(this.props.children, child =>
            React.cloneElement(child, {
              closeModal,
              actions,
            })
          )
        )}
      </div>
    );
  }
}
