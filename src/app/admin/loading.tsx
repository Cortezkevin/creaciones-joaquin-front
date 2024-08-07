import { Skeleton, Spinner } from "@nextui-org/react";

export default function Loading(){
  return (
    <div className="w-full h-full bg-slate-300 flex items-center justify-center">
      <Spinner label="Loading..." size="lg" color="warning" />
    </div>
  )
}