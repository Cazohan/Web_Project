(function () {
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			ret_ajax(xhr.responseText);
		}
	};
	xhr.open("GET", "../config/pagin.php", true);
	xhr.send(null);
	
	function ret_ajax(xhr) {
		for (i = 0; i < xhr; i++)
		{
			var posi = document.getElementById('delire');
			var page = document.createElement('a');
			page.setAttribute('id', 'page');
			page.setAttribute('href', '#');
			page.setAttribute('title', i)
			page.setAttribute('onclick', 'change_page(title)');
			page.innerHTML = i + 1;
			posi.appendChild(page);
		}
	}
})();

(function() {
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			put_pic(xhr.responseText);
		}
	};
	xhr.open("GET", "../config/gallerie.php", true);
	xhr.send(null);

	function put_pic(xhr) {
		var pics = JSON.parse(xhr);
		var length = pics.length;
		if (length == 0)
		{
			var nothing = document.getElementById('gallerie');
			nothing.innerHTML = "Aucune photo dans la gallerie.";
			nothing.style.textAlign = "center";
			nothing.style.fontSize = "5em";
			return;
		}
		for (j = 0; j < length; j++)
		{	
			var image = document.getElementsByClassName('img' + j);
			image.item(0).src = pics[j].src;
			image.item(0).title = pics[j].titre;
			image.item(0).alt = pics[j].login;
			image.item(0).setAttribute('onclick', 'put_pic(src, title, alt)');
		}
	}
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



function change_page(nb) {
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			put_pic2(xhr.responseText);
		}
	};
	xhr.open("POST", "../config/gal_page.php", true);
	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhr.send("nb=" + nb);

	function put_pic2(xhr) {
		var k = 0;
		while (k <= 5)
		{
			var plouf = document.getElementsByClassName('img' + k);
			plouf.item(0).src = "";
			plouf.item(0).alt = "";
			plouf.item(0).title = "";
			k++;
		}
		var pics = JSON.parse(xhr);
		var length = pics.length;
		for (j = 0; j < length; j++)
		{	
			var image = document.getElementsByClassName('img' + j);
			image.item(0).src = pics[j].src;
			image.item(0).title = pics[j].titre;
			image.item(0).alt = pics[j].login;
			image.item(0).setAttribute('onclick', 'put_pic(src, title, alt)');
		}
	}
}

function aff_com(titre) {
	var xhr = new XMLHttpRequest();
	if (document.getElementById('put_com'))
	{
		var oldcom = document.getElementById('put_com');
		oldcom.parentNode.removeChild(oldcom);
		var newcom = document.createElement('div');
		var form = document.getElementById('cacher');
		newcom.setAttribute('id', 'put_com');
		form.appendChild(newcom);
	}
	else
	{
		var newcom = document.createElement('div');
		var form = document.getElementById('cacher');
		newcom.setAttribute('id', 'put_com');	
		form.appendChild(newcom);
	}
	xhr.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			// console.log(xhr.responseText);
			if (!(xhr.responseText == "Nothing"))
				ret_com(xhr.responseText);
		}
	};
	xhr.open("POST", "../config/srh_com.php", true);
	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhr.send("titre="+titre);
}

function ret_com(xhr) {
	o_com = JSON.parse(xhr);
	var nb_c = o_com.length;
	for (u = 0; u < nb_c; u++)
	{
		var affc = document.createElement('p');
		var jump = document.createElement('br');
		var com = document.getElementById('put_com')
		affc.setAttribute('id', 'com');
		affc.style.border = "1px black solid";
		affc.style.overflow = "hidden";
		var commit = o_com[u].user + " : " + o_com[u].commentaire;
		affc.innerHTML = commit;
		com.appendChild(affc);
		com.appendChild(jump);
	}
}


function put_pic(source, titre, alti) {
		var comment = document.getElementById('cacher');
		var clent = document.getElementById('texting');
		var newtext = document.createElement('textarea');
		var final = document.getElementById('finish');
		var aff_c = document.getElementById('commi');
		var like = document.getElementById('nb_like');
		newtext.setAttribute('id', 'texting');
		newtext.setAttribute('name', 'comment');
		clent.parentNode.replaceChild(newtext, clent);
		comment.style.display = "inline";
		clent.innerHTML = "";
		final.src = source;
		final.title = titre;
		final.alt = alti;
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function () {
			if (this.readyState == 4 && this.status == 200) {
				like.innerHTML = xhr.responseText;
				aff_com(titre);
			}
		}
		xhr.open("POST", "../config/do_like.php", true);
		xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhr.send("titre="+titre);
}

function put_com() {
	var com = document.getElementById('texting');
	var pic = document.getElementById('finish');
	var use = document.getElementById('cur_user');
	var xhr = new XMLHttpRequest();
	if (com.value == "" || cur_user.innerHTML == "Guest")
	{
		alert("Connectez vous / écrivez un message");
		return;
	}
	else
	{
		var max = 80;
		var size = com.value.length;
		if (size > max)
		{
			alert("On ta pas dit d'écrire un roman....");
			window.location.href = ('gallery.php');
		}
		else
		{
			xhr.onreadystatechange = function () {
				if (this.readyState == 4 && this.status == 200) {
					window.location.href = ('../page/gallery.php');
				}
			};
			xhr.open("POST", "../config/put_com.php", true);
			xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			xhr.send("cur_user=" + cur_user.innerHTML + "&aut_photo=" + pic.alt + "&titre=" + pic.title + "&comment=" + com.value);
		}
	}
}

function put_like() {
	var xhr = new XMLHttpRequest();
	var titre = document.getElementById('finish').getAttribute('title');
	if (cur_user.innerHTML == "Guest")
	{
		alert('Connectez vous pour voter');
		return;
	}
	else
	{	
		xhr.onreadystatechange = function () {
			if (this.readyState == 4 && this.status == 200) {
				ret_like(xhr.responseText);
				count_like();
			}
		};
		xhr.open("POST", "../config/liked.php", true);
		xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhr.send("titre="+titre);
	}
}

function ret_like(xhr)
{
	if (xhr == "ok")
	{
		alert("Merci de penser a nourrir le chat en partant.");
	}
	else
	{
		alert("Ta voulu arnaquer le systeme?");
	}
}


function count_like() {
	var xhr = new XMLHttpRequest();
	var titre = document.getElementById('finish').getAttribute('title');
	var likes = document.getElementById('nb_like');
	xhr.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			likes.innerHTML = xhr.responseText;
		}
	};
	xhr.open("POST", "../config/do_like.php", true);
	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhr.send("titre=" + titre);
}


function erase() {
	var usee = document.getElementById('finish').getAttribute('alt');
	var tytre = document.getElementById('finish').getAttribute('title');
	if (cur_user.innerHTML != usee)
	{
		alert('Supprime ce qui est a toi!');
		window.location.href = ('gallery.php');
	}
	else
	{
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function () {
			if (this.readyState == 4 && this.status == 200)
			{
				alert('Suppression Réussi');
				window.location.href = ('gallery.php');
			}
		};
		xhr.open("POST", "../config/del.php");
		xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhr.send("user="+usee+"&titre="+tytre);
	}
}












