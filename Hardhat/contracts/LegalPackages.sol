// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract LegalPackages is ERC1155, Ownable {
    // Dirección del contrato de legalETH, el token ERC-20
    LegalETH public legalEth; // TODO: revisar 

    uint256 public constant PACKAGE_BASIC = 1;
    uint256 public constant PACKAGE_STANDARD = 2;
    uint256 public constant PACKAGE_PREMIUM = 3;

    struct PackageInfo {
        string name;
        uint256 hours;
        uint256 price; // Precio en legalETH
    }

    mapping(uint256 => PackageInfo) public packageDetails;

    constructor(address _legalETH) ERC1155("https://example.com/api/item/{id}.json") {
        legalETH = LegalETH(_legalETH);
        
        // Definir los paquetes con su precio en legalETH
        packageDetails[PACKAGE_BASIC] = PackageInfo("Basic Legal Advice", 5, 50 * (10 ** 18)); // 50 legalETH, ajustar según la denominación del token
        packageDetails[PACKAGE_STANDARD] = PackageInfo("Standard Legal Advice", 10, 90 * (10 ** 18)); // 90 legalETH
        packageDetails[PACKAGE_PREMIUM] = PackageInfo("Premium Legal Advice", 20, 160 * (10 ** 18)); // 160 legalETH
    }

    // Función para comprar paquetes de asesoría legal
    function buyPackage(uint256 packageId, uint256 amount) public {
        require(packageDetails[packageId].hours != 0, "Package does not exist");
        uint256 totalPrice = packageDetails[packageId].price * amount;
        
        // Transferencia de legalETH desde el comprador al contrato como pago
        require(legalETH.transferFrom(msg.sender, address(this), totalPrice), "Payment failed");

        // Acuñar el paquete y enviarlo al comprador
        _mint(msg.sender, packageId, amount, "");
    }

    function setURI(string memory newuri) public onlyOwner {
        _setURI(newuri);
    }

    function getPackageDetails(uint256 id) public view returns (PackageInfo memory) {
        require(packageDetails[id].hours != 0, "Package does not exist");
        return packageDetails[id];
    }
}
