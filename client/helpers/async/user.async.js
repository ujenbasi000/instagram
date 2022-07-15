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

export { login, register };
