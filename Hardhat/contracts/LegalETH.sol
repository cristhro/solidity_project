// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract LegalETH is ERC20 {

  string public constant NAME = "LegalETH";
  string public constant SYMBOL = "LETH";
  address public managerAddress;   // Dirección de la manager


  constructor() ERC20(NAME, SYMBOL) {
    managerAddress = msg.sender;
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
  function balanceOf(address account) public onlyManager view override returns (uint256) {
    return super.balanceOf(account);
  }

  // Función para consultar el saldo de un cliente
  function myBalance() public view  returns (uint256) {
    return super.balanceOf(msg.sender);
  }

  // Función personalizada para que la manager cree y envíe tokens a los clientes
  function mintTokens(address client, uint256 amount) public onlyManager {
    _safeMint(client, amount);
  }

  // Modifier para restringir la función a la manager
  modifier onlyManager() {
    require(msg.sender == managerAddress, "Only the manager can mint tokens");
    _;
  }


}
