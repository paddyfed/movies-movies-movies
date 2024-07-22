const token = import.meta.env.PUBLIC_API_ACCESS_TOKEN;
export const apiOptions = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: token,
  },
};
