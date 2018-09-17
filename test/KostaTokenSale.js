var KostaTokenSale = artifacts.require("./KostaTokenSale.sol");
var KostaToken = artifacts.require("./KostaToken.sol");


contract('KostaTokenSale', function(accounts) {

	var tokenSaleInstance;
	var tokenInstance;
	var tokenPrice = 1000000000000000;
	var admin = accounts[0];
	var buyer = accounts[1];
	var tokensAvailable = 14700000;
	var numberOfTokens;

	it('initializes the contract with the correct values', function() {
		return KostaTokenSale.deployed().then(function(instance) {
			tokenSaleInstance = instance;
			return tokenSaleInstance.address();
		}).then(function(address) {
			assert.notEqual(address, 0x0, 'has the contract address');
			return tokenSaleInstance.tokenContract();
		}).then(function(address) {
			assert.notEqual(address, 0x0, 'has token contract address');
			return tokenSaleInstance.tokenPrice();
	}).then(function(price) {
		assert.equal(price, tokenPrice, 'token price is correct');
	});

	it('facilitates token buying', function() {
		return KostaTokenSale.deployed().then(function(instance) {
			tokenInstance = instance;
			return tokenSaleInstance.deployed();
		}).then(function(instance) {
			tokenSaleInstance = instance;
			return tokenInstance.transfer(tokenSaleInstance.address, tokensAvailable, { from: admin })
		}).then(function(receipt) {
			numberOfTokens = 10;
			return tokenSaleInstance.buyTokens(numberOfTokens, { from: buyer, value: numberOfTokens * tokenPrice })
		}).then(function(receipt) {
			assert.equal(receipt.logs.length, 1, 'triggers one event');
		    assert.equal(receipt.logs[0].event, 'Sell', 'should be the "Sell" event');
		    assert.equal(receipt.logs[0].args._buyer, buyer, 'logs the account that purchased the tokens');
		    assert.equal(receipt.logs[0].args._amount, numberOfTokens, 'logs the number of tokens purchased');
			return tokenSaleInstance.tokensSold();
		}).then(function(amount) {
			assert.equal(amount.toNumber(), numberOfTokens, 'increments the number of tokens sold');
			return tokenInstance.balanceOf(buyer);
		}).then(function(balance) {
			return tokenInstance.balanceOf(tokenSaleInstance.address);
			assert.equal(balance.toNumber(), numberOfTokens);
		}).then(function(balance) {
			assert.equal(balance.toNumber(), tokensAvailable - numberOfTokens);
			return tokenSaleInstance.buyTokens(numberOfTokens, { 1 });
		}).then(assert.fail).catch(function(error) {
			assert(error.message.indexOf('revert') >= 0, 'msg.value must equal number of tokens in wei');
			return tokenSaleInstance.buyTokens( 30000000, { from: buyer, value: numberOfTokens * tokenPrice });
		}).then(assert.fail).catch(function(error) {
			assert(error.message.indexOf('revert') >= 0, 'cannot purchase more tokens than available');
		});
	});
});