function save_png() {
	var xhr = new XMLHttpRequest();
	var data = document.getElementById("photo").getAttribute("src");
	var datas = encodeURIComponent(data);
	console.log(data);
	xhr.open("POST", "../config/save_png.php", true);
	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhr.send("image=" + datas);
}