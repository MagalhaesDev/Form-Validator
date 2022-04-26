import isEmail from 'validator/lib/isEmail';

const form = document.querySelector('.container form') as HTMLFormElement;
const username = document.querySelector('.username') as HTMLInputElement;
const email = document.querySelector('.email') as HTMLInputElement;
const password = document.querySelector('.password') as HTMLInputElement;
const password2 = document.querySelector('.password2') as HTMLInputElement;

form.addEventListener('submit', function (event: Event) {
  event.preventDefault();
  hideErrorMessages(this);
  allFormsFields(username, email, password, password2);
  checkEmail(email);
  passwordWithTeenCharacters(password);
  samePassword(password, password2);
  if (shouldSendForm(this)) alert('Formulario enviado');
});

function allFormsFields(...inputs: HTMLInputElement[]): void {
  inputs.forEach((input) => {
    if (!input.value) showMessageError(input, 'Campo obrigatório.');
  });
}

function checkEmail(input: HTMLInputElement): void {
  if (!isEmail(input.value)) showMessageError(input, 'Email não valido');
}

function passwordWithTeenCharacters(input: HTMLInputElement): void {
  if (input.value.length < 10)
    showMessageError(input, 'Senha tem que ter no mínimo 10 caracteres');
}

function samePassword(
  password: HTMLInputElement,
  password2: HTMLInputElement,
): void {
  if (password.value !== password2.value) {
    showMessageError(password, 'As senhas não são iguais');
    showMessageError(password2, 'As senhas não são iguais');
  }
}

function showMessageError(input: HTMLInputElement, message: string): void {
  const formFields = input.parentElement as HTMLDivElement;
  const showSpanError = formFields.querySelector(
    '.error-message',
  ) as HTMLSpanElement;
  showSpanError.innerHTML = message;
  formFields.classList.add('show-error-message');
}

function hideErrorMessages(form: HTMLFormElement): void {
  form
    .querySelectorAll('.show-error-message')
    .forEach((item) => item.classList.remove('show-error-message'));
}

function shouldSendForm(form: HTMLFormElement): boolean {
  let send = true;
  form.querySelectorAll('.show-error-message').forEach(() => (send = false));

  return send;
}
