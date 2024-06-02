import { ICategory } from "@/declarations";
import {Card, CardFooter} from "@nextui-org/card";
import {Image} from "@nextui-org/image";
import React, { FC } from 'react'

type Props = {
  category: ICategory
}

export const CategoryCard: FC<Props> = ({ category }) => {
  return (
    <Card
      isFooterBlurred
      isPressable
      radius="lg"
      className="border-none"
      isHoverable
    >
      <Image
        alt={ category.name }
        isZoomed
        className="object-cover"
        height={350}
        src={ category.url_image }
        width={350}
      />
      <CardFooter className="bg-[rgba(0,0,0,.3)] justify-center border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
        <p className="text-large text-white">{ category.name }</p>
      </CardFooter>
    </Card>
  )
}
