var p = {
	onload: function() {
		p.loadStatus();
	},
	setMode: function(mode) {
		g.ajax({
    		url: "ajax",
    		params: [["action", "setMode"], ["mode", mode]],
    		callback: function(response) {
    			if(response.success) {
    				p.renderStatus(response.data);
    			} else {
    				g.alert(response.messages);
    			}
    		}
    	});
	},
	addIngredient: function(ingredient) {
		return function() {
			g.ajax({
	    		url: "ajax",
	    		params: [["action", "addIngredient"], ["ingredient", ingredient]],
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
	removeIngredient: function(ingredient) {
		return function() {
			g.ajax({
	    		url: "ajax",
	    		params: [["action", "removeIngredient"], ["ingredient", ingredient]],
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
	addAlarmQty: function(ingredient) {
		return function() {
			g.ajax({
	    		url: "ajax",
	    		params: [["action", "addAlarmQty"], ["ingredient", ingredient]],
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
	removeAlarmQty: function(ingredient) {
		return function() {
			g.ajax({
	    		url: "ajax",
	    		params: [["action", "removeAlarmQty"], ["ingredient", ingredient]],
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
	addMaxQty: function(ingredient) {
		return function() {
			g.ajax({
	    		url: "ajax",
	    		params: [["action", "addMaxQty"], ["ingredient", ingredient]],
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
	removeMaxQty: function(ingredient) {
		return function() {
			g.ajax({
	    		url: "ajax",
	    		params: [["action", "removeMaxQty"], ["ingredient", ingredient]],
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
	loadStatus: function() {
		g.ajax({
    		url: "ajax",
    		params: [["action", "getStatus"], ["forceLoad", "false"]],
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
		p.renderMode(data);
		p.renderPower(data);
		p.renderPluggedIn(data);
		p.renderWater(data);
		p.renderStock(data);
	},
	renderMode: function(data) {
		var modeBtns = g.getByClass("modeBtn");
		if(!data.pluggedIn || !data.power) {
			for(var i = 0; i < modeBtns.length; i++) {
				modeBtns[i].className = "modeBtn disabled";
				modeBtns[i].disabled = true;
			}
			g.getById("modeImg").src = "/DrinksMachine/resources/images/blackLight.png";
		} else if(data.mode == 'READY') {
			g.getById("modeBtn_READY").className = "modeBtn active";
			g.getById("modeBtn_READY").disabled = false;
			g.getById("modeBtn_MAINTENANCE").className = "modeBtn inactive";
			g.getById("modeBtn_MAINTENANCE").disabled = false;
			g.getById("modeImg").src = "/DrinksMachine/resources/images/greenLight.png";
		} else if(data.mode == 'MAINTENANCE') {
			if(data.water) {
				g.getById("modeBtn_READY").className = "modeBtn inactive";
				g.getById("modeBtn_READY").disabled = false;
			} else {
				g.getById("modeBtn_READY").className = "modeBtn inactive disabled";
				g.getById("modeBtn_READY").disabled = true;
			}
			g.getById("modeBtn_MAINTENANCE").className = "modeBtn active";
			g.getById("modeBtn_MAINTENANCE").disabled = false;
			g.getById("modeImg").src = "/DrinksMachine/resources/images/orangeLight.png";
		}
	},
	renderPower: function(data) {
		var powerImg = g.getById("powerImg");
		var lightImg = g.getById("powerLight");
		if(!data.pluggedIn) {
			powerImg.src = "/DrinksMachine/resources/images/off.jpg";
			lightImg.src = "/DrinksMachine/resources/images/blackLight.png";
			powerImg.className = "";
		} else if(data.power) {
			powerImg.src = "/DrinksMachine/resources/images/on.jpg";
			lightImg.src = "/DrinksMachine/resources/images/greenLight.png";
			powerImg.className = "clickable";
			powerImg.onclick = p.setPower(false);
		} else {
			powerImg.src = "/DrinksMachine/resources/images/off.jpg";
			lightImg.src = "/DrinksMachine/resources/images/blackLight.png";
			powerImg.className = "clickable";
			powerImg.onclick = p.setPower(true);
		}
	},
	renderPluggedIn: function(data) {
		var img = g.getById("connectionImg");
		var lightImg = g.getById("connectionLightImg");
		if(data.pluggedIn) {
			img.src = "/DrinksMachine/resources/images/connected.png";
			lightImg.src = "/DrinksMachine/resources/images/greenLight.png";
			img.onclick = p.setPluggedIn(false);
		} else {
			img.src = "/DrinksMachine/resources/images/disconnected.png";
			lightImg.src = "/DrinksMachine/resources/images/blackLight.png";
			img.onclick = p.setPluggedIn(true);
		}
	},
	renderWater: function(data) {
		var img = g.getById("waterImg");
		var lightImg = g.getById("waterLightImg");
		if(data.water) {
			img.src = "/DrinksMachine/resources/images/water.png";
			lightImg.src = "/DrinksMachine/resources/images/greenLight.png";
			img.onclick = p.setWater(false);
		} else {
			img.src = "/DrinksMachine/resources/images/noWater.png";
			lightImg.src = "/DrinksMachine/resources/images/blackLight.png";
			img.onclick = p.setWater(true);
		}
	},
	renderStock: function(data) {
		var clazz = data.mode == 'MAINTENANCE' ? "plusMinImg clickable" : "plusMinImg disabled";
		for(var i = 0; i < data.stockEntries.length; i++) {
			var stockEntry = data.stockEntries[i];
			var ingredient = stockEntry.ingredient;
			g.getById("currentQtyInp_" + ingredient).value = stockEntry.current;
			g.getById("alarmQtyInp_" + ingredient).value = stockEntry.alarm;
			g.getById("maxQtyInp_" + ingredient).value = stockEntry.max;
			var imgCurrentPlus = g.getById("currentPlus_" + ingredient);
			var imgCurrentMin = g.getById("currentMin_" + ingredient);
			var imgAlarmPlus = g.getById("alarmPlus_" + ingredient);
			var imgAlarmMin = g.getById("alarmMin_" + ingredient);
			var imgMaxPlus = g.getById("maxPlus_" + ingredient);
			var imgMaxMin = g.getById("maxMin_" + ingredient);
			if(data.mode == 'MAINTENANCE') {
				imgCurrentPlus.className = clazz;
				imgCurrentMin.className = clazz;
				imgAlarmPlus.className = clazz;
				imgAlarmMin.className = clazz;
				imgMaxPlus.className = clazz;
				imgMaxMin.className = clazz;
				imgCurrentPlus.onclick = p.addIngredient(ingredient);
				imgCurrentMin.onclick = p.removeIngredient(ingredient);
				imgAlarmPlus.onclick = p.addAlarmQty(ingredient);
				imgAlarmMin.onclick = p.removeAlarmQty(ingredient);
				imgMaxPlus.onclick = p.addMaxQty(ingredient);
				imgMaxMin.onclick = p.removeMaxQty(ingredient);
			} else {
				imgCurrentPlus.className = clazz;
				imgCurrentMin.className = clazz;
				imgAlarmPlus.className = clazz;
				imgAlarmMin.className = clazz;
				imgMaxPlus.className = clazz;
				imgMaxMin.className = clazz;
				imgCurrentPlus.onclick = null;
				imgCurrentMin.onclick = null;
				imgAlarmPlus.onclick = null;
				imgAlarmMin.onclick = null;
				imgMaxPlus.onclick = null;
				imgMaxMin.onclick = null;
			}
		}
	},
	setPower: function(on) {
		return function() {
			g.ajax({
	    		url: "ajax",
	    		params: [["action", "setPower"], ["on", on]],
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
	setPluggedIn: function(on) {
		return function() {
			g.ajax({
	    		url: "ajax",
	    		params: [["action", "setPluggedIn"], ["on", on]],
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
	setWater: function(on) {
		return function() {
			g.ajax({
	    		url: "ajax",
	    		params: [["action", "setWater"], ["on", on]],
	    		callback: function(response) {
	    			if(response.success) {
	    				p.renderStatus(response.data);
	    			} else {
	    				g.alert(response.messages);
	    			}
	    		}
	    	});
		}
	}
};