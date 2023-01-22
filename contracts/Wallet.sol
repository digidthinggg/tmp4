// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

contract Wallet {
  event Receive(address indexed sender, uint value, uint balance);
  event StartTransaction(
    address sender,
    uint txIndex,
    address recipient,
    uint amount
  );

  address payable public owner;
  mapping(address => bool) isOwner;

  struct Transaction {
    address recipient;
    uint amount;
    uint numLayersSuccessful;
    bool executed;
  }

  Transaction[] public transactions;

  modifier onlyOwner() {
    require(isOwner[msg.sender], "not owner");
    _;
  }

  constructor() {
    owner = payable(msg.sender);
  }

  //constructor(address[] memory _layers) {
    //require(_layers.length > 0, "layers required");
    //require(owner != address(0), "invalid owner");
  //}

  receive() external payable {
    emit Receive(msg.sender, msg.value, address(this).balance);
  }

  function getNumber() public pure returns (int) {
    return 8;
  }

  function getOwner() public view returns (address payable) {
    return owner;
  }

  function startTransaction(
    address _recipient,
    uint _amount
  ) public onlyOwner {
    uint txIndex = transactions.length;

    transactions.push(
      Transaction({
        recipient: _recipient,
        amount: _amount,
        numLayersSuccessful: 0,
        executed: false
      })
    );

    emit StartTransaction(msg.sender, txIndex, _recipient, _amount);
  }
}
