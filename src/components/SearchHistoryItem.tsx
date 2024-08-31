import SearchIcon from "../icons/SearchIcon";
import DeleteIcon from "../icons/DeleteIcon";

type Props = {
  id: string;
  name: string;
  dateTime: string;
  onClickSearch: () => void;
  onClickDelete: () => void;
};

const SearchHistoryItem = ({
  id,
  name,
  dateTime,
  onClickSearch,
  onClickDelete,
}: Props) => {
  return (
    <div
      key={id}
      className="flex rounded-[16px] bg-white/40 px-4 py-3 dark:bg-[#1A1A1A80]"
    >
      <div className="flex-1 sm:mr-2 sm:flex sm:items-center">
        <p className="mr-auto">{name}</p>
        <p className="text-sm dark:text-white/50">{dateTime}</p>
      </div>
      <div className="flex gap-x-2">
        <button
          className="rounded-full bg-white p-2 text-black/50 shadow-md dark:border-2 dark:border-white/40 dark:bg-transparent dark:text-white/50 dark:shadow-none"
          onClick={onClickSearch}
        >
          <SearchIcon />
        </button>
        <button
          className="rounded-full bg-white p-2 text-black/50 shadow-md dark:border-2 dark:border-white/40 dark:bg-transparent dark:text-white/50 dark:shadow-none"
          onClick={onClickDelete}
        >
          <DeleteIcon />
        </button>
      </div>
    </div>
  );
};

export default SearchHistoryItem;
