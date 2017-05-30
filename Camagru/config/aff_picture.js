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

