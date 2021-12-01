const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface) => queryInterface.bulkInsert('Users', [
    {
      id: '85a55e95-6451-4de9-9470-85d579266922',
      firstName: 'lee',
      lastName: 'chang',
      email: 'lee@email.com',
      password: await bcrypt.hash('qwertyuiop', 10),
      isVerified: true,
      role: 'user',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '6223576a-250c-4ef9-985d-4708517d62f3',
      firstName: 'Nikolai',
      lastName: 'Fenimore',
      email: 'nfenimore0@umich.edu',
      password: await bcrypt.hash('qwertyuiop', 10),
      isVerified: true,
      role: 'user',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'ff9ec60b-a42a-42c8-a16f-454cd83bfb66',
      firstName: 'Charla',
      lastName: 'Kruszelnicki',
      email: 'ckruszelnicki1@sfgate.com',
      password: await bcrypt.hash('qwertyuiop', 10),
      isVerified: true,
      role: 'user',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '0e0c11dc-d41e-4b94-86fc-cf15c54b6118',
      firstName: 'Shanan',
      lastName: 'Meadley',
      email: 'smeadley2@cam.ac.uk',
      password: await bcrypt.hash('qwertyuiop', 10),
      isVerified: true,
      role: 'user',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'c877e81a-cd74-4ab5-91c6-3cee9084ac8c',
      firstName: 'Luce',
      lastName: 'Fishwick',
      email: 'lfishwick3@noaa.gov',
      password: await bcrypt.hash('qwertyuiop', 10),
      isVerified: true,
      role: 'user',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '2e677e5a-1806-4188-a279-38ef27978299',
      firstName: 'Lindy',
      lastName: 'Niaves',
      email: 'lniaves4@netscape.com',
      password: await bcrypt.hash('qwertyuiop', 10),
      isVerified: true,
      role: 'user',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'd9efbfbc-c993-44e0-b7b2-a20722d6ae59',
      firstName: 'olive',
      lastName: 'sir',
      email: 'olive@email.com',
      password: await bcrypt.hash('qwertyuiop', 10),
      isVerified: true,
      role: 'user',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ], {}),

  down: (queryInterface) => queryInterface.bulkDelete('Users', null, {})
};
