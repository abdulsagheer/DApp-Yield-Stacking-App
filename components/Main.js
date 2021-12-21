
import React from "react";
import tether from '../tether.png'
import Airdrop from './Airdrop'
const Web3 = require('web3');
const web3 = window.web3;

class Main extends React.Component {
    render() {
        return (
           <div>
                <div id='content' className='mt-3'>
                    <table className='table text-muted text-center'>
                        <thead>
                            <tr style={{color: 'white'}}>
                                <th scope='col'>Staking Balance</th>
                                <th scope='col'>reward Balance</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr style={{color: 'white'}}>
                                <td>{window.web3.utils.fromWei(String(this.props.stakingBalance), 'ether')} USDT</td>
                                <td>{window.web3.utils.fromWei(String(this.props.rwdBalance), 'ether')} RWD</td> 
                            </tr>
                        </tbody>
                    </table>
                    <div className='card mb-2' style={{opacity: '0.9'}}>
                        <form onSubmit={(event) => {
                            event.preventDefault()
                            let amount
                            amount = this.input.value.toString()
                            amount = window.web3.utils.toWei(amount, 'ether')
                            this.props.stakeTokens(amount)
                        }} 
                        className='mb-3'>
                            <div style={{borderSpacing: '0 1em'}}>
                                <label className='float-left' style={{marginLeft: '15px'}}>
                                    <b>Stake Tokens</b>
                                </label>
                                <span className='float-right' style={{marginRight: '8px'}}>Balance: {window.web3.utils.fromWei(this.props.tetherBalance, 'ether')}</span>
                                <div className='input-group mb-4'>
                                    <input ref={(input) => {this.input = input}} type='text' placeholder='0' required />
                                    <div className='input-group-open'>
                                        <div className='input-group-text'>
                                            <img src={tether} alt='tether' height='32' /> &nbsp;&nbsp;&nbsp;USDT
                                        </div>
                                    </div>
                                </div>
                                <button type='submit' className='btn btn-primary btn-lg btn-block'>DEPOSIT</button>
                            </div>
                        </form>
                        <button
                        type='submit'
                        onClick={(event) => {
                            event.preventDefault(
                                this.props.unstakeTokens()
                            )
                        }}
                         className='btn btn-primary btn-lg btn-block'>WTHDRAW</button>
                        <div className='card-body text-center' style={{color:'blue'}}>
                            AIRDROP <Airdrop stakingBalance = {this.props.stakingBalance}/>
                        </div>
                    </div>
                </div>
           </div>
        )
    }
}

export default Main;

