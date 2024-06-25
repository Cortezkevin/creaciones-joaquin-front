export type IColumn<T> = {
  id: keyof T | string;
  text: string;
  selector: ( row: T ) => JSX.Element;
}

type TableProps<T> = {
  columns: IColumn<T>[];
  data: T[];
  emptyMessage: JSX.Element | string;
}

export function Table<T>({ columns, data, emptyMessage }: TableProps<T>){
  return (
    <div className="flex p-3 flex-col gap-2 w-full bg-white shadow-md border border-slate-200 rounded-xl overflow-auto"> {/*  */}
      <div style={{ gridTemplateColumns: `repeat(${columns.length}, minmax(0, 1fr))` }} className={`grid w-full text-xs min-w-[400px] font-semibold text-[#717389] bg-[#f3f3f5] rounded-lg items-center p-3`}>
        {
          columns.map( c => (
            <div key={c.id.toString()}>{ c.text }</div>
          ))
        }
      </div>
      {
        data.length === 0 
        ? ( <div className="grid w-full justify-center text-[#91929a] text-[15px] my-[20px]">
          { emptyMessage }
        </div> )
        : data.map((i: T, index) => (
          <div style={{ gridTemplateColumns: `repeat(${columns.length}, minmax(0, 1fr))` }} className="grid text-sm w-full min-w-[400px] px-3 my-[3px] items-center" key={ index }>
            { columns.map( c => (
                c.selector( i )
            ))}
          </div>
        ))
      }
    </div>
  )
}