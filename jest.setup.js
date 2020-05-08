jest.mock('./server/src/helper/mailer', () => ({
  send: jest.fn()
}));
