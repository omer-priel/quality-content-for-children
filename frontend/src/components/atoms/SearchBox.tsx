'use client';

interface Props {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBox({ placeholder, value, onChange }: Props) {
  return (
    <div className="relative text-right text-gray-300">
      <div className="flex justify-left h-[55px] bg-gray-200 rounded-[50px] box-border border-[1px] border-solid border-gray-300">
        <img
          className="w-[55px] h-[55px] mr-[24px] overflow-hidden"
          alt=""
          src="/search-vaadinglasses.svg"
        />
        <input
        type="text"
        className="w-[349px] h-[25px] mx-[24px] my-[15px] font-light"
        style={{outline: 'none'}}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        />
      </div>
    </div>
  );
}