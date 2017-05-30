function refreshMyPic() {
	var div = document.querySelector('#galinfo');
	var xhr = new XMLHttpRequest();

	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0)) {
			div.innerHTML = xhr.responseText;
		}
	}
	xhr.open("get", "/compte/info/mypic", true);
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xhr.send(null);
}

function toAvatar(path, pass) {
	var avatar = document.querySelector('#avatar_sub');

	function go(path) {
		var xhr = new XMLHttpRequest();

		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4) {
				//refreshMyPic();
			}
		}
		xhr.open("POST", "/compte/info", true);
		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		xhr.send("path=" + path + "&submit=toAvatar");
	}
	if (pass == 0) {
		if (confirm('Vous désirez vraiment faire de cette photo votre avatar ?')) {
			avatar.setAttribute('value', path);
			go(path);
		}
	} else if (pass == 1) {
		avatar.setAttribute('value', path);
		go(path);
	}
}

function deleteImg(path) {
	var xhr = new XMLHttpRequest(),
		avatar = document.querySelector('#avatar_sub');

	if (confirm("Vous désirez vraiment supprimée la photo?")) {
		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4) {
				refreshMyPic();
				if (path == avatar.value) {
					toAvatar('avatar.png', 1);
				}
			}
		}
		xhr.open("POST", "/compte/info", true);
		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		xhr.send("path=" + path + "&submit=SuppPic");
	}
}

var submit = document.querySelector('#Upload');

submit.addEventListener('click', function(ev){
	var file = document.querySelector('input[type=file]').files[0];
	var reader = new FileReader();
	var xhr = new XMLHttpRequest();
	var data = null;

	reader.onloadend = function () {
		var data = reader.result;
		data = encodeURIComponent(data);
		if (data && (data.split('%3B')[0] === 'data%3Aimage%2Fjpg' || data.split('%3B')[0] === 'data%3Aimage%2Fjpeg' || data.split('%3B')[0] === 'data%3Aimage%2Fpng') ) {
			xhr.onreadystatechange = function() {
				if (xhr.readyState == 4) {
					refreshMyPic();
					alert('Upload success');
				}
			}
			xhr.open("POST", "/compte/info", true);
			xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
			xhr.send("photo=" + data + "&submit=Upload");
		} else {
			alert('You fail your upload');
		}
	}
	if (file) {
		reader.readAsDataURL(file);
	} else {
		alert('tu n\'a rien upload...');
	}
});