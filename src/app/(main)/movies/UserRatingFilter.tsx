import { faChevronDown, faStar } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState } from "react";
import useOutsideClick from "@/src/app/hooks/useOutsideClick";

type Props = {
  userRating: number;
  setUserRating: (rating: number) => void;
};

export default function UserRatingFilter({ userRating, setUserRating }: Props) {
  const [isActive, setIsActive] = useState(false);
  const filterContainer = useRef<HTMLDivElement>(null);

  useOutsideClick(filterContainer, () => {
    if (isActive) {
      setIsActive(false);
    }
  });

  const toggleIsActive = () => setIsActive((prev) => !prev);

  const handleRatingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newRating = parseInt(e.target.value);
    setUserRating(newRating);
  };

  const handleReset = () => {
    setUserRating(0);
  };

  return (
    <span ref={filterContainer}>
      <button
        onClick={toggleIsActive}
        className={`rounded-md p-2  ${
          isActive
            ? "bg-slate-600 text-white"
            : "text-slate-300 hover:bg-slate-600 hover:text-white"
        }`}
      >
        <span className="mr-2">User Rating</span>
        <FontAwesomeIcon icon={faChevronDown} />
      </button>
      {isActive ? (
        <div
          className={
            "absolute z-10 mt-1 w-96 rounded bg-slate-700 p-5 shadow-lg"
          }
        >
          <div className="mb-3 flex justify-between">
            <h4 className="text-xl text-white">User Rating</h4>
            <button onClick={handleReset}>Reset</button>
          </div>
          <div>
            <div className="flex justify-between">
              <label className="text-white">Minimum Rating:</label>
              <input
                type={"range"}
                min="0"
                max="10"
                step="0.1"
                value={userRating}
                onChange={handleRatingChange}
              ></input>
              <span>
                <FontAwesomeIcon
                  icon={faStar}
                  className="mr-1 text-yellow-400"
                />
                {userRating}
              </span>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </span>
  );
}
