'use client';

import Image from 'next/image';

import searchIcon from '@/public/search-icon.svg';

interface Props {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBox({ placeholder, value, onChange }: Props) {
  return (
    <div
      className='flex rtl:justify-left ltr:justify-right h-[64px] bg-white
                rounded-[5px] box-border border border-solid border-[#00000040]'
    >
      <Image className='w-[55px] h-[55px] rtl:pr-[42.92px] ltr:pl-[42.92px]' alt='' src={searchIcon} width='55' height='55' />
      <input
        type='text'
        className='w-full h-[26px] mx-[26.96px] my-[19px] text-[20px]/[26px] font-light placeholder:text-[#00000080]'
        style={{ outline: 'none' }}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}
