type Props = {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isAutoFocus: boolean;
  required?: boolean;
};

const Input = ({ name, value, onChange, isAutoFocus, required }: Props) => {
  return (
    <div className="bg-input dark:bg-input-dark flex w-full flex-col overflow-hidden rounded-[20px] px-6 py-2 text-black dark:text-white">
      <label
        className="text-input-label dark:text-input-label-dark text-xs"
        htmlFor={name}
      >
        {name}
        {required && (
          <span className="ml-1 text-red-600 dark:text-red-400">*</span>
        )}
      </label>
      <input
        className="bg-transparent focus:outline-none"
        type="text"
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        autoFocus={isAutoFocus}
        autoComplete="off"
      />
    </div>
  );
};

export default Input;
