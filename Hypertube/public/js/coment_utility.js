function getComment(imdb) {
	var comment = document.getElementById('comment'),
		xhr = new XMLHttpRequest();

	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0)) {
			makeCom(xhr.responseText);
		}
	}
	xhr.open("post", "/getcomment", true);
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xhr.send("imdb=" + imdb);
}

function addCom(entry) {
	var list = JSON.parse(entry),
		comment = document.getElementById('comment'),
		div = document.createElement('div'),
		name = document.createElement('p'),
		msg = document.createElement('p'),
		link = document.createElement('a');

	div.setAttribute('class', 'col-xs-12 col-sm-12 col-md-12 col-lg-12 text-right inline-block');
	link.setAttribute('href','/profile/' + list.from_id)
	name.innerText = list.msg;
	link.innerText = list.from;
	div.appendChild(link);
	div.appendChild(name);
	comment.appendChild(div);
}

function makeCom(entry) {
	var entry = JSON.parse(entry),
		list = entry['result'],
		myid = document.getElementById('myid').innerText,
		comment = document.getElementById('comment');

	for (var i = 0; list[i]; i++) {
		var div = document.createElement('div'),
			name = document.createElement('p'),
			msg = document.createElement('p'),
			link = document.createElement('a');

		if (myid == list[i].from_id) {
			div.setAttribute('class', 'col-xs-12 col-sm-12 col-md-12 col-lg-12 text-right inline-block');
		} else {
			div.setAttribute('class', 'col-xs-12 col-sm-12 col-md-12 col-lg-12 text-left inline-block');
		}
		link.setAttribute('href','/profile/' + list[i].from_id)
		name.innerText = list[i].msg;
		link.innerText = list[i].from;
		div.appendChild(link);
		div.appendChild(name);
		comment.appendChild(div);
	}
}

function postComment() {
	var comment = document.getElementById('comment'),
		imdb_id = window.location.pathname,
		text = document.getElementById('inComment').value,
		xhr = new XMLHttpRequest();

	if (text != '') {
		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0)) {
				addCom(xhr.responseText);
			}
		}
		xhr.open("post", "/postcomment", true);
		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		xhr.send("message=" + text + "&imdb=" + window.location.pathname.split('/')[2]);
	}
}
