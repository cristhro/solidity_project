// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "./LegalETH.sol";
import "./LegalCase.sol";

// Contrato para LegalManager
contract LegalManager is ReentrancyGuard  {
    LegalETH private legalEth;
    LegalCase private legalCase;

    constructor(address _legalEth, address _legalCase) {
        legalEth = LegalETH(_legalEth);
        legalCase = LegalCase(_legalCase);
    }

    // Los clientes compren LegalETH
    // function buyLegalETH() public payable nonReentrant {
    //     require(msg.value > 0, 'Debe enviar algun ether para comprar LegalETH');
    //     legalEth.mintTokens(msg.sender, msg.value);
    // }

    function buyLegalETH(uint256 amount) public payable nonReentrant {
        require(amount > 0, 'Debe enviar algun ether para comprar LegalETH');
        legalEth.mintTokens(msg.sender, amount); 
    }

    // Los abogados abran un caso
    function openLegalCase(address client, string memory caseId ) public nonReentrant {
        // TODO: use client
        legalCase.mintLegalCase(caseId); // TODO: REVIEW
    }
}