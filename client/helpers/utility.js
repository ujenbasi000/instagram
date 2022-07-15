import { format } from "date-fns";
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

export const getDate = (time) => {
  if (time) {
    const date = new Date(+time);
    const today = new Date();
    const diff = today.getTime() - date.getTime();
    const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diff / (1000 * 60 * 60));
    const diffMinutes = Math.floor(diff / (1000 * 60));
    const diffSeconds = Math.floor(diff / 1000);
    if (diffDays === 0) {
      if (diffHours === 0) {
        if (diffMinutes === 0) {
          return `${diffSeconds}s`;
        } else {
          return `${diffMinutes}m`;
        }
      } else {
        return `${diffHours}h`;
      }
    } else {
      return format(date, "MMM d, yyyy");
    }
  }
};

export const handler = (e, state, setState) => {
  setState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
};
