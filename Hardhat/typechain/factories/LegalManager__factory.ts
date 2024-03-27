/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { LegalManager, LegalManagerInterface } from "../LegalManager";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_legalEth",
        type: "address",
      },
      {
        internalType: "address",
        name: "_legalCase",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "buyLegalETH",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "client",
        type: "address",
      },
      {
        internalType: "string",
        name: "caseId",
        type: "string",
      },
    ],
    name: "openLegalCase",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b5060405161049f38038061049f83398101604081905261002f91610081565b6001600081905580546001600160a01b039384166001600160a01b031991821617909155600280549290931691161790556100b3565b80516001600160a01b038116811461007c57600080fd5b919050565b60008060408385031215610093578182fd5b61009c83610065565b91506100aa60208401610065565b90509250929050565b6103dd806100c26000396000f3fe6080604052600436106100295760003560e01c80638ab7e8a61461002e578063938d907b14610038575b600080fd5b610036610058565b005b34801561004457600080fd5b506100366100533660046101bf565b6100f7565b61006061018e565b600034116100895760405162461bcd60e51b81526004016100809061030d565b60405180910390fd5b600154604051633c37699760e21b81526001600160a01b039091169063f0dda65c906100bb90339034906004016102a1565b600060405180830381600087803b1580156100d557600080fd5b505af11580156100e9573d6000803e3d6000fd5b505050506100f56101b8565b565b6100ff61018e565b60025460405163501f29bd60e11b81526001600160a01b039091169063a03e537a9061012f9084906004016102ba565b602060405180830381600087803b15801561014957600080fd5b505af115801561015d573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906101819190610289565b5061018a6101b8565b5050565b600260005414156101b15760405162461bcd60e51b81526004016100809061035a565b6002600055565b6001600055565b600080604083850312156101d1578182fd5b82356001600160a01b03811681146101e7578283fd5b9150602083013567ffffffffffffffff80821115610203578283fd5b818501915085601f830112610216578283fd5b81358181111561022857610228610391565b604051601f8201601f19908116603f0116810190838211818310171561025057610250610391565b81604052828152886020848701011115610268578586fd5b82602086016020830137856020848301015280955050505050509250929050565b60006020828403121561029a578081fd5b5051919050565b6001600160a01b03929092168252602082015260400190565b6000602080835283518082850152825b818110156102e6578581018301518582016040015282016102ca565b818111156102f75783604083870101525b50601f01601f1916929092016040019392505050565b6020808252602d908201527f4465626520656e7669617220616c67756e206574686572207061726120636f6d60408201526c0e0e4c2e44098cacec2d88aa89609b1b606082015260800190565b6020808252601f908201527f5265656e7472616e637947756172643a207265656e7472616e742063616c6c00604082015260600190565b634e487b7160e01b600052604160045260246000fdfea264697066735822122078b23ebde986f4475d9ab7f7add4ba1891e0c21ff6a7ec404fee4c53dd362d2864736f6c63430008010033";

export class LegalManager__factory extends ContractFactory {
  constructor(
    ...args: [signer: Signer] | ConstructorParameters<typeof ContractFactory>
  ) {
    if (args.length === 1) {
      super(_abi, _bytecode, args[0]);
    } else {
      super(...args);
    }
  }

  deploy(
    _legalEth: string,
    _legalCase: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<LegalManager> {
    return super.deploy(
      _legalEth,
      _legalCase,
      overrides || {}
    ) as Promise<LegalManager>;
  }
  getDeployTransaction(
    _legalEth: string,
    _legalCase: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_legalEth, _legalCase, overrides || {});
  }
  attach(address: string): LegalManager {
    return super.attach(address) as LegalManager;
  }
  connect(signer: Signer): LegalManager__factory {
    return super.connect(signer) as LegalManager__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): LegalManagerInterface {
    return new utils.Interface(_abi) as LegalManagerInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): LegalManager {
    return new Contract(address, _abi, signerOrProvider) as LegalManager;
  }
}