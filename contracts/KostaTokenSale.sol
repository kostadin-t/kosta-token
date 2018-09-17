pragma solidity ^0.4.2;

import "./KostaToken.sol";

contract KostaTokenSale {

	address admin;
	KostaToken public tokenContract;
	uint256 public tokenPrice;


	constructor(KostaToken _tokenContract, uint256 _tokenPrice) public {
		//Assign an admin
		admin = msg.sender;
		//Token contract
		tokenContract = _tokenContract;
		//Token Price
		tokenPrice = _tokenPrice;

	}
}