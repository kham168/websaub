// export const GET_ALL_USER_ENDPOINTS = {
//   GET_ALL_USER: (channel: string) => `/user/getAll/?channel=${channel}`,
//   // GET_ALL_USER: "/user/getAll/?channel=1",
// };
export const GET_ALL_USER_ENDPOINTS = {
  GET_ALL_USER: (channel: string) => `/user/selectAll?channel=${channel}`,
};

