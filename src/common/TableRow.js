import React from 'react';

const TableRow = ({ rowData, headerList, rowIndex, onClickAction, showAction }) => {
    return(
        <tr className="table-row" key={rowIndex}>
            <td className="flex-basis-5"> {rowIndex + 1} </td>

            { headerList.map((header, columnIndex) => {
                    const headerKey = header.key;

                    return (
                        <td className={header.className || "flex-basis-15"} key={columnIndex}>
                            {
                                rowData.hasOwnProperty(headerKey) ?
                                    rowData[headerKey].length > 0 ?
                                        rowData[headerKey]
                                        :
                                        '-'
                                    :
                                    '-'
                            }
                        </td>
                    )
                })
            }
            {
                onClickAction && showAction &&
                <td className="action-text" onClick={() => onClickAction(rowData.id)}> Schedule A Call </td>
            }
        </tr>
    )
};
export default TableRow;