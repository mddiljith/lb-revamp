export async function callApi(apiEndpoint, params) {
  try {
    let url = `${process.env.NEXT_PUBLIC_SITE_URL}/${apiEndpoint}`;

    const response = await fetch(url, params);
    if (response.status == 200) {
      const data = await response.json();
      return data;
    } else {
      throw new Error(`API request failed with status: ${response.status}`);
    }
  } catch (error) {
    console.log(error)
    // throw new Error(`API request failed: ${error.message}`);
  }
}