var p = {
	onload: function() {
		p.loadStatus();
		setInterval(p.loadStatus, 1000);
	},
	selectedSize: null,
	selectedStrength: null,
	preparing: null,
	preparationTimer: null,
	loadStatus: function() {
		g.ajax({
    		url: "ajax",
    		params: [["action", "getStatus"], ["log", "false"], ["forceLoad", "false"]],
    		callback: function(response) {
    			if(response.success) {
    				p.renderStatus(response.data);
    			} else {
    				g.alert(response.messages);
    			}
    		}
    	});
	},
	renderStatus: function(data) {
		p.renderStatusInfo(data);
		p.renderDrinks(data);
		p.renderCard(data);
	},
	renderCard: function(data) {
		var cardImg = g.getById("cardImg");
		var cardLightImg = g.getById("cardLightImg");
		if(data.card) {
			cardImg.src = "/DrinksMachine/resources/images/cardInserted.png";
			cardLightImg.src = "/DrinksMachine/resources/images/greenLight.png";
			cardImg.className = "enabled";
			cardImg.onclick = p.setCard(false);
		} else {
			cardImg.src = "/DrinksMachine/resources/images/insertCard.png";
			cardLightImg.src = "/DrinksMachine/resources/images/redLight.png";
			if(data.mode == "READY" && data.pluggedIn && data.power && data.water) {
				cardImg.className = "enabled";
				cardImg.onclick = p.setCard(true);
			} else {
				cardImg.className = "disabled";
				cardImg.onclick = null;
			}
		}
	},
	setCard: function(on) {
		return function() {
			g.ajax({
	    		url: "ajax",
	    		params: [["action", "setCard"], ["on", on]],
	    		callback: function(response) {
	    			if(response.success) {
	    				p.renderStatus(response.data);
	    			} else {
	    				g.alert(response.messages);
	    			}
	    		}
	    	});
		}
	},
	renderStatusInfo: function(data) {
		if(data.mode == 'READY' && data.pluggedIn && data.power && data.water) {
			g.getById("statusTextTd").innerHTML = "In operation";
			g.getById("statusImg").src = "/DrinksMachine/resources/images/greenLight.png";
		} else {
			g.getById("statusTextTd").innerHTML = "Out of order";
			g.getById("statusImg").src = "/DrinksMachine/resources/images/redLight.png";
		}
	},
	renderDrinks: function(data) {
		var drinkBtns = g.getByClass("drinkBtn");
		var drinks = data.drinks;
		for(var i = 0; i < drinkBtns.length; i++) {
			var drinkBtn = drinkBtns[i];
			var drink = drinks[i];
			drinkBtn.value = drink.name;
			var listenerId = drink.id + "drinkBtnOnclick";
			if(p.isMakable(data, drink)) {
				drinkBtn.disabled = false;
				drinkBtn.className = "drinkBtn enabled";
				drinkBtn.onclick = p.drinkBtnOnclick(data, drink);
			} else {
				drinkBtn.onclick = function() {};
				drinkBtn.className = "drinkBtn disabled";
				drinkBtn.disabled = true;
			}
		}
	},
	isMakable: function(data, drink) {
		if(!data.card || data.mode != "READY" || !data.pluggedIn || !data.power || !data.water)
			return false;
		var stockEntries = data.stockEntries;
		var maxNeededIngredients = drink.maxNeededIngredients;
		var makable = true;
		OUTER:
		for(var ingredient in maxNeededIngredients) {
			var qty = maxNeededIngredients[ingredient];
			for(var i = 0; i < stockEntries.length; i++) {
				var stockEntry = stockEntries[i];
				if(stockEntry.ingredient == ingredient && stockEntry.current < qty) {
					makable = false;
					break OUTER;
				}
			}
		}
		return makable;
	},
	sizeImgOnclick: function(data, drink, size) {
		return function() {
			for(var i = 0; i < data.sizes.length; i++) {
				if(drink.sizes.includes(data.sizes[i])) {
					var sizeImg = g.getById(data.sizes[i] + "SizeImg");
					if(size == data.sizes[i]) {
						p.selectedSize = size;
						sizeImg.className = "selectedSize";
						sizeImg.onclick = function() {};
						if(size == "REGULAR")
							g.getById("priceInp").value = drink.prices[0];
						else if(size == "LARGE")
							g.getById("priceInp").value = drink.prices[1];
						else if(size == "XXL")
							g.getById("priceInp").value = drink.prices[2];
					} else {
						sizeImg.className = "unSelectedSize";
						sizeImg.onclick = p.sizeImgOnclick(data, drink, data.sizes[i]);
					}
				}
			}
		}
	},
	strengthImgOnclick: function(data, drink, strength) {
		return function() {
			for(var i = 0; i < data.strengths.length; i++) {
				if(drink.strengths.includes(data.strengths[i])) {
					var strengthImg = g.getById(data.strengths[i] + "StrengthImg");
					if(strength == data.strengths[i]) {
						p.selectedStrength = strength;
						strengthImg.className = "selectedStrength";
						strengthImg.onclick = function() {};
					} else {
						strengthImg.className = "unSelectedStrength";
						strengthImg.onclick = p.strengthImgOnclick(data, drink, data.strengths[i]);
					}
				}
			}
		}
	},
	drinkBtnOnclick: function(data, drink) {
		return function() {
			if(!p.preparing) {
				g.getById("optionsTbl").className = "";
				var selectedSize;
				for(var i = 0; i < data.sizes.length; i++) {
					var size = data.sizes[i];
					var sizeImg = g.getById(size + "SizeImg");
					if(drink.sizes.includes(size)) {
						if(selectedSize == null) {
							selectedSize = size;
							p.selectedSize = size;
							sizeImg.className = "selectedSize";
							if(size == "REGULAR")
								g.getById("priceInp").value = drink.prices[0];
							else if(size == "LARGE")
								g.getById("priceInp").value = drink.prices[1];
							else if(size == "XXL")
								g.getById("priceInp").value = drink.prices[2];
						} else {
							sizeImg.className = "unSelectedSize";
							sizeImg.onclick = p.sizeImgOnclick(data, drink, size);
						}
					} else {
						sizeImg.className = "hidden";
					}
				}
				
				var selectedStrength;
				for(var i = 0; i < data.strengths.length; i++) {
					var strength = data.strengths[i];
					var strengthImg = g.getById(strength + "StrengthImg");
					if(drink.strengths.includes(strength)) {
						if(selectedStrength == null) {
							selectedStrength = strength;
							p.selectedStrength = strength;
							strengthImg.className = "selectedStrength";
						} else {
							strengthImg.className = "unSelectedStrength";
							strengthImg.onclick = p.strengthImgOnclick(data, drink, strength);
						}
					} else {
						strengthImg.className = "hidden";
					}
				}
				
				g.getById("prepareBtn").onclick = p.prepareBtnOnclick(drink);
			}
		}
	},
	prepareBtnOnclick: function(drink) {
		return function() {
			if(!p.preparing) {
				p.preparing = true;
				g.getById("optionsTbl").className = "hidden";
				g.ajax({
		    		url: "ajax",
		    		params: [["action", "prepare"], ["drink", drink.id], ["size", p.selectedSize], ["strength", p.selectedStrength]],
		    		callback: function(response) {
		    			if(response.success) {
		    				p.animatePreparation(response.data);
		    			} else {
		    				g.alert(response.messages);
		    			}
		    		}
		    	});
			}
		}
	},
	animatePreparation: function(data) {
		var img = g.getById("cupImg");
		var opacity = Number(img.style.opacity);
		if(opacity < 1) {
			console.log("opacity: " + opacity)
			img.style.opacity = 0.1 + Number(img.style.opacity);
			if(p.preparationTimer == null)
				p.preparationTimer = setInterval(p.animatePreparation, 300, data);
		} else {
			clearInterval(p.preparationTimer);
			p.preparationTimer = null;
			p.renderStatus(data);
			g.getById("cupImg").style.cursor = "pointer";
			g.getById("cupLightImg").style.visibility = "visible";
			g.getById("cupImg").onclick = p.takeCup();
		}
	},
	takeCup: function() {
		return function() {
			var img = g.getById("cupImg");
			g.getById("cupLightImg").style.visibility = "hidden";
			img.style.opacity = 0;
			p.preparing = false;
			img.onclick = null;
		}
	}
};