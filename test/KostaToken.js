var KostaToken = artifacts.require("./KostaToken.sol");

contract('KostaToken', function(accounts) {

	var tokenInstance;

	it('initializes the contract with the correct values', function(){
		return KostaToken.deployed().then(function(instance){
			tokenInstance = instance;
			return tokenInstance.name();
		}).then(function(name) {
			assert.equal(name, 'KostaToken', 'has the correct name');
			return tokenInstance.symbol();
		}).then(function(symbol) {
			assert.equal(symbol, 'KOSTA', 'has the correct symbol');
			return tokenInstance.standard();
		}).then(function(standard) {
			assert.equal(standard, 'KostaToken v1.0', 'has the correct standard');
		});
	})

	it('sets the total supply upon deployment', function(){
		return KostaToken.deployed().then(function(instance){
			tokenInstance = instance;
			return tokenInstance.totalSupply();
		}).then(function(totalSupply) {
			assert.equal(totalSupply.toNumber(), 21000000, 'allocates initial supply to 21,000,000');
			return tokenInstance.balanceOf(accounts[0]);
		}).then(function(adminBalance) {
			assert.equal(adminBalance.toNumber(), 21000000, 'it allocateds the initial supply to the admin account');
		});
	});
});