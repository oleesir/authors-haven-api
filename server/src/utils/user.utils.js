const getSignupUserData = Obj => ({
  firstName: Obj.firstName,
  lastName: Obj.lastName,
  email: Obj.email,
  password: Obj.password
});

export default getSignupUserData;
