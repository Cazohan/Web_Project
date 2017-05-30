// function save_png() {
// 	var xhr = new XMLHttpRequest();
// 	var data = document.getElementById("photo").getAttribute("src");
// 	var	png = document.getElementById("imadd").getAttribute("src");
// 	var datas = encodeURIComponent(data);
// 	// var pngs = encodeURIComponent(png);
// 	console.log(data);
// 	console.log(png);
// 	xhr.open("POST", "../config/save_png.php", true);
// 	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
// 	xhr.send("image=" + datas + "&png=" + png);
// }

// function add_div(inputs) {
// 	if (!document.getElementById("imadd")) {
// 		var append = document.getElementById("video");
// 		var att = inputs.getAttribute("src");
// 		var add = document.createElement("img");
// 		add.setAttribute("src", att);
// 		add.setAttribute("id", "imadd");
// 		add.setAttribute("class", "super");
// 		add.style.position = "relative";
// 		add.style.zIndex = "1";
// 		var parentDiv = append.parentNode;
// 		parentDiv.insertBefore(add, append.nextSibling);
// 	}
// 	else {
// 		var add = document.getElementById("imadd");
// 		var att = inputs.getAttribute("src");
// 		add.setAttribute("src", att);
// 	}

// }

// function check() {
// 	var inputs = document.querySelectorAll('input[type=radio]:checked'),
// 		inputsLength = inputs.length;

// 		for (var i = 0; i < inputsLength; i++) {
// 			add_div(inputs[i]);
// 			var imadd = document.getElementById("imadd");
// 			imadd.style.height = "25%";
// 			imadd.style.width = "25%";
// 		}
// }