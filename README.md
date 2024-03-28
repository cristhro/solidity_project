# IEBS

Proyecto Final - Programación de tokens no fungibles (estándares ERC-720 y ERC-1155)
- Grupo: 15
- Cristhian Rodriguez Gomez
- Jesus Rosas Rosales

## Introducción
En este proyecto crearemos un sistema de servicios legales basado en blockchain. Este sistema utiliza la tecnología de contratos inteligentes para facilitar y mejorar la interacción entre abogados y clientes.

En nuestro sistema, utilizamos tres tipos de tokens: LegalETH, LegalCase y LegalPackages. Cada uno de estos tokens tiene un propósito específico:

- LegalETH (ERC-20): Este token actúa como la moneda dentro de nuestro sistema. Los clientes pueden comprar estos tokens y usarlos para pagar los servicios legales.
- LegalCase (ERC-721): Este token representa un caso legal único. Cada vez que un abogado abre un nuevo caso para un cliente, se acuña un nuevo token LegalCase. Este token se transfiere al cliente, representando la propiedad del caso.
- LegalPackages (ERC-1155): Este token representa diferentes paquetes de servicios legales. Los clientes pueden comprar estos tokens con LegalETH según las necesidades de su caso.

Nuestro objetivo es hacer que los servicios legales sean más accesibles y transparentes a través de la tecnología blockchain. Ya sea que seas un abogado buscando una forma eficiente de manejar tus casos, o un cliente buscando una forma transparente y fácil de acceder a los servicios legales, nuestro sistema está diseñado para ti. ¡Esperamos que encuentres nuestro sistema útil y fácil de usar!

## Casos de uso para el Abogado
1. Acuña nuevos tokens LegalCase y los transfiere a los clientes cuando abre un nuevo caso.
2. Determina qué tokens LegalPackages son necesarios para un caso y proporciona esta información al cliente.
3. Recibe pagos en LegalETH cuando los clientes compran tokens LegalPackages.

## Casos de uso para el Cliente
1. Compra tokens LegalETH para usar dentro del sistema.
2. Recibe tokens LegalCase que representan la propiedad de sus casos legales.
3. Compra tokens LegalPackages según sea necesario para su caso.
   
## Configuración del entorno
#### .env:
```sh
SIGNER_MANAGER_PRIVATE_KEY = TODO: Añadir aqui la clave privada de la cuenta
SIGNER_LAWYER_PRIVATE_KEY = TODO: Añadir aqui la clave privada de la cuenta
SIGNER_CLIENT_PRIVATE_KEY = TODO: Añadir aqui la clave privada de la cuenta

SCHOOL_LEGAL_ETH_ADDRESS = 0x23233E30142d3389C0DcA7678029309ada9fe380
SCHOOL_LEGAL_CASE_ADDRESS = 0x329d59eB817d817d6C72e138adBaB21C78CF8b1a
SCHOOL_LEGAL_PACKAGES_ADDRESS = 0x083c4C39e0Fd16C02D8DCbdC9Fd8b923473Ad5b6
SCHOOL_LEGAL_MANAGER_ADDRESS = 0x464b5345485Dda5D96ca516694d1dBC66d456837

ETH_SEPOLIA_TESTNET_RPC = https://ethereum-sepolia.blockpi.network/v1/rpc/public
ETH_SCAN_API_KEY = ''
ETH_SEPOLIA_SCAN_WEB = https://sepolia.etherscan.io/


#### packages.json:
Pre configuración antes ejecutar los test,  el order para ejecutar es importante (Ya que SchoolCertificate depende de SchoolGrades ): 
1. Primero hacer deploy de los contratos deploy 
Resultado: dirección del contrato School token
```sh
  npm run school-token:deploy
   Contract LegalETH () deployed to: 0x23233E30142d3389C0DcA7678029309ada9fe380
   Contract LegalCase () deployed to: 0x329d59eB817d817d6C72e138adBaB21C78CF8b1a
   Contract LegalPackages (0x23233E30142d3389C0DcA7678029309ada9fe380) deployed to: 0x083c4C39e0Fd16C02D8DCbdC9Fd8b923473Ad5b6
   Contract LegalManager (0x23233E30142d3389C0DcA7678029309ada9fe380,0x329d59eB817d817d6C72e138adBaB21C78CF8b1a) deployed to: 0x464b5345485Dda5D96ca516694d1dBC66d456837
```

2. Verificamos LegalETH
```sh
  npm run verify  0x23233E30142d3389C0DcA7678029309ada9fe380
  https://sepolia.etherscan.io/address/0x23233E30142d3389C0DcA7678029309ada9fe380#code
```
3. Verificamos LegalCase
```sh
  npm run verify  0x329d59eB817d817d6C72e138adBaB21C78CF8b1a
  https://sepolia.etherscan.io/address/0x329d59eB817d817d6C72e138adBaB21C78CF8b1a#code
```
4. Verificamos LegalPackages
```sh
  npm run verify  0x083c4C39e0Fd16C02D8DCbdC9Fd8b923473Ad5b6
  https://sepolia.etherscan.io/address/0x083c4C39e0Fd16C02D8DCbdC9Fd8b923473Ad5b6#code
```
5. Verificamos LegalManager
```sh
  npm run verify  0x464b5345485Dda5D96ca516694d1dBC66d456837
  https://sepolia.etherscan.io/address/0x464b5345485Dda5D96ca516694d1dBC66d456837#code
```
6. Configuramos las variables de entorno en .env
```sh
SCHOOL_LEGAL_ETH_ADDRESS = 0x23233E30142d3389C0DcA7678029309ada9fe380
SCHOOL_LEGAL_CASE_ADDRESS = 0x329d59eB817d817d6C72e138adBaB21C78CF8b1a
SCHOOL_LEGAL_PACKAGES_ADDRESS = 0x083c4C39e0Fd16C02D8DCbdC9Fd8b923473Ad5b6
SCHOOL_LEGAL_MANAGER_ADDRESS = 0x464b5345485Dda5D96ca516694d1dBC66d456837

```

 
## Descripción de los nuevos casos de uso y los tests aplicados
  
 ### Cliente compra tokens LegalETH: 
  Cliente compra tokens LegalETH para usar dentro del sistema [test1]
  
  - Requisitos: Tener configurado la variable de entorno SCHOOL_LEGAL_ETH_ADDRESS, SCHOOL_LEGAL_CASE_ADDRESS en .env
    ```sh
      npm run legal-manager-legal-eth:test1 
      > hardhat run scripts/test1_client_buy_tokens.ts --network ethereum_sepolia_testnet_as_client
    
    ```
  - Resultado: https://sepolia.etherscan.io/tx/0xeec15338376f02c703bf891035f54cd73b607942d5bf64e365e4ede7c992dcd4

  
 ### Abogado Abre un caso 
  Abogado Acuña nuevos tokens LegalCase y los transfiere al cliente clientes cuando abre un nuevo caso [test2]: 
  
  - Requisitos: Tener configurado la variable de entorno SCHOOL_CERTIFICATE_CONTRACT_ADDRESS en .env
    ```sh
      npm run test2 
      > hardhat run scripts/test2_lawyer_open_case.ts --network ethereum_sepolia_testnet_as_lawyer
    
    ```
  - Resultado: https://sepolia.etherscan.io/tx/0xeec15338376f02c703bf891035f54cd73b607942d5bf64e365e4ede7c992dcd4


 ### Cliente Comprar packages 
  Compra tokens LegalPackages según sea necesario para su caso. [test3]: 
   
  - Requisitos: Tener configurado la variable de entorno SCHOOL_CERTIFICATE_CONTRACT_ADDRESS en .env
    ```sh
      npm run test3 
      > hardhat run scripts/test3_client_buy_packages.ts --network ethereum_sepolia_testnet_as_client
    
    ```
  - Resultado: https://sepolia.etherscan.io/tx/0xeec15338376f02c703bf891035f54cd73b607942d5bf64e365e4ede7c992dcd4

 
