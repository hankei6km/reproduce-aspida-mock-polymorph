import express from 'express';
import fetch from 'node-fetch';
import aspida from '@aspida/node-fetch';
import api from './api/$api';
import mock from './api/$mock';
import { UserResBody, UserId, UserName, UserItem } from './api/userTypes';

const app = express();
const port = 8080;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/users', (req, res) => {
  const UserList = [{ id: 10, group: 100, name: 'foo' }];
  switch (req.query.fields) {
    case 'id':
      {
        const list: UserResBody<UserId> = {
          list: UserList.map(({ id }) => ({ id }))
        };
        res.json(list);
      }
      return;
    case 'name':
      {
        const list: UserResBody<UserName> = {
          list: UserList.map(({ name }) => ({ name }))
        };
        res.json(list);
      }
      return;
  }
  const list: UserResBody<UserItem> = { list: UserList };
  res.json(list);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
  (async () => {
    {
      // api
      const client = api(
        aspida(fetch, {
          baseURL: `http://localhost:${port}/`
        })
      );

      const users = await client.users.get({});
      console.log(users.body); // { list: [ { id: 10, group: 100, name: 'foo' } ] }
      const ids = await client.users.get({ query: { fields: 'id' } });
      console.log(ids.body); // { list: [ { id: 10 } ] }
      const names = await client.users.get({ query: { fields: 'name' } });
      console.log(names.body); // { list: [ { name: 'foo' } ] }
    }

    {
      // mock
      const client = mock(
        aspida(fetch, {
          baseURL: `http://localhost:${port}/`
        })
      );

      const users = await client.users.get({});
      console.log(users.body); // { list: [ { id: 20, group: 200, name: 'bar' } ] }
      const ids = await client.users.get({ query: { fields: 'id' } });
      console.log(ids.body); // { list: [ { id: 20, group: 200, name: 'bar' } ] }
      const names = await client.users.get({ query: { fields: 'name' } });
      console.log(names.body); // { list: [ { id: 20, group: 200, name: 'bar' } ] }
    }
  })();
});
