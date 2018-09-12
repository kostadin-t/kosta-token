var KostaToken = artifacts.require("./KostaToken.sol");

contract('KostaToken', function(accounts) {
	it('sets the total supply upon deployment', function(){
		return KostaToken.deployed().then(function(instance){
			tokenInstance = instance;
			return tokenInstance.totalSupply();
		}).then(function(totalSupply) {
			assert.equal(totalSupply.toNumber(), 21000000, 'sets the total supply to 21,000,000');
		})
	});
});