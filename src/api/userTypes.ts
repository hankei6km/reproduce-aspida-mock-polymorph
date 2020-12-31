export type UserItem = { id: number; group: number; name: string };
export type UserId = Pick<UserItem, 'id'>;
export type UserName = Pick<UserItem, 'name'>;
export type UserResBody<T> = {
  list: T[];
};
