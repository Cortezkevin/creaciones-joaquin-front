"use client";

import { ICartItem } from '@/declarations';
import { Button } from '@nextui-org/button';
import { Image } from '@nextui-org/image';
import React, { FC } from 'react'

interface Props {
  item: ICartItem;
}


export const OrderDetail: FC<Props> = ({ item }) => {
  return (
    <div className='flex items-center min-w-[600px]'>
      <div className='flex gap-3 items-center'>
        <div className='min-w-[140px]'>
          <Image
            className='rounded-lg'
            src={ item.image }
            alt=''
            width={ 140 }
            height={ 90 }
          /> 
        </div>
        <div className='flex flex-col gap-2 h-[90px] justify-center'>
          <h2 className='uppercase text-sm lg:text-md font-semibold'>{ item.name }</h2>
          <div className='flex items-center gap-3'>
            <span className='text-xs lg:text-sm'>Cantidad: </span>
            <span className='font-semibold text-xs lg:text-sm'>{ item.amount }</span>
          </div>
        </div>
      </div>
      <div className='flex justify-around w-full'>
        <div className='flex flex-col items-center pl-6'>
          <span className='font-semibold text-xs lg:text-sm'>Precio: </span>
          <span className='text-xs lg:text-sm'>S/. { item.price }</span>
        </div>
        <div className='text-xs lg:text-sm flex flex-col items-center'>
          <span className='font-semibold text-xs lg:text-sm'>Total: </span>
          <span>S/. { item.total }</span>
        </div>
      </div>
    </div>
  )
}
