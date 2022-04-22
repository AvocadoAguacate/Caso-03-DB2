import constants from './constants.js'
import axios from 'axios'

import { createCluster } from 'redis';

const libroEndpoint = (libro) => constants.endpoint(libro);
(async () => {
  console.log("Entra");
  const client = createCluster({
    rootNodes: [
      {
        url: 'redis://localhost:7000'
      },
      {
        url: 'redis://localhost:7001'
      },
      {
        url: 'redis://localhost:7002'
      },
      {
        url: 'redis://localhost:7003'
      },
      {
        url: 'redis://localhost:7004'
      },
      {
        url: 'redis://localhost:7005'
      }
    ]
  });

  client.on('error', (err) => console.log('Redis Client Error', err));

  await client.connect();

  //await client.set('Cinco', '5');
  const value = await client.get('1');
    if (value != null) {
      console.log("El libro ya existe");
    } else {
      console.log("El libro no existe");
      const apiResponse = await axios.get(libroEndpoint('1'));
      const libro = JSON.stringify(apiResponse.data);
      await client.SETEX('1', 10, libro );
      console.log(JSON.stringify(apiResponse.data));
    }
  console.log(value);
  process.exit(0);
})();

console.log('Inicio');