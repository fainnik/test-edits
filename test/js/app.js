const Form = document.getElementById('person');
var formData = new FormData();
var object = {}; // Объект с помощью которого осуществляется смена формата данных с Formdata на Json
var json; // Данные формы отправляемые на сервер в формате json
var request = {}; // Ответ сервера

// Функция меняющая формат данных с Formdata на Json
function formToJson() {
	formData.forEach((value, key) => {object[key] = value});
	json = JSON.stringify(object);
}

// Функция проверки ответа сервера и вывода информации
function render() {
	if (request.name) {
			document.querySelector('.authorization__title').classList.add("done");
			document.getElementById('person').classList.add("done");
			document.getElementById('request').innerHTML='<img class="avatar" src="'
			+ request.photoUrl +'"> <div class="username">' 
			+ request.name + '</div> <button class="authorization__button" onclick="logout()">Logout</button>';
		} else {
			document.getElementById('incorrect').innerHTML="<p>E-Mail or password is incorrect</p>";
			document.getElementById('inp-mail').classList.add("error");
		}
}

// Функция кнопки Logout
function logout() {
    document.location.href = 'index.html';
}

// Обработка действий пользователя
Form.addEventListener('submit', function (e) {
	e.preventDefault();

    formData = new FormData(this);
	formToJson(); 

	// Подключение к серверу
	fetch('https://us-central1-mercdev-academy.cloudfunctions.net/login', {
		method: 'post',
		headers: {
             'Content-Type': 'application/json',
         },
		body: json
	}).then(function (response) {
		return (response.text());
	}).then(function (text) {

		request = JSON.parse(text);
		console.log(request);

		render(request);
	})
});


