import Image from 'next/image';
import React from 'react';

interface propType {
  img: string;
  title: string;
  desc: string;
  price: string;
}

const MenuCard: React.FC<propType> = ({ img, title, desc, price }) => {
  return (
    <div className='flex gap-2'>
      <Image
        className='w-[80px] h-[80px]'
        //src={"/cenoura.jpg"}
        src={`/${img}`} 
        width={80}
        height={80}
        alt={`${title}`} 
      />
      <div className='space-y-2'>
        <div className='text-center py-1'>
          <h1>{title}</h1>
          <p className='text-[16px] text-gray-600 pt-1 whitespace-pre-line'>{desc}</p>
        </div>
        <p className='text-accent'>{price}</p>
      </div>
    </div>
  );
};

export default MenuCard;
