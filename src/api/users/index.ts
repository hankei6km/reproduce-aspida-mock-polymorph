import { mockMethods } from 'aspida-mock';
import { UserResBody, UserItem, UserId, UserName } from '../userTypes';

export type Methods = {
  get: {
    query?: {};
    resBody: UserResBody<UserItem>;
    polymorph: [
      {
        query?: { fields: 'id' };
        resBody: UserResBody<UserId>;
      },
      {
        query?: { fields: 'name' };
        resBody: UserResBody<UserName>;
      }
    ];
  };
};

export default mockMethods<Methods>({
  get: ({ query, reqHeaders, reqBody }) => ({
    status: 200,
    resHeaders: {},
    resBody: {
      list: [{ id: 20, group: 200, name: 'bar' }]
    },
    polymorph: [
      {
        resBody: {
          list: [{ id: 20 }]
        }
      },
      {
        resBody: {
          list: [{ name: 'bar' }]
        }
      }
    ]
  })
});
