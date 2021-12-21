pragma solidity ^0.5.0;

import './RWD.sol';
import './Tether.sol';

contract DecentralBank {
    string public name = 'DecentralBank';
    address public owner;
    Tether public tether;
    RWD public rwd;

    address[] public stakers;

    mapping(address => uint) public stakingBalance;
    mapping(address => bool) public hasStaked;
    mapping(address => bool) public isStaking;

    constructor(RWD _rwd, Tether _tether) public {
        rwd = _rwd;
        tether = _tether;
        owner = msg.sender;
    }

    function depositTokens(uint _amount) public {

        // Require staking amount to be greater than Zero.
        require(_amount > 0, 'amount cannot be 0');
        // Transfer tether tokens to thus contract address for staking
        tether.transferFrom(msg.sender, address(this), _amount);

        // Update Staking Balance
        stakingBalance[msg.sender] = stakingBalance[msg.sender] + _amount;

        if(!hasStaked[msg.sender]) {
            stakers.push(msg.sender);
    }

    //Update Staking Balance
    isStaking[msg.sender] = true;
    hasStaked[msg.sender] = true;
    }

    // Unstake tokens
    function unstakeTokens() public {
        uint balance = stakingBalance[msg.sender];
        // Require the amount to be greater than zero.
        require(balance > 0, "Staking balance can't be less than Zero");

        // transfer the tokens to the specified contract address from our bank
        tether.transfer(msg.sender, balance);

        // reset staking balance
        stakingBalance[msg.sender] = 0;

        // Updating Stakng Status
        isStaking[msg.sender] = false;

    }

    // Issue Reward
    function issueTokens() public {
        // require the owner to issue tokens only
        require(msg.sender == owner, 'caller must be the owner');
        for (uint i = 0; i < stakers.length; i++) {
            address receipient = stakers[i];
            uint balance = stakingBalance[receipient] / 9; // 9 to create percentage incentive
            if(balance > 0) {
                rwd.transfer(receipient, balance);
            }
        }
    }
}