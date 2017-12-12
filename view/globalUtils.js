Array.prototype.remove = function(arr, obj) {
	var index = arr.indexOf(obj);
	if (index != -1) {
		arr.splice(index, 1);
	}
};
Array.prototype.sameElementCount = function(arr) {
	var result = [], count = null;
	arr.sort();
	for (var i = 0; i < arr.length;) {
		count = 1;
		for (var j = i + 1; j < arr.length; j++) {
			if (arr[i] == arr[j]) {
				count++;
			}
		}
		result.push([ arr[i], count ]);
		i += count;
	}
	return result;
};
Array.prototype.inArray = function(e) {
	var length = this.length;
	for (var i = 0; i < length; i++) {
		if (this[i] == e)
			return true;
	}
	return false;
};

Array.prototype.uniquelize = function() {
	var array = new Array();
	var length = this.length;
	for (var i = 0; i < length; i++) {
		if (!array.inArray(this[i])) {
			array.push(this[i]);
		}
	}
	return array;
};

Array.prototype.union = function(b) {
	return this.concat(b).uniquelize();
};
Array.prototype.intersect = function(b) {
	var array = new Array();
	var ua = this.uniquelize();
	var length = ua.length;
	for (var i = 0; i < length; i++) {
		if (b.inArray(ua[i])) {
			array.push(ua[i]);
		}
	}
	return array;
};

Array.prototype.minus = function(b) {
	var array = new Array();
	var ua = this.uniquelize();
	var length = this.length;
	for (var i = 0; i < length; i++) {
		if (!b.inArray(ua[i])) {
			array.push(ua[i]);
		}
	}
	return array;
};
Array.prototype.complement = function(b) {
	return a.minus(a.union(b), a.intersect(b));
};
Array.prototype.unique = function(data) {
	data.sort();
	var re = [ data[0] ];
	var length = data.length;
	for (var i = 1; i < length; i++) {
		if (data[i] !== re[re.length - 1]) {
			re.push(data[i]);
		}
	}
	return re;
};
Array.prototype.contains = function(obj) {
	var index = this.length;
	while (index--) {
		if (this[index] == obj) {
			return true;
		}
	}
	return false;
};
Array.prototype.remove = function(obj) {
	var index = this.indexOf(obj);
	if (index > -1) {
		this.splice(index, 1);
	}
};
Array.prototype.itemCount=function(targetNum){
	var targetArr = this,count = 0;
    for (var index = 0; index < targetArr.length; index++) {
        var item = targetArr[index];
		if(targetNum == item){
			count ++;
		}
	}
	return count;
};



function StringBuilder() {
	this.data = [];
}
StringBuilder.prototype.append = function() {
	this.data.push(arguments[0]);
	return this;
};
StringBuilder.prototype.toString = function() {
	return this.data.join("");
};
String.prototype.replaceAll = function(s1, s2) {
	return this.replace(new RegExp(s1, "gm"), s2);
};
String.prototype.sort = function () {
    var strArr = this.split("");
    strArr.sort();
    var buffer = new StringBuilder();
    for (var index = 0; index < strArr.length; index++) {
        var item = strArr[index];
        buffer.append(item);
    }
    return buffer.toString();
};