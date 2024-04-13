interface TablePropsI {
  children: React.ReactNode;
}

const Table = ({ children }: TablePropsI) => {
  return (
    <div>
      <table className="w-full border border-solid border-primary-gray-150 overflow-x-auto">
        {children}
      </table>
    </div>
  );
};

interface TableRowPropsI {
  children: React.ReactNode;
}

Table.Row = ({ children }: TableRowPropsI) => {
  return <tr>{children}</tr>;
};

interface TableHeadContainerPropsI {
  children: React.ReactNode;
}
Table.HeadContainer = ({ children }: TableHeadContainerPropsI) => {
  return (
    <thead className="w-full">
      <Table.Row>{children}</Table.Row>
    </thead>
  );
};

interface TableThPropsI {
  children: React.ReactNode;
}

Table.Th = ({ children }: TableThPropsI) => {
  return (
    <th className="text-base font-semibold leading-xl min-w-[150px]    py-1 capitalize">
      {children}
    </th>
  );
};

interface TableHeadPropsI {
  tableColumn: string[];
}

Table.Head = ({ tableColumn }: TableHeadPropsI) => {
  return (
    <Table.HeadContainer>
      {tableColumn.map((col, idx) => (
        <Table.Th key={idx}>{col}</Table.Th>
      ))}
    </Table.HeadContainer>
  );
};

interface TableBodyPropsI {
  children: React.ReactNode;
}

Table.Body = ({ children }: TableBodyPropsI) => {
  return <tbody>{children}</tbody>;
};

interface TableTdPropsI {
  data?: number | string | null | undefined;
  children?: React.ReactNode;
}

Table.Col = ({ data, children }: TableTdPropsI) => {
  return (
    <td
      align="center"
      className="text-primary-gray-700 border-t border-solid border-primary-gray-150 py-3"
    >
      {data || children || "..."}
    </td>
  );
};

interface EmptyTdPropsI {
  colSpan: number;
  text?: string;
  bgColor?: string;
}
Table.Empty = ({ colSpan, text, bgColor }: EmptyTdPropsI) => {
  return (
    <tr>
      <td
        className={`text-center p-[8rem] text-2xl bg-slate-50 ${bgColor}`}
        colSpan={colSpan}
      >
        {text || "No Data Found"}
      </td>
    </tr>
  );
};

export default Table;
