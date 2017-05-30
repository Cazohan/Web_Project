/* load camera*/

(function() {
		var streaming = false,
			video = document.querySelector('#video'),
			cover = document.querySelector('#cover'),
			canvas = document.querySelector('#canvas'),
			photo = document.querySelector('#photo'),
			sbutton = document.querySelector('#sbutton'),
			width = 400,
			height = 0;
		var constraints = {audio: false, video: true};
		navigator.mediaDevices.getUserMedia(constraints).then(function(mediaStream) {
			video.srcObject = mediaStream;
			video.onloadedmetadata = function(e) {
				video.play();
			};
		})
		.catch(function(err){console.log(err.name + ": " + err.message); });
		video.addEventListener('canplay', function(ev){
			if (!streaming) {
				height = video.videoHeight / (video.videoWidth/width);
				streaming = true;
			}
		}, false);
		sbutton.addEventListener('click', function(ev){
			takepicture();
			ev.preventDefault();
			}, false);
		function takepicture() {
			canvas.width = width;
			canvas.height = height;
			canvas.getContext('2d').drawImage(video, 0, 0, width, height);
			var data = canvas.toDataURL('image/png');
			photo.setAttribute('src', data);
		}
})();


/*Save screeshot as png*/

function save_png() {
	var xhr = new XMLHttpRequest();
	var data = document.getElementById("photo").getAttribute("src");
	var	png = document.getElementById("imadd").getAttribute("src");
	var datas = encodeURIComponent(data);
	// var pngs = encodeURIComponent(png);
	console.log(data);
	console.log(png);
	xhr.open("POST", "../config/save_png.php", true);
	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhr.send("image=" + datas + "&png=" + png);
}

/* Check and add_div for add png */

function add_div(inputs) {
	// if (!document.getElementById("imadd")) {
	// 	var append = document.getElementById("video");
	// 	var att = inputs.getAttribute("src");
	// 	var add = document.createElement("img");
	// 	add.setAttribute("src", att);
	// 	add.setAttribute("id", "imadd");
	// 	add.setAttribute("class", "super");
	// 	add.style.position = "relative";
	// 	add.style.zIndex = "1";
	// 	add.style.height = "25%";
	// 	add.style.width = "25%";
	// 	var parentDiv = append.parentNode;
	// 	parentDiv.insertBefore(add, append.nextSibling);
	// }
	// else {
		var add = document.getElementById("imadd");
		var att = inputs.getAttribute("src");
		console.log(att);
		add.setAttribute("src", att);

	// }
}

function check() {
	var inputs = document.querySelectorAll('input[type=radio]:checked'),
		inputsLength = inputs.length;

		for (var i = 0; i < inputsLength; i++) {
			add_div(inputs[i]);
			var imadd = document.getElementById("imadd");
		}
}

function addpng() {
	var reader = new FileReader();
	var file = document.getElementById('file').files[0];
	var video = document.getElementById('video');
	reader.addEventListener('load', function() {
		console.log(reader.result);
		var adding = document.createElement("img");
		adding.setAttribute("src", reader.result);
		adding.setAttribute("id", "video");
		adding.setAttribute("class", "super");
		video.parentNode.replaceChild(adding, video);
		// if (!document.getElementById("imadd")) {
		// 	var append = document.getElementById("video");
		// 	var add = document.createElement("img");
		// 	add.setAttribute("src", reader.result);
		// 	add.setAttribute("id", "imadd");
		// 	add.setAttribute("class", "super");
		// 	add.style.position = "relative";
		// 	add.style.zIndex = "1";
		// 	add.style.height = "25%";
		// 	add.style.width = "25%";
		// 	var parentDiv = append.parentNode;
		// 	parentDiv.insertBefore(add, append.nextSibling);
		// }
		// else {
		// 	var add = document.getElementById("imadd");
		// 	add.setAttribute("src", reader.result);
		// }
		

	});
	reader.readAsDataURL(file);
}



// (function() {
	// function createThumbail(file) {
	// 	var reader = new FileReader();
	// 	reader.addEventListener('Load', function() {
	// 		var imgElement = document.createElement("img");
	// 		imgElement.style.position = "relative";
	// 		imgElement.style.zIndex = "1";
	// 		imgElement.style.height = "25%";
	// 		imgElement.style.widht = "25%";
	// 		imgElement.src = this.result;
	// 		video.appendChild(imgElement);
	// 	});
	// 	reader.readAsDataURL(file);
	// }

	// var allowedtype = 'png';
	// var input = document.getElementById('file');
	// var prev = document.getElementById('video');
	// input.addEventListener('change', function() {
	// 	var files = this.files;
	// 	var filesLen = files.length;
	// 	var imgType;
	// 	for (var i = 0; i < filesLen; i++) {
	// 		imgType = files[i].name.split('.');
	// 		imgType = imgType[imgType.length - 1];
	// 		if (allowedtype.indexOf(imgType) != 1) {
	// 			var reader = new FileReader();
	// 			var imgElement = document.createElement("img");
	// 			imgElement.style.position = "relative";
	// 			imgElement.style.zIndex = "1";
	// 			imgElement.style.height = "25%";
	// 			imgElement.style.widht = "25%";
	// 			imgElement.src = this.result;
	// 			video.appendChild(imgElement);
	// 			reader.readAsDataURL(input);
	// 		}
	// 	}
	// });
// var fileInput = document.querySelector('#file');


 //    fileInput.addEventListener('change', function() {


 //        var reader = new FileReader();


 //        reader.addEventListener('load', function() {

 //            console.log('Contenu du fichier "' + fileInput.files[0].name + '" :\n\n' + reader.result);

 //        });


 //        reader.readAsDataURL(fileInput.files[0]);


 //    });
	// var fileInput = document.getElementById('file');
	// fileInput.addEventListener('change', function() {
	// 	var reader = new FileReader();
	// 	reader.addEventListener('load', function() {
	// 		console.log(fileInput.name + " : " + reader.result);		
	// 	});
	// });
	// if (!document.getElementById("imadd")) {
		// var append = document.getElementById("video");
		// var add = document.createElement("img");
		// add.setAttribute("id", "imadd");
		// add.setAttribute("class", "super");
		// add.style.position = "relative";
		// add.style.zIndex = "1";
		// var parentDiv = append.parentNode;
		// parentDiv.insertBefore(add, append.nextSibling);
// })();


































