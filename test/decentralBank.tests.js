var Web3 = require("web3");
var web3 = new Web3();
const Tether = artifacts.require('Tether');
const RWD = artifacts.require('RWD');
const DecentralBank = artifacts.require('DecentralBank');

require('chai').use(require('chai-as-promised')).should()

contract ('DecentralBank', ([owner, customer]) => {
    let tether, rwd, decentralBank

    function tokens(number) {
        return web3.utils.toWei(number, 'ether');
    }
    // runs before the test and describe
    before(async() => {
        // Load Contracts
        tether = await Tether.new()
        rwd = await RWD.new()
        decentralBank = await DecentralBank.new(rwd.address, tether.address)

        // Transfer all tokens to Decentral Bank (1 Million)
        await rwd.transfer(decentralBank.address, tokens('1000000'))

        // Transfer 100 mock Tethers to Customer
        await tether.transfer(customer , tokens('100'), {from: owner})
    });

    describe('Mock Tether Deployment', async () => {
        it('matches name successfully!!', async () => {
            const name = await tether.name()
            assert.equal(name, 'Tether');
        });
    })  

    describe('Reward Token', async () => {
        it('matches name successfully!!', async () => {
            const name = await rwd.name()
            assert.equal(name, 'Reward Token');
        });
    })  

    describe('Decentral Bank Deployment', async () => {
        it('matches name successfully!!', async () => {
            const name = await decentralBank.name()
            assert.equal(name, 'DecentralBank');
        });

        it('Contract has tokens', async () => {
            let balance = await rwd.balanceOf(decentralBank.address)
            assert.equal(balance, tokens('1000000'));
        });
        describe('Yield Farming ', async () => {
            it('rewards tokens for staking', async () => {
                let result

                // Check Investor Balance 
                result = await tether.balanceOf(customer)
                assert.equal(result.toString(), tokens('100'), 'customer mock wallet balance before staking');

                // Check Staking For Customer of 100 tokens
                await tether.approve(decentralBank.address, tokens('100'), {from: customer})
                await decentralBank.depositTokens(tokens('100'), {from: customer})

                // Check Updated Balance of Customer
                result = await tether.balanceOf(customer)
                assert.equal(result.toString(), tokens('0'), 'customer mock wallet balance after staking');

                // Check Updated Balance of Decentral Bank
                result = await tether.balanceOf(decentralBank.address)
                assert.equal(result.toString(), tokens('100'), 'decentral bank mock wallet balance before staking');

                // Is Staking Update
                result = await decentralBank.isStaking(customer)
                assert.equal(result.toString(), 'true', "Customer is staking balance to be true");

                // Issue Tokens
                await decentralBank.issueTokens({from: owner})

                // Ensure Only The Owner Can Issue Tokens
                await decentralBank.issueTokens({from: customer}).should.be.rejected

                // Unstake Tokens
                await decentralBank.unstakeTokens({from: customer})

                // Check Unstaking Balances
                result = await tether.balanceOf(customer)
                assert.equal(result.toString(), tokens('100'), 'customer mock wallet balance after unstaking');

                // Check Updated Balance of Decentral Bank
                result = await tether.balanceOf(decentralBank.address)
                assert.equal(result.toString(), tokens('0'), 'decentral bank mock wallet balance before staking');

                // Is Staking Updated
                result = await decentralBank.isStaking(customer)
                assert.equal(result.toString(), 'false', "Customer is no longer staking after staking");

            });
        })
    })  
})