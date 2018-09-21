App = {
	web3Provider: null,
	contracts: {},
	loading: false,
	tokenPrice: 1000000000000000,
	tokensSold: 0,
	tokensAvailable: 14700000, 

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
				App.listenForEvents();
				return App.render();
			});
		})
	},

	listenForEvents: function() {
		App.contracts.KostaTokenSale.deployed().then(function(instance){
			instance.Sell({}, {
				fromBlock: 0,
				toBlock: 'latest',

				}).watch(function(error, event) {
					App.render();
				})
		})
	},

	render: function() {

		if (App.loading) {
			return;
		}
		App.loading = true;

		var loader = $('#loader');
		var content = $('#content');

		loader.show();
		content.hide();

		web3.eth.getCoinbase(function(err, account) {
      if(err === null) {
      	console.log("account", account);
        App.account = account;
        $('#accountAddress').html("Your Account: " + account);
      }
     })
		App.contracts.KostaTokenSale.deployed().then(function(instance) {
			kostaTokenSaleInstance = instance;
			return kostaTokenSaleInstance.tokenPrice();
		}).then(function(tokenPrice) {
			App.tokenPrice = tokenPrice;
			$('.token-price').html(web3.fromWei(App.tokenPrice, "ether").toNumber());
			return kostaTokenSaleInstance.tokensSold();
		}).then(function(tokensSold) {
			App.tokensSold = tokensSold.toNumber();
			$('.tokens-sold').html(App.tokensSold);
			$('.tokens-available').html(App.tokensAvailable);

			var progressPercent = (Math.ceil(App.tokensSold) / App.tokensAvailable) * 100;
			$('#progress').css('width', progressPercent + '%');

			App.contracts.KostaToken.deployed().then(function(instance) {
				kostaTokenInstance = instance;
				return kostaTokenInstance.balanceOf(App.account);
			}).then(function(balance) {
				$('.kosta-balance').html(balance.toNumber());

				App.loading = false;
		     	loader.hide();
		     	content.show();
			})
		});

     	
	},

	buyTokens: function() {
		$('#content').hide();
		$('#loader').show();

		var numberOfTokens = $('#numberOfTokens').val();
		App.contracts.KostaTokenSale.deployed().then(function(instance) {
			return instance.buyTokens(numberOfTokens, { 
				from: App.account,
				value: numberOfTokens * App.tokenPrice,
				gas: 500000,
			});
		}).then(function(result) {
			$('form').trigger('reset');
			
		});
	}

}

$(function() {
	$(window).load(function() {
		App.init();
	})
});