let start = document.querySelector('.start');
let rules = document.querySelector('.rules');
let content = document.querySelector('.content');
let close = document.querySelector('.close');
let submit = document.querySelector('.submit');
let onevsbot = document.querySelector('.onevsbot');
let onevsone = document.querySelector('.onevsone');
let create_a_room = document.querySelector('.create_a_room');
let join_a_room = document.querySelector('.join_a_room');

start.addEventListener('click', ()=> {
	start.style.visibility = "hidden";
	rules.style.visibility = "hidden";
	content.style.visibility = "visible";
	submit.style.visibility = "visible";
	submit.style.transition = ".5s ease-out";
	onevsbot.style.visibility = "visible";
	onevsbot.style.transition = ".5s ease-out";
});

close.addEventListener('click', ()=> {
	start.style.visibility = "visible";
	rules.style.visibility = "visible";
	content.style.visibility = "hidden";
	submit.style.visibility = "hidden";
	submit.style.transition = "none";
	onevsone.style.transition = "none";
	onevsbot.style.visibility = "hidden";
	onevsbot.style.transition = "none";
	onevsone.style.display = "block";
	onevsbot.style.display = "block";
	join_a_room.style.display = "none";
	create_a_room.style.display = "none";
});

onevsone.addEventListener('click', ()=> {
	onevsone.style.display = "none";
	onevsbot.style.display = "none";
	join_a_room.style.display = "block";
	create_a_room.style.display = "block";
});
