import { IColumn, Table } from "@/components/Table";

type Row = {
  id: number;
  name: string;
  age: number;
  gender: string;
}

const columns: IColumn<Row>[] = [
  {
    id: "name",
    text: "Nombre",
    selector: (i) => (
      <div>{ i.name }</div>
    )
  },
  {
    id: "age",
    text: "Edad",
    selector: (i) => (
      <div>{ i.age }</div>
    )
  },
  {
    id: "gender",
    text: "Genero",
    selector: (i) => (
      <div>{ i.gender }</div>
    )
  },
]

const rows: Row[] = [
  {
    id: 1,
    name: "Kevin",
    age: 18,
    gender: "M"
  }
]

export default function DashboardPage() {
  return (
    <div>
      <Table columns={ columns } data={ rows } emptyMessage={"gaaaa"} />
    </div>
  )
}