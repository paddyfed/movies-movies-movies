const token = import.meta.env.PUBLIC_API_ACCESS_TOKEN;
export const apiOptions = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: token,
  },
};

export async function getData(fetchUrl) {
  try {
    const response = await fetch(fetchUrl, apiOptions);
    if (!response.ok) {
      throw new Error(response.status);
    }

    const parsedResponse = await response.json();
    return parsedResponse;
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
}
