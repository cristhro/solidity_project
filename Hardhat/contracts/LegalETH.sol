// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract LegalETH is ERC20 {

  string public constant NAME = "LegalETH";
  string public constant SYMBOL = "LETH";
  address public owner;   // Dirección de la manager

  event OnMintStart(address indexed sender, address indexed client,  uint256 amount);
  event OnMintEnd(address indexed sender,address indexed client, uint256 amount);

  constructor() ERC20(NAME, SYMBOL) {
    owner = msg.sender;
  }

  function setOwner(address newOwner) public {
    require(msg.sender == owner, "Only the current manager can change the manager address");
    owner = newOwner;
  }


  // Función para transferir tokens entre clientes
  function transfer(address recipient, uint256 amount) public override returns (bool) {
    _transfer(msg.sender, recipient, amount);
    return true;
  }

  function transferFrom(address sender, address recipient, uint256 amount) public override returns (bool) {
    _transfer(sender, recipient, amount);
    return true;
  }

  // Función para aprobar transferencias de terceros
  function approve(address spender, uint256 amount) public override returns (bool) {
    _approve(msg.sender, spender, amount);
    return true;
  }

  // Función para consultar el saldo de un cliente
  function balanceOf(address account) public onlyOwner view override returns (uint256) {
    return super.balanceOf(account);
  }

  // Función para consultar el saldo de un cliente
  function myBalance() public view  returns (uint256) {
    return super.balanceOf(msg.sender);
  }

  // Función personalizada para que la manager cree y envíe tokens a los clientes
  function mintTokens(address client, uint256 amount) public onlyOwner {
    emit OnMintStart(msg.sender, client, amount);
    _mint(client, amount);
    emit OnMintEnd(msg.sender,client, amount);
  }

  // Modifier para restringir la función a la manager
  modifier onlyOwner() {
    require(msg.sender == owner, "Only the manager can mint tokens");
    _;
  }


}
