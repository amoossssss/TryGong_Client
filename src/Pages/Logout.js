import React, {Component} from 'react';

class Logout extends Component {

    componentDidMount(){
        localStorage.removeItem('cookie');
        window.location.replace('/');
    }

    render() {
        return (
            <div>
                Logout!
            </div>
        );
    }
}

export default Logout;
