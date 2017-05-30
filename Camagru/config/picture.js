function camera() {
	var streaming = false;
	var video = document.getElementById('video');
	var cover = document.getElementById('cover');
	var canvas = document.getElementById('canvas');
	var photo = document.getElementById('photo');
	var width = 400;
	var height = 0;
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
	video.setAttribute('title', "good");
}

function takepicture() {
	if (document.getElementById('imadd').getAttribute("src") == "" || document.getElementById('video').getAttribute('title') == null)
	{
		alert("Activer la camera pour prendre une photo");
		// window.location.href = ('mounting.php');
	}
	else
	{
		if (!document.getElementById('video').getAttribute("src"))
		{
			var width = 400;
			var height = 300;
			canvas.width = width;
			canvas.height = height;
			canvas.getContext('2d').drawImage(video, 0, 0, width, height);
			var data = canvas.toDataURL('image/png');
			photo.setAttribute('src', data);
		}
		else
		{
			photo.setAttribute('src', document.getElementById('video').getAttribute("src"));
		}
		photo.style.width = "400px";
		photo.style.height = "300px";
		var prev2 = document.getElementById('imadd').getAttribute('src');
		var size = document.getElementById('imadd').getAttribute('style');
		var prev = document.getElementById('prev2');
		prev.setAttribute('src', prev2);
		prev.setAttribute('style', size);
		document.getElementById('save').removeAttribute('disabled');
	}
	
}

function add_img(inputs) {
	var append = document.getElementById("video");
	var add = document.getElementById("imadd");
	var att = inputs.getAttribute("src");
	add.setAttribute("src", att);
	var rect = append.getBoundingClientRect();
	if (att == "../res/beard.png")
	{
		add.style.top = 150 - (add.height / 2);
		add.style.left = 200 - (add.width / 2);
	}
	else
	{
		add.style.top = 0;
		add.style.left = 0;
	}
}

function check() {
	var inputs = document.querySelectorAll('input[type=radio]:checked'),
		inputsLength = inputs.length;

		for (var i = 0; i < inputsLength; i++) {
			add_img(inputs[i]);
			var imadd = document.getElementById("imadd");
		}
		document.getElementById('sbutton').removeAttribute('disabled');
}

function addpng() {
	var reader = new FileReader();
	var file = document.getElementById('file').files[0];
	var video = document.getElementById('video');
	reader.addEventListener('load', function() {
		var adding = document.createElement("img");
		adding.setAttribute("src", reader.result);
		adding.setAttribute("id", "video");
		adding.setAttribute("class", "super");
		adding.setAttribute('title', 'good');
		video.parentNode.replaceChild(adding, video);
	});
	reader.readAsDataURL(file);

}

//destination = photo;
//source = png;

function save_png() {
	var xhr = new XMLHttpRequest();
	var destination = document.getElementById("photo");
	var source = document.getElementById("prev2");
	var dest = destination.getAttribute("src");
	var src = source.getAttribute("src");
	if (dest == "" && src == "")
	{
		alert("Tu fait des photos vide toi ?")
		window.location.href = ('mounting.php');
	}
	dest = encodeURIComponent(dest);
	src = encodeURIComponent(src);
	xhr.onreadystatechange = function() {
		if(this.readyState == 4 && this.status == 200) {
			alert('Succes!');
		}
	};
	xhr.open("POST", "../config/save_png.php", true);
	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhr.send("photo=" + dest + "&png=" + src);
}


// + "&png=" + src + "&postop=" + ret[1] + "&posleft=" + ret[3]





















