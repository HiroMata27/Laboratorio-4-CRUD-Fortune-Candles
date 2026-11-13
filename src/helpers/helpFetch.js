
export const helpFetch = () => {
  const customFetch = async (endpoint, options = {}) => {
    const defaultHeaders = {
      "Content-Type": "application/json",
    };

    const config = {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    };

    try {
      const response = await fetch(endpoint, config);

      if (!response.ok) {
        throw new Error(
          `Error ${response.status}: ${response.statusText}`
        );
      }

      if (response.status === 204) {
        return null;
      }

      return await response.json();
    } catch (error) {
      console.error("Error en la petición:", error);
      throw error;
    }
  };

  return {
    get: (url) => customFetch(url),

    post: (url, data) =>
      customFetch(url, {
        method: "POST",
        body: JSON.stringify(data),
      }),

    put: (url, data) =>
      customFetch(url, {
        method: "PUT",
        body: JSON.stringify(data),
      }),

    del: (url) =>
      customFetch(url, {
        method: "DELETE",
      }),
  };
};
