let start = document.querySelector('.start');
let rules = document.querySelector('.rules');
let content = document.querySelector('.content');
let close = document.querySelector('.close');
let submit = document.querySelector('.submit');
let code_breaker = document.querySelector('.code_breaker');


start.addEventListener('click', ()=> {
	start.style.visibility = "hidden";
	rules.style.visibility = "hidden";
	content.style.visibility = "visible";
	submit.style.visibility = "visible";
	submit.style.transition = ".5s ease-out";
	code_breaker.style.visibility = "visible";
	code_breaker.style.transition = ".5s ease-out";
});

close.addEventListener('click', ()=> {
	start.style.visibility = "visible";
	rules.style.visibility = "visible";
	content.style.visibility = "hidden";
	submit.style.visibility = "hidden";
	submit.style.transition = "none";
	code_breaker.style.visibility = "hidden";
	code_breaker.style.transition = "none";
});
