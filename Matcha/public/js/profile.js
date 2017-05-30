function getLikeMe(login) {
	sock.emit('recupLikeur', {login: login});
}

var login = document.getElementById('avatar').alt,
	likeur = document.getElementById('likeur'),
	first = true;

if (first) {
	first = false;
	getLikeMe(login);
}

sock.on('heLikeYou', function(data) {
	var jump = document.createElement('br'),
		link = document.createElement('a');

	link.setAttribute('href', '/profile/' + data.content);
	link.innerHTML = data.content;
	likeur.appendChild(jump);
	likeur.appendChild(jump);
	likeur.appendChild(link);
	// likeur.appendChild(tmp_div);
});