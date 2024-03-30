// document.addEventListener('DOMContentLoaded', function () {
const burgerBtn = document.querySelector('.hamburger');
const closeBtn = document.querySelector('.close');
const navListModal = document.querySelector('.navlist-modal');
const navLinks = document.querySelectorAll('.nav-link');
const pricingBtns = document.querySelectorAll('.scroll-element');
const priceList = document.querySelectorAll('.price-list');
const header = document.querySelector('header');
const submitBtn = document.getElementById('submit');
const numInput = document.getElementById('number');
const mailInput = document.getElementById('email');
const closeMailBtn = document.getElementById('cross-btn');
const mailModal = document.getElementById('modal');
const okBtn = document.getElementById('ok-btn');
const body = document.body;

const year = document.getElementById('year');
const accordionBtns = document.querySelectorAll('#accordion-btn');

const staffCards = document.querySelectorAll('.staff-card');
const modals = document.querySelectorAll('dialog');
const dialogsClose = document.querySelectorAll('#staffCardModalClose');

staffCards.forEach((card) => {
	card.addEventListener('click', () => {
		body.classList.add('modal-open');
		const cardId = card.getAttribute('data-dialog');
		const modal = document.getElementById(cardId);
		modal.showModal();
	});
});

dialogsClose.forEach((close) => {
	close.addEventListener('click', () => {
		body.classList.remove('modal-open');
		const modal = close.closest('dialog');
		modal.close();
	});
});

window.addEventListener('click', (e) => {
	modals.forEach((modal) => {
		if (e.target === modal) {
			body.classList.remove('modal-open');
			modal.close();
		}
	});
});

function openAccordion() {
	if (this.nextElementSibling.classList.contains('active')) {
		this.nextElementSibling.classList.remove('active');
	} else {
		closeAccordion();
		this.nextElementSibling.classList.toggle('active');
	}
}

const closeAccordion = () => {
	const allActives = document.querySelectorAll('.accordion-info');
	allActives.forEach((el) => el.classList.remove('active'));
};

const outsideAccordionClick = (e) => {
	if (
		e.target.classList.contains('accordion-btn') ||
		e.target.classList.contains('accordion-info') ||
		e.target.classList.contains('noClose')
	)
		return;
	closeAccordion();
};

window.addEventListener('click', outsideAccordionClick);
accordionBtns.forEach((btn) => btn.addEventListener('click', openAccordion));

const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

const currentDate = new Date();
year.innerHTML = `${currentDate.getFullYear()}`;

const addShadow = () => {
	if (window.scrollY >= 50) {
		header.classList.add('nav-bg-js');
	} else {
		header.classList.remove('nav-bg-js');
	}
};

const showNav = () => {
	navListModal.classList.remove('nav-animation-out-js');
	navListModal.classList.add('nav-animation-in-js');
	body.classList.add('stop-scrolling');
	navLinks.forEach((navlink) => navlink.classList.add('slide-in'));
};

const closeNav = () => {
	navListModal.classList.remove('nav-animation-in-js');
	navListModal.classList.add('nav-animation-out-js');
	body.classList.remove('stop-scrolling');
	navLinks.forEach((navlink) => navlink.classList.remove('slide-in'));
};

const showPricing = (e) => {
	let x = document.querySelector(`.${e.target.id}`);
	if (x.classList.contains('displayGrid')) {
		return;
	} else {
		priceList.forEach((price) => price.classList.remove('displayGrid'));
		x.classList.add('displayGrid');
	}
};

const showMailModal = () => {
	mailModal.showModal();
	mailModal.classList.add('flex-col');
	body.classList.add('no-scroll');
};

const closeMailModal = () => {
	mailModal.close();
	mailModal.classList.remove('flex-col');
	body.classList.remove('no-scroll');
};

const numValidation = () => {
	if (numInput.value.length < 9) {
		numInput.setCustomValidity('Numer musi składać się z 9 cyfr');
	} else if (numInput.value.length == 9) {
		numInput.setCustomValidity('');
	}
};

const mailValidation = () => {
	if (!mailInput.value.match(emailRegex)) {
		mailInput.setCustomValidity('Niepoprawny adres e-mail');
	} else if (mailInput.value.match(emailRegex)) {
		mailInput.setCustomValidity('');
	}
};

const clearForm = () => {
	document.getElementById('form').reset();
};

const sendMail = () => {
	document
		.querySelector('form')
		.addEventListener('submit', (e) => e.preventDefault());
	let params = {
		name: document.getElementById('name').value,
		email: mailInput.value,
		number: numInput.value,
		subject:
			document.getElementById('subject').options[subject.selectedIndex].text,
		message: document.getElementById('message').value,
	};
	if (
		params.name === '' ||
		params.email === '' ||
		params.number === '' ||
		params.subject.value === '' ||
		params.subject === 'Wybierz zajęcia' ||
		params.message === ''
	) {
		return;
	} else {
		emailjs
			.send('service_u1hdvks', 'template_hjp9o5i', params)
			.then(showMailModal());
		clearForm();
	}
};

navLinks.forEach((link) => link.addEventListener('click', closeNav));
pricingBtns.forEach((btn) => btn.addEventListener('click', showPricing));

mailInput.addEventListener('input', mailValidation);
numInput.addEventListener('input', function () {
	this.value = this.value.replace(/\D/g, '');
});
numInput.addEventListener('input', numValidation);
submitBtn.addEventListener('click', sendMail);
window.addEventListener('scroll', addShadow);
burgerBtn.addEventListener('click', showNav);
closeBtn.addEventListener('click', closeNav);
closeMailBtn.addEventListener('click', closeMailModal);
okBtn.addEventListener('click', closeMailModal);

// );
// });
