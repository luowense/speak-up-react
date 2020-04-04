import React, { Component } from 'react';
export const GlobalContext = React.createContext();

class GlobalProvider extends Component {
    constructor(props) {
        super(props)
        this.state = {
            endpoint: "http://192.168.0.21:4000",
        }
    }

    componentDidMount = () => {
    }

    render() {
        return (
            <GlobalContext.Provider value={this.state}>
                {this.props.children}
            </GlobalContext.Provider>
        )
    }
}

export default GlobalProvider;
