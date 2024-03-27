// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./LegealETH.sol";

// Contrato para LegalManager
contract LegalManager  {
    using SafeERC20 for IERC20;
    LegalETH private legalEth;

    constructor(address _legalEth) {
        legalEth = LegalETH(_legalEth);
    }

    // Los clientes compren LegalETH
    function buyLegalETH() public payable nonReentrant {
        require(msg.value > 0, "Debe enviar algún ether para comprar LegalETH");
        legalEth.mint(msg.sender, msg.value);
    }

    // Los abogados abran un caso
    function openCase(address client) public nonReentrant {
        legalCase.mintCase(client);
    }
}