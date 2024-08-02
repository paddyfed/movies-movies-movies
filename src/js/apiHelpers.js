const token = import.meta.env.PUBLIC_API_ACCESS_TOKEN;

const apiOptions = {
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

export function buildFetchUrl(fetchUrl, paramsObj) {
  const fullFetchUrl = new URL(fetchUrl, import.meta.env.PUBLIC_API_URL);
  for (const key in paramsObj) {
    fullFetchUrl.searchParams.append(key, paramsObj[key]);
  }
  return fullFetchUrl;
}
