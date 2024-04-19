import Column from "./Column";
import { ColumnType } from "../../interface/DashboardType";

export default function Columns({ columns }: { columns: ColumnType[] }) {
  return (
    <>
      {columns?.map((col: ColumnType, index) => (
        <Column key={col.id} col={col} />
      ))}
    </>
  );
}
