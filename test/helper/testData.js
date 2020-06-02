import jwt from 'jsonwebtoken';


const newUser = {
  firstName: 'ryan',
  lastName: 'gosling',
  email: 'ryan@gmail.com',
  password: 'ryangosl'
};

const unverifiedNewUser = {
  firstName: 'jack',
  lastName: 'mailyright',
  email: 'mailyright@gmail.com',
  password: 'qwertyuioop'
};

const followNewUser = {
  firstName: 'lisa',
  lastName: 'blossom',
  email: 'blossom@gmail.com',
  password: 'qwertyuioop'
};

const followNewUserOne = {
  firstName: 'stephine',
  lastName: 'thelma',
  email: 'stephine@gmail.com',
  password: 'qwertyuioop'
};

const followNewUserTwo = {
  firstName: 'ann',
  lastName: 'hope',
  email: 'hope@gmail.com',
  password: 'qwertyuioop'
};


const followNewUserThree = {
  firstName: 'julie',
  lastName: 'anita',
  email: 'ify@gmail.com',
  password: 'qwertyuioop'
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

const unverifiedAuthUser = {
  email: 'mailyright@gmail.com',
  password: 'qwertyuioop'
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

const req = {
  user: {
    _json: {
      id: '222222222',
      name: 'ryan gosling',
      email: 'ryan@gmail.com'
    }
  }
};

const userArticle = {
  firstName: 'jeff',
  lastName: 'gosling',
  email: 'jeffy@gmail.com',
  password: 'jeffyisgood'
};

const userPayload = {
  email: 'ryan@gmail.com',
  password: 'ryangosl'
};

const anotherPayload = {
  email: 'tweet@gmail.com',
  id: '127db482-889e-44d3-8ad9-1a2709295a42'
};
const expiredToken = jwt.sign(userPayload, process.env.SECRET_KEY, { expiresIn: '1' });
const anotherToken = jwt.sign(anotherPayload, process.env.SECRET_KEY, { expiresIn: '1day' });
const newArticle = { title: 'hello ivy', body: 'God is the greatest' };
const newArticle1 = { title: 'hello amaka', body: 'how you? today is a good day', type: 'draft' };
const newArticleWrongType = { title: 'hello amaka', body: 'how you? today is a good day', type: 'king' };
const updatedArticle = {
  ...newArticle1, title: 'hello rita', body: 'real friends', type: 'published'
};
const nonexistingArticle = { title: 'hello spaces', body: 'length can change at any timeand data can be stored at non contiguous', type: 'published' };
const articleToDelete = { title: 'hello spaces', body: 'length can change at any timeand data can be stored at non contiguous', type: 'published' };
const emptyTitle = { title: '', body: 'hello devs' };
const oneTitle = { title: 'e', body: 'hello devs' };
const wrongArticleId = '127db482-889e-44d3-8ad9-3ywywtyw-3763562';
const wrongArticleId1 = 'bf0a9c55-6840-427e-9414-40e8434e24ba';
const nonexistingArticleId = 'bf0a9c55-6840-427e-9414-40e8434e24ba';
const wrongupdateArticleId = '0354cd08-9fe2-11ea-bb37-0242ac130002';
const unknownUserId = '42065633-95d0-47ae-8eac-1c361ab29ff2';
const nonexistingAuthor = { followId: 'fa1a5de1-3e71-4b75-8fa4-b0eec28e54c8' };
const emptyfollowId = { followId: '' };
const invalidfollowId = { followId: 'fa1a5de1-3e71-4b75-8fa4b0eec28e88c8' };
const emptyTitleUpdate = { ...newArticle, title: '', body: 'A Version 4 UUID is a universally unique identifier that is generated using' };
const wrongTypeUpdate = {
  ...newArticle, title: 'hello', body: 'A Version 4 UUID is a universally unique identifier that is generated using', type: 'joy'
};


export {
  req,
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
  invalidResetPasswordEmail,
  newArticle,
  userArticle,
  emptyTitle,
  oneTitle,
  expiredToken,
  wrongArticleId,
  anotherToken,
  newArticle1,
  updatedArticle,
  nonexistingArticle,
  wrongArticleId1,
  emptyTitleUpdate,
  wrongTypeUpdate,
  newArticleWrongType,
  wrongupdateArticleId,
  articleToDelete,
  nonexistingArticleId,
  unverifiedNewUser,
  unverifiedAuthUser,
  followNewUser,
  followNewUserOne,
  followNewUserTwo,
  nonexistingAuthor,
  emptyfollowId,
  invalidfollowId,
  unknownUserId,
  followNewUserThree
};
