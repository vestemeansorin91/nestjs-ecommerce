const axios = require('axios');

(async () => {
  const { data } = await axios.post('http://localhost:3000/auth/login', {
    username: 'newmagicifilms',
    password: 'Pass1234',
  });

  console.log(data);
})();
