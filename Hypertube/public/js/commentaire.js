var first = false,
	sender = document.getElementById('butComment'),
	fieldText = document.getElementById('inComment');

if (!first) {
	getComment(window.location.pathname.split('/')[2]);
	first = true;
}

sender.addEventListener('click', function(ev) {
	var msgText = document.getElementById('inComment');
	postComment();
	msgText.value = '';
});