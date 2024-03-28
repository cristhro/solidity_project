// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./LegalETH.sol";
import "./LegalCase.sol";

// Contrato para LegalManager
contract LegalManager   {
    LegalETH private legalEth;
    LegalCase private legalCase;

    struct Lawyer {
        string name;
        string registrationNumber;
        bool active;
    }

    mapping(address => Lawyer) private lawyers; // Mapa para almacenar los abogados
    address owner;


    constructor(address _legalEth, address _legalCase) {
        legalEth = LegalETH(_legalEth);
        legalCase = LegalCase(_legalCase);
        owner = msg.sender;
    }

    // Lawyer Management
    function addLawyer(address lawyerAddress, string memory name, string memory registrationNumber) public {
        require(msg.sender == owner, "Only the owner can add lawyers");
        lawyers[lawyerAddress] = Lawyer(name, registrationNumber, true);
    }

    function isLawyerActive(address lawyerAddress) public view returns (bool) {
        return lawyers[lawyerAddress].active;
    }

    function getLawyerInfo(address lawyerAddress) public view returns (string memory name, string memory registrationNumber, bool active) {
        Lawyer memory lawyer = lawyers[lawyerAddress];
        return (lawyer.name, lawyer.registrationNumber, lawyer.active);
    }
 
    function buyLegalETH(uint256 amount) public payable  {
        require(amount > 0, 'Debe enviar algun ether para comprar LegalETH');
        legalEth.mintTokens(msg.sender, amount); 
    }

    // Los abogados abren un caso
    function openLegalCase(address client, string memory caseId) public {
        // TODO: use client
        legalCase.mintLegalCase(caseId); // TODO: REVIEW
    }

    // Los abogados cierran un caso y pagan al abogado con LegalETH
    function closeLegalCase(address lawyerAddress, string memory caseId, uint256 amount) public {
        require(msg.sender == owner, "Only the owner can close cases");
        require(lawyers[lawyerAddress].active, "Lawyer is not active");
        // require(legalCase.isCaseOpen(caseId), "Case is not open"); // TODO

        // legalCase.closeCase(caseId); // TODO
        legalEth.transfer(lawyerAddress, amount); 
    }
}