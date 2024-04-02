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
1. Darse de alta como abogado (A travez del contrato LegalManager)
2. Acuña nuevos tokens LegalCase y los transfiere a los clientes cuando abre un nuevo caso.
3. Determina qué tokens LegalPackages son necesarios para un caso y proporciona esta información al cliente.
4. Recibe pagos en LegalETH cuando los clientes compran tokens LegalPackages (BASIC, STANDARD, PREMIUM).

## Casos de uso para el Cliente
1. Compra tokens LegalETH para usar dentro del sistema (A travez del contrato LegalManager).
2. Recibe tokens LegalCase que representan la propiedad de sus casos legales.
3. Compra tokens LegalPackages según sea necesario para su caso.
   
## Configuración del entorno
#### .env:
```sh
SIGNER_MANAGER_PRIVATE_KEY = TODO: Añadir aqui la clave privada de la cuenta
SIGNER_LAWYER_PRIVATE_KEY = TODO: Añadir aqui la clave privada de la cuenta
SIGNER_CLIENT_PRIVATE_KEY = TODO: Añadir aqui la clave privada de la cuenta

SCHOOL_LEGAL_ETH_ADDRESS = 0xe95d925B5b990fbb68066865F1248c5B88a3Fd4B
SCHOOL_LEGAL_CASE_ADDRESS = 0x880BD7c110bB8BC756e97fF0604419Ec0b20332e
SCHOOL_LEGAL_PACKAGES_ADDRESS = 0x38967172c80CA08cd855489f52a6F2Fdd89836b9
SCHOOL_LEGAL_MANAGER_ADDRESS = 0x9818f52dDc6E32912dA02EfCB8ee399FD858D0D2

ETH_SEPOLIA_TESTNET_RPC = https://ethereum-sepolia.blockpi.network/v1/rpc/public
ETH_SCAN_API_KEY = ''
ETH_SEPOLIA_SCAN_WEB = https://sepolia.etherscan.io/


#### packages.json:
Pre configuración antes ejecutar los test,  el order para ejecutar es importante (Ya que SchoolCertificate depende de SchoolGrades ): 
1. Primero hacer deploy de los contratos deploy 
Resultado: dirección del contrato School token
```sh
  npm run school-token:deploy
   Contract LegalETH () deployed to: 0xe95d925B5b990fbb68066865F1248c5B88a3Fd4B
   Contract LegalCase () deployed to: 0x880BD7c110bB8BC756e97fF0604419Ec0b20332e
   Contract LegalPackages (0xe95d925B5b990fbb68066865F1248c5B88a3Fd4B) deployed to: 0x38967172c80CA08cd855489f52a6F2Fdd89836b9
   Contract LegalManager (0xe95d925B5b990fbb68066865F1248c5B88a3Fd4B,0x880BD7c110bB8BC756e97fF0604419Ec0b20332e) deployed to: 0x9818f52dDc6E32912dA02EfCB8ee399FD858D0D2
```

2. Verificamos LegalETH
```sh
  npm run verify  0xe95d925B5b990fbb68066865F1248c5B88a3Fd4B
  https://sepolia.etherscan.io/address/0xe95d925B5b990fbb68066865F1248c5B88a3Fd4B#code
```
3. Verificamos LegalCase
```sh
  npm run verify  0x880BD7c110bB8BC756e97fF0604419Ec0b20332e
  https://sepolia.etherscan.io/address/0x880BD7c110bB8BC756e97fF0604419Ec0b20332e#code
```
4. Verificamos LegalPackages
```sh
  npm run verify  0x38967172c80CA08cd855489f52a6F2Fdd89836b9 "0xe95d925B5b990fbb68066865F1248c5B88a3Fd4B"
  https://sepolia.etherscan.io/address/0x38967172c80CA08cd855489f52a6F2Fdd89836b9#code
```
5. Verificamos LegalManager
```sh
  npm run verify  0x9818f52dDc6E32912dA02EfCB8ee399FD858D0D2 "0xe95d925B5b990fbb68066865F1248c5B88a3Fd4B" "0x880BD7c110bB8BC756e97fF0604419Ec0b20332e"
  https://sepolia.etherscan.io/address/0x9818f52dDc6E32912dA02EfCB8ee399FD858D0D2#code
```
6. Configuramos las variables de entorno en .env
```sh
SCHOOL_LEGAL_ETH_ADDRESS = 0xe95d925B5b990fbb68066865F1248c5B88a3Fd4B
SCHOOL_LEGAL_CASE_ADDRESS = 0x880BD7c110bB8BC756e97fF0604419Ec0b20332e
SCHOOL_LEGAL_PACKAGES_ADDRESS = 0x38967172c80CA08cd855489f52a6F2Fdd89836b9
SCHOOL_LEGAL_MANAGER_ADDRESS = 0x9818f52dDc6E32912dA02EfCB8ee399FD858D0D2

```

 
## Descripción de los nuevos casos de uso y los tests aplicados
  

 ### TEST 1: Cliente compra tokens LegalETH usando LegalManager: 
  Cliente compra tokens LegalETH para usar dentro del sistema [test1]
  
  - Requisitos: Tener configurado la variable de entorno LEGAL_MANAGER_CONTRACT_ADDRESS, LEGAL_ETH_CONTRACT_ADDRESS en .env
    ```sh
      npm run test1 
      > hardhat run scripts/test1_client_buy_tokens.ts --network ethereum_sepolia_testnet_as_client
    
    ```
  - Resultado: https://sepolia.etherscan.io/tx/0xb752b286b35499be2f77519a44d6a18307e84da289bc59cc2c7aab1272dc5266

### TEST 2: Cliente ve su balance: 
  - Requisitos: Tener configurado la variable de entorno LEGAL_ETH_CONTRACT_ADDRESS en .env
    ```sh
      npm run test2 
      > hardhat run scripts/test2_client_my_balance.ts --network ethereum_sepolia_testnet_as_client
    
    ```
  - Resultado: myBalance: BigNumber { value: "300" }

   
### TEST 3:  Alta abogado: 
  Abogado se da de alta a travez de  LegalManager
  
  - Requisitos: Tener configurado la variable de entorno LEGAL_MANAGER_CONTRACT_ADDRESS, SCHOOL_LEGAL_CASE_ADDRESS en .env
    ```sh
      npm run test3
      > hardhat run scripts/test3_manager_add_lawyer.ts --network ethereum_sepolia_testnet_as_manager
    
    ```
  - Resultado: https://sepolia.etherscan.io/tx/0x13468f1d32d206310433648078fade741db45a35e8de0c76a4ee225e09366d07

 ### TEST 4: Abogado ver info
  - Requisitos: Tener configurado la variable de entorno SCHOOL_CERTIFICATE_CONTRACT_ADDRESS, LAWYER_ADDRESS en .env
    ```sh
      npm run test2 
      > hardhat run scripts/test4_manager_read_info_lawyer.ts --network ethereum_sepolia_testnet_as_lawyer
    
    ```
  - Resultado:  lawyerInfo: [
      'Cristhian',
      '023432432L',
      true,
      name: 'Cristhian',
      registrationNumber: '023432432L',
      active: true
    ]

 ### TEST 5: Abogado Abre un caso 
  Abogado Acuña nuevos tokens LegalCase y los transfiere al cliente clientes cuando abre un nuevo caso : 
  
  - Requisitos: Tener configurado la variable de entorno LEGAL_CASE_CONTRACT_ADDRESS en .env
    ```sh
      npm run test5 
      > hardhat run scripts/test5_lawyer_open_case.ts --network ethereum_sepolia_testnet_as_lawyer
    
    ```
  - Resultado: https://sepolia.etherscan.io/tx/0x58c80027c73b1adb4ea164b048e71afd0a05d2bca798fb7cdd20a41cb478d050



 ### TEST 6: Cliente Comprar packages 
  Compra tokens LegalPackages según sea necesario para su caso: 
   
  - Requisitos: Tener configurado la variable de entorno SCHOOL_CERTIFICATE_CONTRACT_ADDRESS en .env
    ```sh
      npm run test6 
      > hardhat run scripts/test6_client_buy_packages.ts --network ethereum_sepolia_testnet_as_client
    
    ```
  - Resultado:  Aqui nos falta ver como hacer para llamar firmar el test con la direccion del contrato legal case

  reason: 'invalid signer',
  code: 'INVALID_ARGUMENT',

 

 ### TEST 7: Abogado cierra un caso
  El cliente paga al abogado cuando este se cierra
   
  - Requisitos: Tener configurado la variable de entorno  LEGAL_MANAGER_CONTRACT_ADDRESS, LAWYER_ADDRESS  en .env
    ```sh
      npm run test7 
      > hardhat run scripts/test7_lawyer_close_case.ts --network ethereum_sepolia_testnet_as_manager
    
    ```
  - Resultado:  

  reason: 'underflow',
  code: 'NUMERIC_FAULT',
  fault: 'underflow',
  operation: 'BigNumber.from',
  value: 0.02

 
