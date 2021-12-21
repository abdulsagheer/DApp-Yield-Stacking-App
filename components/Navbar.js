import React from "react";
import bank from '../bank.png';

class Navbar extends React.Component {
    // Our React Code Goes In Her!
    render() {
        return (
            <nav className='navbar navbar-dark fixed-top shadow p-0' style ={{backgroundColor: 'black', height: '50px'}}>
                <a href="#" className='navbar-brand col-sm-3 col-md-2 mr-0' style={{color: 'white'}}>
                <img src={bank} height='30' width='50' className='d-inline-block align-top' alt="Bank" />
                &nbsp;  DAPP Yield Staking (Decentralized Banking) 
                </a>
                <ul className='navbar-nav px-3'>
                    <li className='text-no-wrap d-none nav-item d-sm-none d-sm-block'>
                        <small style={{color: 'white'}}>ACCOUNT NUMBER : {this.props.account}</small>
                    </li>
                </ul>
            </nav>
        )
    }
}

export default Navbar;