// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract LegalETH is ERC20 {

  string public constant NAME = "LegalETH";
  string public constant SYMBOL = "LETH";

  constructor() ERC20(NAME, SYMBOL) {
    exchangeAddress = msg.sender;
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
  function balanceOf(address account) public view override returns (uint256) {
    return super.balanceOf(account);
  }

  // Función para consultar el saldo de un cliente
  function myBalance() public view  returns (uint256) {
    return super.balanceOf(msg.sender);
  }

  // Función personalizada para que la exchange cree y envíe tokens a los clientes
  function mintTokens(address client, uint256 amount) public onlyExchange {
    _safeMint(client, amount);
  }

  // Modifier para restringir la función a la exchange
  modifier onlyExchange() {
    require(msg.sender == exchangeAddress, "Only the exchange can mint tokens");
    _;
  }

  // Variable para almacenar la dirección de la exchange
  address public exchangeAddress;
}
