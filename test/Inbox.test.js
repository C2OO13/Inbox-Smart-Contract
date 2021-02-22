const Web3 = require('web3');
const ganache = require('ganache-cli');
const assert = require('assert');
const web3 = new Web3(ganache.provider());
const {abi,bytecode} = require("../compile");

let accounts;
let inbox;

beforeEach(async ()=>{    
    accounts = await web3.eth.getAccounts();
    // console.log(accounts);
    inbox = await new web3.eth.Contract(abi)
        .deploy({data: bytecode, arguments: ["Test Deployment successful"]})
        .send({from: accounts[0], gas: '1000000',gasPrice: '100000'});
});

describe("Inbox Contract Tests:",()=>{

    it("Deploy test",()=>{
        assert.ok(inbox.options.address);
    });
    
    it("Constructor test",async ()=>{
        const msg = await inbox.methods.message().call();
        assert.strictEqual(msg,"Test Deployment successful");
    });

    it("SetMessage Test",async ()=>{
        await inbox.methods.setMessage("Test successful").send({from: accounts[0]});
        const msg = await inbox.methods.message().call();
        assert.strictEqual(msg, "Test successful");
    });

});

