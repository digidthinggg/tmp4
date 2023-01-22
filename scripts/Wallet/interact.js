const ethers = require("ethers")

const CONTRACT_ARTIFACT_PATH = process.env.WALLET_CONTRACT_ARTIFACT_PATH
const CONTRACT_ADDRESS = process.env.WALLET_CONTRACT_ADDRESS

// const TOKEN_CONTRACT_ADDRESS = process.env.TOKEN_CONTRACT_ADDRESS

const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY
const METAMASK_PKEY = process.env.METAMASK_PKEY

const provider = new ethers.providers.AlchemyProvider(network="goerli", ALCHEMY_API_KEY)
const signer = new ethers.Wallet(METAMASK_PKEY, provider)
const Contract = require(CONTRACT_ARTIFACT_PATH)
const contract = new ethers.Contract(CONTRACT_ADDRESS, Contract.abi, signer)

// vars for contract..
const TRANSFER_TO_ADDR = "0xC87449ae2bCcf7B858C21fB8174C2aa597c7dC2b"
const TRANSFER_AMOUNT = 1

async function main() {
  const number = await contract.getNumber()
  console.log(">>> number")
  console.log(number)

  const owner = await contract.getOwner()
  console.log(">>> owner")
  console.log(owner)

  await contract.startTransaction(TRANSFER_TO_ADDR, TRANSFER_AMOUNT)
}

main().catch(error => {
  console.log(error)
  process.exitCode = 1
})

contract.on("Receive", (sender, value, balance) => {
  console.log("EVENT Wallet: Receive")
  console.log("sender: ", sender)
  console.log("value:  ", value)
  console.log("balance:", balance)
})

contract.on("StartTransaction", (sender, txIndex, recipient, amount) => {
  console.log("EVENT Wallet: StartTransaction");
  console.log("sender:   ", sender)
  console.log("txIndex:  ", txIndex)
  console.log("recipient:", recipient)
  console.log("amount:   ", amount)
})

/*
contract.on("SetTokenContractAddress", (_tokenAddr) => {
  console.log("EVENT Wallet: SetTokenContractAddress");
  console.log(_tokenAddr);
})

contract.on("Receive", (sender, amount, balance) => {
  console.log("EVENT Wallet: Receive");
  console.log("sender:", sender)
  console.log("amount:", amount)
})

contract.on("MintSmartTokensForTokens", () => {
  console.log("EVENT Wallet: MintSmartTokensForTokens");
})
*/
