(function () {
	var dft = document.getElementById('bt0');
	var age = document.getElementById('bt1');
	var dis = document.getElementById('bt2');
	var pop = document.getElementById('bt3');
	var tag = document.getElementById('bt4');

	dft.addEventListener('click', function(e) {
		window.location.href = '/?trie=0';		
	});
	
	age.addEventListener('click', function(e) {
		window.location.href = '/?trie=1';		
	});
	
	dis.addEventListener('click', function(e) {
		window.location.href = '/?trie=2';		
	});
	
	pop.addEventListener('click', function(e) {
		window.location.href = '/?trie=3';		
	});

	tag.addEventListener('click', function(e) {
		window.location.href = '/?trie=4';		
	});
}) ();