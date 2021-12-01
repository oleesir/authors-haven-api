
module.exports = {
  up: async (queryInterface) => queryInterface.bulkInsert('Comments', [
    {
      id: 'ba524847-61a5-46a7-b906-c908627fe586',
      userId: '85a55e95-6451-4de9-9470-85d579266922',
      articleId: '77397271-e5ac-4986-a415-3de7e1967d62',
      body: 'lets make nigeria great again',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '2039d412-0bee-430e-bdbf-ebbb341e4a35',
      userId: '6223576a-250c-4ef9-985d-4708517d62f3',
      articleId: '364f3214-7f9e-498d-bad0-11e7cc43cdf3',
      body: 'lets make nigeria great again again',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'fdcf7470-8646-4037-8fc0-bbcada64353d',
      userId: 'ff9ec60b-a42a-42c8-a16f-454cd83bfb66',
      articleId: '77397271-e5ac-4986-a415-3de7e1967d62',
      body: 'lets make nigeria great again',
      repliedTo: 'ba524847-61a5-46a7-b906-c908627fe586',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'ff4a05b2-f781-48f4-a491-78dfb63b7889',
      userId: '6223576a-250c-4ef9-985d-4708517d62f3',
      articleId: '77397271-e5ac-4986-a415-3de7e1967d62',
      body: 'lets make nigeria great again',
      repliedTo: 'fdcf7470-8646-4037-8fc0-bbcada64353d',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '74363eee-da9f-4abb-ad21-8bda020399ec',
      userId: '0e0c11dc-d41e-4b94-86fc-cf15c54b6118',
      articleId: '77397271-e5ac-4986-a415-3de7e1967d62',
      body: 'lets make nigeria great again',
      repliedTo: 'fdcf7470-8646-4037-8fc0-bbcada64353d',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'a5bc40f3-8e32-44f9-b93e-ae34e13e0471',
      userId: 'c877e81a-cd74-4ab5-91c6-3cee9084ac8c',
      articleId: '77397271-e5ac-4986-a415-3de7e1967d62',
      body: 'lets make nigeria great again',
      repliedTo: 'fdcf7470-8646-4037-8fc0-bbcada64353d',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '9ce58c1f-d2ac-4278-a7f0-700967a77446',
      userId: 'd9efbfbc-c993-44e0-b7b2-a20722d6ae59',
      articleId: '77397271-e5ac-4986-a415-3de7e1967d62',
      body: 'lets make nigeria great again and delete',
      repliedTo: 'fdcf7470-8646-4037-8fc0-bbcada64353d',
      createdAt: new Date(),
      updatedAt: new Date()
    }


  ], {}),

  down: (queryInterface) => queryInterface.bulkDelete('Comments', null, {})
};
