"use client";

import { AuthContext } from '@/context/auth';
import { CartContext } from '@/context/cart';
import { ICartItem } from '@/declarations';
import { Button } from '@nextui-org/button';
import { Image } from '@nextui-org/image';
import React, { FC } from 'react'

interface Props {
  item: ICartItem;
}


export const NormalCartItem: FC<Props> = ({ item }) => {

  const { isLogged } = React.useContext( AuthContext );
  const { onAddItem, onRemoveItem, isAddingItem, isRemovingItem, id, onAddMemoryItem, onRemoveMemoryItem } = React.useContext( CartContext );

  const [amount, setAmount] = React.useState(item.amount);

  const handleIncreaseAmount = () => {
    if( amount === item?.stock ){
      setAmount(item.stock);
    }else {
      setAmount(prev => prev + 1)
    }
    if(isLogged){
      onAddItem({
        cart_id: id,
        amount: 1,
        product_id: item.product_id
      });
    }else {
      onAddMemoryItem({
        ...item,
        amount: 1
      })
    }
  }

  const handleDecreaseAmount = () => {
    if( amount === 1 ){
      setAmount(1)
    }else {
      setAmount(prev => prev - 1)
    }
    if( isLogged ){
      onRemoveItem({
        cart_id: id,
        amount: 1,
        item_id: item.id,
        removeAll: false
      });
    }else {
      onRemoveMemoryItem({
        amount: 1,
        productId: item.product_id,
        removeAll: false
      })
    }
  }

  const handleRemoveItem = () => {
    if( isLogged ){
      onRemoveItem({
        cart_id: id,
        amount: 0,
        item_id: item.id,
        removeAll: true
      });
    }else {
      onRemoveMemoryItem({
        amount: 0,
        productId: item.product_id,
        removeAll: true
      })
    }
  }

  return (
    <div className='flex items-center'>
      <div>
        <Image
          className='rounded-lg'
          src={ item.image }
          alt=''
          width={ 200 }
          height={ 90 }
        /> 
      </div>
      <div className='px-4 lg:px-6 flex justify-between w-full'>
        <div className='flex flex-col gap-2'>
          <h2 className='uppercase text-sm lg:text-xl font-semibold'>{ item.name }</h2>
          <div>
            <span className='text-xs lg:text-sm font-semibold'>Detalles:</span>
            <div className='flex flex-col flex-wrap list-none text-xs lg:text-sm'>
              <li>Existencias: { item.stock }</li>
            </div>
          </div>
        </div>
        <div className='flex items-center gap-12'>
          <div className='flex flex-col gap-4'>
            <div className='flex flex-col items-center'>
              <span className='font-semibold text-xs lg:text-sm'>Precio: </span>
              <span className='text-xs lg:text-sm'>S/. { item.price }</span>
            </div>
            <div className='flex text-xs lg:text-sm'>
              <Button isLoading={ isAddingItem || isRemovingItem } onClick={ handleDecreaseAmount } size='sm' color='primary' variant='bordered'><i className="fa-solid fa-minus"></i></Button>
              <span className='py-1 px-2'>{ amount }</span>
              <Button isDisabled={ amount == item.stock } isLoading={ isAddingItem || isRemovingItem } onClick={ handleIncreaseAmount } size='sm' color='secondary' variant='bordered'><i className="fa-solid fa-plus"></i></Button>
            </div>
            <div className='text-xs lg:text-sm flex flex-col items-center'>
              <span className='font-semibold text-xs lg:text-sm'>Total: </span>
              <span>S/. { item.total }</span>
            </div>
          </div>
          <div>
            <Button size='sm' color='danger' variant='flat' onClick={ handleRemoveItem } isLoading={ isAddingItem || isRemovingItem }><i className="fa-solid fa-trash"></i></Button>
          </div>
        </div>
      </div>
    </div>
  )
}
