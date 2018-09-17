var KostaToken = artifacts.require("./KostaToken.sol");
var KostaTokenSale = artifacts.require("./KostaTokenSale.sol");


module.exports = function(deployer) {
  deployer.deploy(KostaToken, 21000000).then(function() {
  	//Token price is 0.001 Ethereum;
  	var tokenPrice = 1000000000000000;
  	return deployer.deploy(KostaTokenSale, KostaToken.address, tokenPrice);
  });
};