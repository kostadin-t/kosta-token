App = {
	web3Provider: null,
	contracts: {},

	init: function() {
		return App.initWeb3();
				console.log("hi");

	},

	initWeb3: function() {
		if(typeof web3 !== 'undefined') {
			App.web3Provider = web3.currentProvider;
			web3 = new Web3(web3.currentProvider);
		} else {
			App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
			web3 = new Web3(App.web3Provider);
		}

		return App.initContracts();
	},

	initContracts: function() {
		$.getJSON("KostaTokenSale.json", function(kostaTokenSale) {
			App.contracts.KostaTokenSale = TruffleContract(kostaTokenSale);
			App.contracts.KostaTokenSale.setProvider(App.web3Provider);
			App.contracts.KostaTokenSale.deployed().then(function(kostaTokenSale) {

			});
			}).done(function() {
				$.getJSON("KostaToken.json", function(kostaToken) {
					App.contracts.KostaToken = TruffleContract(kostaToken);
					App.contracts.KostaToken.setProvider(App.web3Provider);
					App.contracts.KostaToken.deployed().then(function(kostaToken) {

					});
				return App.render();
			});
		})
	},

	render: function() {
		web3.eth.getCoinbase(function(err, account) {
      if(err == null) {
      	console.log("account", account);
        App.account = account;
        $('#accountAddress').html("Your Account: " + account);
      }
     })
	}

}

$(function() {
	$(window).load(function() {
		App.init();
	})
});