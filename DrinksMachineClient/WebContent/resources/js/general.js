var g = {
	alert: function(messages) {
		if(messages != null && messages.length != 0) {
			var message = messages[0];
			for(var i = 1; i < messages.length; i++) {
				message += "\n" + messages[i];
			}
			alert(message);
		}
	},
	getById: function(id) {
		return document.getElementById(id);
	},
	getByClass: function(clazz) {
		return document.getElementsByClassName(clazz);
	},
	contains: function(array, el) {
		var contains = false;
		for(var i = 0, ceiling = array.length; i < ceiling; i++) {
			if(array[i] === el) {
				contains = true;
				break;
			}
		}
		return contains;
	},
	alternate: function(table, toSkip) {
		if(typeof(toSkip) == "undefined")
			toSkip = [];
		var rows = table.rows;
		for(var i = 0, ceiling = rows.length; i < ceiling; i = i + 2) {
			if(!g.contains(toSkip, i))
				g.addClass(rows[i], "even");
		}
		for(var i = 1, ceiling = rows.length; i < ceiling; i = i + 2) {
			if(!g.contains(toSkip, i))
				g.addClass(rows[i], "odd");
		}
	},
    trim: function(s) {
        return s.replace(/^\s+|\s+$/g, '');
    },
	addClass: function(el, clazz) {
        if ((" " + el.className + " ").indexOf(clazz) == -1)
            el.className += el.className == "" ? clazz : " " + clazz;
    },
    removeClass: function(el, clazz) {
        if ((" " + el.className + " ").indexOf(clazz) != -1)
            el.className = g.trim((" " + el.className + " ").replace(" " + clazz + " ", " "));
    },
    validate: function(el, condition, messages, message) {
        if (!condition) {
            messages.push(message);
            g.addClass(el, "invalid");
        } else {
            g.removeClass(el, "invalid");
        }
    },
    isEmail: function(s) {
        return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(s);
    },
    setStyles: function(el, styles) {
		for(var i = 0; i < styles.length; i++) {
			el.style[styles[i][0]] = styles[i][1];
		}
	},
	setProps: function(el, props) {
		for(var i = 0; i < props.length; i++) {
			el[props[i][0]] = props[i][1];
		}
	},
    getEl: function(p) {
    	var el = document.createElement(p.type);
    	if(typeof(p.props) != "undefined" && p.props != null) {
    		g.setProps(el, p.props);
    	}
    	if(typeof(p.styles) != "undefined" && p.styles != null) {
    		g.setStyles(el, p.styles);
    	}
    	return el;
    },
	getCell: function(p) {
		var cell = p.row.insertCell(typeof(p.index) != "undefined" ? p.index : -1);
		if(typeof(p.props) != "undefined" && p.props != null) {
    		g.setProps(cell, p.props);
    	}
    	if(typeof(p.styles) != "undefined" && p.styles != null) {
    		g.setStyles(cell, p.styles);
    	}
    	return cell;
	},
	getRow: function(p) {
		var row = p.table.insertRow(typeof(p.index) != "undefined" ? p.index : -1);
		if(typeof(p.props) != "undefined" && p.props != null) {
    		g.setProps(row, p.props);
    	}
    	if(typeof(p.styles) != "undefined" && p.styles != null) {
    		g.setStyles(row, p.styles);
    	}
    	return row;
	},
	// required: url
	// defaults: async, get, json
	ajax: function(p) {
		this.setDefaults({
			p : p, 
			args : [
					["params", []], 
					["async", true], 
					["callback", null], 
					["method", "get"],
					["json", true]
					]});
		var get = p.method.toLowerCase() == "get";
		var doCallback = p.callback != null;
		var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
		var callback;
		if(doCallback) {
			callback = function(responseText) {
				if(p.json) {
					p.callback(eval("(" + responseText + ")"));
				} else {
					p.callback(responseText);
				}
			};
		}
		if(doCallback && p.async) {
			xhr.onreadystatechange = function() {
				if(xhr.readyState == 4 && xhr.status == 200) {
					callback(xhr.responseText);
				}
			};
		}
		var paramString = null;
		var url;
		if(get) {
			url = this.getUrl({url : p.url, params : p.params});
		} else {
			url = p.url;
			paramString = "";
			for(var i = 0; i < p.params.length; i++) {
				if(i != 0) paramString += "&";
				paramString += encodeURIComponent(p.params[i][0]) + "=" + encodeURIComponent(p.params[i][1]);
			}
		}
		xhr.open(p.method, url, p.async);
		
		if(!get) {
			xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		}
		xhr.send(paramString);
		if(doCallback && !p.async) {
			callback(xhr.responseText);
		}
	},
	// ex.: this.setDefaults({p : p, args : [["toKeep", []]]})
	// required: p args
	setDefaults: function(p) {
		for(var i = 0; i < p.args.length; i++) {
			if(this.isUndefined(p.p[p.args[i][0]])) p.p[p.args[i][0]] = p.args[i][1];
		}
	},
	isUndefined: function(p) {
		return typeof(p) == "undefined";
	},
	// ex.: getUrl({url : "search.do", params : [["p1", "v1"], ["p2", "v2"]]})
	// required: url
	getUrl: function(p) {
		this.setDefaults({p : p, args : [["params", []]]});
		if(p.params.length > 0) {
			if(p.url.indexOf("?") == -1) {
				p.url += "?";
			}
			if(p.url.indexOf("?") == p.url.length - 1) {
				p.url += encodeURIComponent(p.params[0][0]) + "=" + encodeURIComponent(p.params[0][1]);
			} else {
				p.url += "&" + encodeURIComponent(p.params[0][0]) + "=" + encodeURIComponent(p.params[0][1]);
			}
			for(var i = 1; i < p.params.length; i++) {
				p.url += "&" + encodeURIComponent(p.params[i][0]) + "=" + encodeURIComponent(p.params[i][1]);
			}
		}
		return p.url;
	}
};