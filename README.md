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
  
 ### Solicitar certificado: 
  El estudiante solicita un certificado al contrato SchoolCertificate. [school-certificate:test1]
  
  - Requisitos: Tener configurado la variable de entorno SCHOOL_CERTIFICATE_CONTRACT_ADDRESS en .env
    ```sh
      npm run school-certificate:test1 
      > hardhat run scripts/schoolCertificate/test1_student_request_certificate.ts --network ethereum_sepolia_testnet_as_student
      > certificate : [
          'Juan',
          'Tecnología Blockchain',
          BigNumber { value: "2023" },
          false,
          false,
          studentName: 'Juan',
          degree: 'Tecnología Blockchain',
          year: BigNumber { value: "2023" },
          allowed: false,
          granted: false
        ]
    ```
  - Resultado: https://sepolia.etherscan.io/tx/0xeec15338376f02c703bf891035f54cd73b607942d5bf64e365e4ede7c992dcd4

  
 ### Autorizar certificado: 
 El estudiante autoriza al director para que se realice el cargo de 100 Tokens (SchoolTokens) para obtener su certificado una vez aprobado [school-certificate:test2].
   - Requisitos: Tener configurado la variable de entorno SCHOOL_CERTIFICATE_CONTRACT_ADDRESS en .env
   
     ```sh
        npm run school-certificate:test2
        > hardhat run scripts/schoolCertificate/test2_student_allow_certificate.ts --network ethereum_sepolia_testnet_as_student
        > certificate : [
            'Juan',
            'Tecnología Blockchain',
            BigNumber { value: "2023" },
            true,
            false,
            studentName: 'Juan',
            degree: 'Tecnología Blockchain',
            year: BigNumber { value: "2023" },
            allowed: true, <-- ESTO CAMBIA 
            granted: false
          ]
      ```
- Resultado: https://sepolia.etherscan.io/tx/0x77be5c9b57e7e91ebe6b744a2bddbec941d8dbdb8860bcc6d5aee909cbecba37


### Ver solicitud: 
  Como estudiante puedo consultar si mi solicitud ha sido aprobada (granted). [school-certificate:test3].
  - Requisitos: Tener configurado la variable de entorno SCHOOL_CERTIFICATE_CONTRACT_ADDRESS en .env
     ```sh
        npm run school-certificate:test3
        > hardhat run scripts/schoolCertificate/test3_student_view_certificate.ts --network ethereum_sepolia_testnet_as_student
        > certificate : [
            'Juan',
            'Tecnología Blockchain',
            BigNumber { value: "2023" },
            true,
            false,
            studentName: 'Juan',
            degree: 'Tecnología Blockchain',
            year: BigNumber { value: "2023" },
            allowed: true,
            granted: false
          ]
    ```
  ### Firmar certificado: 
  #### El director firmara el certificado, ademas de la transferencia de la cuenta del estudiante a la cuenta del director
  - Al firmar el certificado se generará un certificado ntf (STUCERT) para el estudiante. (Este certificado nft será unico y no podra ser transferido)
  - Requisitos: Tener configurado las variables de entorno SCHOOL_CERTIFICATE_CONTRACT_ADDRESS y STUDENT_ADDRESS en .env
    
  ```sh
      npm run school-certificate:test4
      > hardhat run scripts/schoolCertificate/test4_director_grant_certificate.ts --network ethereum_sepolia_testnet_as_director
      certificate : [
        'Juan',
        'Tecnología Blockchain',
        BigNumber { value: "2023" },
        true,
        false,
        studentName: 'Juan',
        degree: 'Tecnología Blockchain',
        year: BigNumber { value: "2023" },
        allowed: true,
        granted: true <--- ESTO CAMBIA
      ]
    ]
  ```
   - Resultado: https://sepolia.etherscan.io/tx/0x3d1d9251fae5078b58689586bc387d324382aa1eefdf8e35e35e23e8d94cd57a


## Descripción de los nuevos casos de uso del contrato School Event Tickets
  ### Generar tickets : 
  #### El director genera 25 tickets para una excursion (SCHOOL_EVENT_TICKET_EXCURSION)
  - Requisitos: Tener configurado las variables de entorno SCHOOL_EVENT_TICKETS_CONTRACT_ADDRESS, DIRECTOR_ADDRESS, SCHOOL_EVENT_TICKET_EXCURSION en .env
    
  ```sh
      npm run school-event-tickets:test1
      > hardhat run scripts/schoolEventTickets/test1_school_generate_tickets.ts --network ethereum_sepolia_testnet_as_school
    ]
  ```
   - Resultado: https://sepolia.etherscan.io/tx/0x6ae3e547d26bb63b64ac497d40f3393129aa8ecd1af1affe3eb78621e01e7565

  ### Distribuir tickets: 
    #### El director distribuira 3 tickets de los 25  generados (SCHOOL_EVENT_TICKET_EXCURSION) a los estudiantes
    - Requisitos: Tener configurado las variables de entorno SCHOOL_EVENT_TICKETS_CONTRACT_ADDRESS, DIRECTOR_ADDRESS, SCHOOL_EVENT_TICKET_EXCURSION,  STUDENT1_ADDRESS, STUDENT2_ADDRESS, STUDENT3_ADDRESS en .env
      
    ```sh
        npm run school-event-tickets:test2
        > hardhat run scripts/schoolEventTickets/test2_school_distribute_tickets.ts --network ethereum_sepolia_testnet_as_school
        Saldo de entradas de 0xB1b987b0aCc4139e1565256A89E1d3ea8c6Da1bf: 1
        Saldo de entradas de 0x34BF29Fc721353E90C5915fc0eBB317f37Ee13E0: 1
        Saldo de entradas de 0xEDee67926Ff5cB756D50C5A6bECAe8945279003c: 1
      ]
    ```
    - Resultado: https://sepolia.etherscan.io/tx/0x2ab1d5c017630155f2ed939b4f0d72d7c93758d3224c573abf5b0b8c7efa108d
  
  ### Como estudiante consultar mis tickets: 
    - Requisitos: Tener configurado las variables de entorno SCHOOL_EVENT_TICKETS_CONTRACT_ADDRESS, DIRECTOR_ADDRESS, SCHOOL_EVENT_TICKET_EXCURSION,  STUDENT1_ADDRESS en .env
      
    ```sh
        npm run school-event-tickets:test3
        > hardhat run scripts/schoolEventTickets/test2_school_distribute_tickets.ts --network ethereum_sepolia_testnet_as_school
        Saldo de entradas de 0xB1b987b0aCc4139e1565256A89E1d3ea8c6Da1bf: 1
        Saldo de entradas de 0x34BF29Fc721353E90C5915fc0eBB317f37Ee13E0: 1
        Saldo de entradas de 0xEDee67926Ff5cB756D50C5A6bECAe8945279003c: 1
      ]
    ```
    - Resultado: https://sepolia.etherscan.io/tx/0x1164bf43fde0388c10bfa2dceaa74dcc9b7ede444f5f837e21dbfe4de62b1c07
  
  ### Transferir ticket: 
   #### En esta ocasión transferiremos tickets del estudiante 1 al 2 
    - Requisitos: Tener configurado las variables de entorno SCHOOL_EVENT_TICKETS_CONTRACT_ADDRESS, SCHOOL_EVENT_TICKET_EXCURSION,  STUDENT1_ADDRESS STUDENT2_ADDRESS en .env
      
    ```sh
        npm run school-event-tickets:test4
        > hardhat run scripts/schoolEventTickets/test4_school_transfer_ticket_student1_to_student2.ts --network ethereum_sepolia_testnet_as_school
        Student1 0xB1b987b0aCc4139e1565256A89E1d3ea8c6Da1bf: 0
        Student2 0x34BF29Fc721353E90C5915fc0eBB317f37Ee13E0: 2
      ]
    ```
    - Resultado: https://sepolia.etherscan.io/tx/0xc75ef917bffaf749dbe92da6f0b5fac8f993312be58e988b0db8e3117af6a48b



### El estudiante adquiere tickets de eventos escolares: 
   
