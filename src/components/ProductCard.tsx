import { IProduct } from '@/declarations'
import { Image } from '@nextui-org/image'
import { useRouter } from 'next/navigation'
import React, { FC, useMemo } from 'react'

type Props = {
  product: IProduct
}

export const ProductCard: FC<Props> = ({ product }) => {

  const router = useRouter();
  const [isHover, setIsHover] = React.useState(false);

  const image = React.useMemo(() => {
    if( isHover ){
      return product.images[1];
    }
    return product.images[0];
  }, [ isHover ]);

  const handleClick = () => {
    router.push(`/product/${product.id}`)
  }

  return (
    <div className="flex flex-col gap-2 shadow-lg cursor-pointer min-w-[250px] max-w-[250px]" onClick={handleClick}>
      <div className='p-2 bg-white min-h-[250px] flex items-center justify-center'>
        <Image className='rounded-none' src={image} width={200} height={200} alt={product.name} onMouseOver={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}/>
      </div>
      <div className='flex flex-col px-4 py-4 gap-3'>
        <h3 className="text-sm font-semibold text-wrap">{ product.name.toUpperCase() }</h3>
        <span className="text-red-600">Desde: S/. { product.price }</span>
      </div>
    </div>
  )
}
