const newUser = {
  firstName: 'ryan',
  lastName: 'gosling',
  email: 'ryan@gmail.com',
  password: 'ryangosl'
};

const emptyUser = {
  firstName: '',
  lastName: '',
  email: '',
  password: ''
};

const emptyFirstName = {
  ...newUser, firstName: ''
};

const emptyLastName = {
  ...newUser, lastName: ''
};

const emptyEmail = {
  ...newUser, email: ''
};

const emptyPassword = {
  ...newUser, password: ''
};

const nonAlphabetFirstName = {
  ...newUser, firstName: '#^%$7'
};

const nonAlphabetLastName = {
  ...newUser, lastName: '!@#$@66'
};

const invalidEmail = {
  ...newUser, email: 'ojuemail.com'
};

const invalidPassword = {
  ...newUser, password: '12sda'
};

const existingEmail = {
  ...newUser, email: 'ryan@gmail.com'
};

const emptyEmailToken = '';
const invalidEmailToken = 'gdteuf12';
const unexistingUserEmail = 'unexistinguser@gmail.com';
const expiredEmailToken = '';
const forgetPasswordEmail = { email: 'ryan@gmail.com' };
const nonExistingforgetPasswordEmail = { email: 'rtyeu@gmail.com' };
const invalidForgetPasswordEmail = { email: 'ryangmail.com' };
const resetPasswordEmail = { password: 'qwertyuiop' };
const emptyResetPasswordEmail = { password: '' };
const invalidResetPasswordEmail = { password: 'rya' };

const authUser = {
  email: 'ryan@gmail.com',
  password: 'ryangosl'
};

const emptyAuthUser = {
  email: '',
  password: ''
};

const emptyEmailAuthUser = {
  ...authUser, email: ''
};

const emptyPasswordAuthUser = {
  ...authUser, password: ''
};

const wrongEmail = {
  ...authUser, email: 'ling@gmail.com'
};

const wrongPassword = {
  ...authUser, password: 'jigtfjijjuhi'
};

const wrongEmailAuthUser = {
  ...authUser, email: 'ryangmail.com'
};


export {
  newUser,
  emptyUser,
  emptyFirstName,
  emptyLastName,
  emptyEmail,
  emptyPassword,
  nonAlphabetFirstName,
  nonAlphabetLastName,
  invalidEmail,
  invalidPassword,
  existingEmail,
  authUser,
  emptyAuthUser,
  emptyEmailAuthUser,
  emptyPasswordAuthUser,
  wrongEmail,
  wrongPassword,
  wrongEmailAuthUser,
  emptyEmailToken,
  expiredEmailToken,
  invalidEmailToken,
  unexistingUserEmail,
  forgetPasswordEmail,
  nonExistingforgetPasswordEmail,
  invalidForgetPasswordEmail,
  resetPasswordEmail,
  emptyResetPasswordEmail,
  invalidResetPasswordEmail
};
