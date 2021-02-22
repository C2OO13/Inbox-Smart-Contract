const Web3 = require('web3');
const {abi, bytecode} = require("./compile");
const HDWalletProvider = require("@truffle/hdwallet-provider");
const dotenv = require('dotenv');
dotenv.config();
const mnemonicPhrase = process.env.MNEMONIC_PHRASE;

let provider = new HDWalletProvider({
    mnemonic: {
      phrase: mnemonicPhrase
    },
    providerOrUrl: "https://kovan.infura.io/v3/41fb43be2a1e40d5ac7fb04b54e5e7c9"
});

const web3 = new Web3(provider);

const deploy = async ()=>{
    const accounts = await web3.eth.getAccounts();
    console.log("Account to used for deployment of contract: " + accounts[0]);
    const inbox = await new web3.eth.Contract(abi)
        .deploy({data: bytecode, arguments: ["Deployed successfully!!"]})
        .send({from: accounts[0]});
    console.log("Contract deployed at: " + inbox.options.address);
};
deploy();

provider.engine.stop();