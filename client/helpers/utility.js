export const resizeText = (txt, setResize, l = 120) => {
  if (txt.trim().length > l) {
    return (
      <>
        {txt.substring(0, l) + "..."}{" "}
        <button
          onClick={() => setResize(false)}
          className="text-gray-400 font-medium text-sm ml-2"
        >
          More
        </button>
      </>
    );
  } else {
    return txt;
  }
};

export const handler = (e, state, setState) => {
  setState({ ...state, [e.target.name]: e.target.value });
};
