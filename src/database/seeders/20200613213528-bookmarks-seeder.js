
module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('Bookmarks', [
    {
      id: '9187f0bc-8d35-442b-ba59-2fff0dc0d9e4',
      userId: '85a55e95-6451-4de9-9470-85d579266922',
      articleId: '77397271-e5ac-4986-a415-3de7e1967d62',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'dfd24655-3dec-4ca3-998b-ac6b48abb395',
      userId: '85a55e95-6451-4de9-9470-85d579266922',
      articleId: '364f3214-7f9e-498d-bad0-11e7cc43cdf3',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'fe4472d2-6be8-4050-b70f-ee443d6bf5c1',
      userId: '85a55e95-6451-4de9-9470-85d579266922',
      articleId: 'a792d2eb-95ac-4fe2-8cb8-03e521c7a08c',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'eb0cddd1-6792-4be3-84a9-9565bc32fe66',
      userId: '85a55e95-6451-4de9-9470-85d579266922',
      articleId: 'ed2f7086-dfdd-436e-8470-2c788a4f6d57',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '45a7fd13-3788-4576-9a46-37b37ea59ff1',
      userId: '85a55e95-6451-4de9-9470-85d579266922',
      articleId: 'fe8f4af7-2878-4952-ab56-4615c9790b46',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '4e7ffff1-a29f-4ebc-9874-7ebcac13ce7d',
      userId: '85a55e95-6451-4de9-9470-85d579266922',
      articleId: '6ae35fd1-b459-4ff5-aeb6-a23a290e32d9',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ], {}),

  down: (queryInterface) => queryInterface.bulkDelete('Bookmarks', null, {})
};
