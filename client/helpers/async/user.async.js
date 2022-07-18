const login = async (graphqlFunction, data, setLoading, setError) => {
  try {
    setLoading(true);
    const response = await graphqlFunction({
      variables: {
        input: data,
      },
    });
    return response;
  } catch (error) {
    console.log({ error: error.message });
    setError(error.message);
  }
};

const register = async (graphqlFunction, data, setLoading, setError) => {
  try {
    setLoading(true);
    const response = await graphqlFunction({
      variables: {
        input: data,
      },
    });
    return response;
  } catch (error) {
    console.log({ error: error.message });
    setError(error.message);
  }
};

const search = async (graphqlFunction, data, setLoading, setError, token) => {
  try {
    setLoading(true);
    const response = await graphqlFunction({
      variables: {
        input: data,
      },
      context: {
        headers: {
          authorization: `Bearer ${token}`,
        },
      },
    });
    setLoading(false);
    return response;
  } catch (error) {
    console.log({ error: error.message });
    setError(error.message);
    setLoading(false);
  }
};

export { login, register, search };
