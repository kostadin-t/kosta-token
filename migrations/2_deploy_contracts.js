var KostaToken = artifacts.require("./KostaToken.sol");

module.exports = function(deployer) {
  deployer.deploy(KostaToken);
};