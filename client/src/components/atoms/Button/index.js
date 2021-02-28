import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./index.css";

export default class Button extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false,
      showModal: false,
      modalPosition: {},
    };
  }

  handleClick = () => {
    let { refId, onClick } = this.props;

    if (onClick) {
      onClick();
    } else if (refId) {
      let position = ReactDOM.findDOMNode(
        this.refs[refId]
      ).getBoundingClientRect();

      this.setState({
        modalPosition: {
          x: position.x,
          y: position.y,
          height: position.height,
        },
        showModal: true,
      });
    }
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };

  handleHover = cursorIsHovering => {
    this.setState({ hover: cursorIsHovering });
  };

  handleBackground = () => {
    const { background, hoverColor } = this.props;
    const { hover } = this.state;
    let backgroundColor = "";

    if (!hoverColor.length || !hover) {
      switch (background) {
        case "none":
          backgroundColor = hover ? "rgba(0,0,0,0.12)" : "rgba(0,0,0,0.0)";
          break;
        case "light":
          backgroundColor = hover
            ? "rgba(255,255,255,0.2)"
            : "rgba(255,255,255,0.3)";
          break;
        case "dark":
          backgroundColor = hover ? "rgba(0,0,0,0.3)" : "rgba(0,0,0,0.1)";
          break;
        case "blue":
          backgroundColor = hover ? "rgba(255,255,255,0.2)" : "#00c2e0";
          break;
        default:
          backgroundColor = background;
          break;
      }
    } else {
      if (hoverColor.length) {
        switch (hoverColor) {
          case "none":
            backgroundColor = "rgba(0,0,0,0)";
            break;
          case "light":
            backgroundColor = "rgba(255,255,255,0.2)";
            break;
          case "dark":
            backgroundColor = "rgba(0,0,0,0.12)";
            break;
          default:
            backgroundColor = hoverColor;
            break;
        }
      }
    }

    return backgroundColor;
  };

  determineStyle = () => {
    const { width, height, extraStyles } = this.props;
    const style = {
      width,
      height,
      ...extraStyles,
    };

    style.backgroundColor = this.handleBackground();

    return style;
  };

  determineClassNames = () => {
    const { className } = this.props;
    let classes = "btn";
    if (className) {
      classes += ` ${className}`;
    }

    return classes;
  };

  render() {
    let { fontColor, refId, href, name, weight, fontSize, height } = this.props;

    return (
      <React.Fragment>
        <a
          onMouseEnter={() => this.handleHover(true)}
          onMouseLeave={() => this.handleHover(false)}
          onClick={e => this.handleClick(e)}
          className={this.determineClassNames()}
          style={this.determineStyle()}
          href={href}
          ref={refId}
        >
          {name && (
            <span
              style={{
                fontWeight: weight,
                fontSize,
                color: fontColor,
                lineHeight: height,
              }}
              className="name"
            >
              {name}
            </span>
          )}
        </a>
        {React.Children.map(this.props.children, child =>
          React.cloneElement(child, {
            position: this.state.modalPosition,
            open: this.state.showModal,
            closeModal: this.closeModal,
          })
        )}
      </React.Fragment>
    );
  }
}

Button.defaultProps = {
  width: "32px",
  hoverColor: "",
  extraStyles: {},
  height: "32px",
  fontSize: "14px",
  href: "#",
  weight: "700",
};
