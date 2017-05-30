(function () {
		function add_picture(pic, i) {
			var image = document.getElementsByClassName('img' + i);
			image.item(0).src = pic.src;
			image.item(0).title = pic.title;
			image.item(0).alt = "photo user";
			image.item(0).setAttribute('onclick', 'put_pic(src, title, alt)');
			console.log(image.item(0).src);
			// console.log(pic.src, i);
			// var prev = document.createElement('a');
			// image.style.width = "40px";
			// image.style.height = "20px";
			// prev.setAttribute('href', pic.src);
			// image.setAttribute('src', pic.src);
			// image.setAttribute('alt', 'photo user');
			// image.setAttribute('title', pic.titre);
			// image.setAttribute('class', 'image');
			// image.setAttribute('onclick', 'put_pic(src, title, alt)');
			// galerie_mini.appendChild(lis);
			// lis.appendChild(image);
			// prev.appendChild(image);
		}
	// function change_page(nb) {
	// 	var swi = 1;
	// 	if (swi > nb)
	// 		swi = nb;
	// 	console.log(swi);
	// 	return (swi);
	// }

	function create_pagi(nb_o){
		var elemp = 6;
		var nb_page = Math.ceil(nb_o / elemp);
		var p = 1;
		var k = 1;
		while (p < nb_page + 1)
		{
			var pag = document.createElement('a');
			var mini = document.getElementById('mini_galerie');
			pag.setAttribute('title', p);
			pag.setAttribute('href', '#');
			// pag.setAttribute('onclick', 'change_page(title)');
			pag.setAttribute('id', 'page');
			pag.setAttribute('class', 'page' + p);
			pag.innerHTML = p;
			mini.appendChild(pag);
 			p++;
		}
	}

	function gallerie() {
		var xhr = new XMLHttpRequest();
		who = document.getElementById('select').textContent;
		console.log(who);
		xhr.onreadystatechange = function() {return_ajax(xhr);};
		xhr.open ("POST", "../config/gallerie.php", true);
		xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhr.send("user=" + who);
	}

	function return_ajax(xhr) {
		if (xhr.readyState == 4)
		{
			// console.log(xhr.responseText);
			var retour = JSON.parse(xhr.responseText);
			// console.log(retour[0]);
			var nb_o = 0
			for (var prop in retour)
			{
				if (retour.hasOwnProperty(prop))
					nb_o++;
			}
			create_pagi(nb_o);
			var pages = document.querySelectorAll('page');
			pages.addEventListener('click', function(ev) {
			}, false);
			// var act = change_page(1);

		}
}

	var Eusr = document.getElementById('cur_user');
	var button = document.getElementById('select');
	var grosse_photo = document.getElementById('finish');
	// var plouf = document.getElementById('preview');
	var usr = Eusr.textContent;
	var k = 0
	var cur_p = 1;
	var tout = "All";
	if (usr == "Guest")
		button.innerHTML = tout;
	else
		button.innerHTML = usr;
	gallerie();
	button.addEventListener('click', function(ev){
		if (button.textContent == "All" && usr != "Guest")
		{
			button.innerHTML = usr;
			gallerie();
			grosse_photo.src = "";
			grosse_photo.alt = "";
			grosse_photo.title = "";
			k = 0;
			while (k <= 5)
			{
				var plouf = document.getElementById('preview');
				plouf.src = "";
				plouf.alt = "";
				plouf.title = "";
				k++;
			}
		}
		else
		{
			button.innerHTML = tout;
			gallerie();
			grosse_photo.src = "";
			grosse_photo.alt = "";
			grosse_photo.title = "";
			k = 0;
			while (k <= 5)
			{
				var plouf = document.getElementById('preview');
				plouf.src = "";
				plouf.alt = "";
				plouf.title = "";
				k++;
			}
		}
		}, false);
})();

function auth() {
	var log = document.getElementById('cur_user'),
		login = log.textContent;
		if (login == "Guest")
		{
			alert("Vous devez être connecté pour acceder a cette page.");
		}
		else
		{
			window.location.href = ('mounting.php');
		}
}

function put_pic(source, titre, alti) {
		var final = document.getElementById('finish');
		final.src = source;
		final.title = titre;
		final.alt = alti;
}
