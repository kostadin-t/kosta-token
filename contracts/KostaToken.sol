pragma solidity ^0.4.2;

contract KostaToken {

	string public name = "KostaToken";

	string public symbol = "KOSTA";

	string public standard = "KostaToken v1.0";


	uint256 public totalSupply;

	mapping(address => uint256) public balanceOf;

	constructor(uint256 _initialSupply) public {
		balanceOf[msg.sender] = _initialSupply;
		totalSupply = _initialSupply;
	}
}