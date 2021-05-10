import React from "react";
import TableRow from "./TableRow";
import { MentorContext } from "../context/mentorContext";

const Table = ({
  headerList,
  tableBodyData,
  headerClassName = "",
  tableClassName = "",
  onClickAction
}) => {
  const context = React.useContext(MentorContext);
  return (
    <table className={`tableContent ${tableClassName}`}>
      <thead className="tableHeader">
        <tr className={`${headerClassName}`}>
          <th className="flex-basis-5"> S/N </th>
          {headerList &&
            headerList.map((header, index) => (
              <th className={header.className || "flex-basis-15"} key={index}>
                {" "}
                {header.title}{" "}
              </th>
            ))}
        </tr>
      </thead>
      <tbody className="">
        {tableBodyData &&
          tableBodyData.map((rowData, rowIndex) => {
            const scheduled = context ? context.state.schedules.find(schedule => schedule.mentorId === rowData.id) : false;
            return <TableRow
              rowData={rowData}
              rowIndex={rowIndex}
              headerList={headerList}
              key={rowIndex}
              onClickAction={onClickAction}
              showAction={!scheduled}
            />
          })}
      </tbody>
    </table>
  );
};

export default Table;
