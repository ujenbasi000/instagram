const login = async (graphqlFunction, data, setLoading, setError) => {
  try {
    setLoading(true);
    const response = await graphqlFunction({
      variables: {
        input: data,
      },
    });
    console.log({ response });
    return data;
  } catch (error) {
    console.log({ error: error.message });
    setError(error.message);
  }
};

export default login;
