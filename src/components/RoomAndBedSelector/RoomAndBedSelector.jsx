import minus_icon from "../../assets/icons/minus-icon.svg";
import plus_icon from "../../assets/icons/plus-icon.svg";

function RoomAndBedSelector({ count, setCount, text }) {
  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <span className="">{text}</span>
        </div>
        <div className="flex gap-6 items-center">
          <button
            onClick={() => {
              setCount(count - 1);
            }}
            className={`w-8 h-8 rounded-full text-xl border border-gray-800 flex justify-center items-center ${
              count === 0
                ? "cursor-not-allowed opacity-40"
                : "opacity-70 hover:opacity-100 "
            }`}
            disabled={count === 0}
          >
            <img className="w-3" src={minus_icon} alt="minus icon" />
          </button>
          <span className="font-semibold w-5 flex justify-center">
            {count === 0 ? "any" : count + "+"}
          </span>
          <button
            onClick={() => {
                setCount(count + 1);
            }}
            className="w-8 h-8 rounded-full text-xl border border-gray-800 flex justify-center items-center"
          >
            <img className="w-3" src={plus_icon} alt="plus icon" />
          </button>
        </div>
      </div>
    </>
  );
}

export default RoomAndBedSelector;
