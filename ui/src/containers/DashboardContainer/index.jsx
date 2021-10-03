import React, { Component } from "react";

import ChatContainer from "../ChatContainer/index.jsx";

import "./index.less";

export default class DashboardContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            counter: 0
        };
        this.button = React.createRef();
        this.click = this.click.bind(this);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        $(this.button.current).fadeOut(250).fadeIn(250);
    }

    click() {
        this.setState({ counter: this.state.counter + 1 });
    }

    render() {
        const { counter } = this.state;
        return (
            <div className="my-dashboard">
                <ChatContainer />
            </div>
        );
    }
}
