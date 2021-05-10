import React from "react";
import BreadCrumb from "../common/BreadCrumb";
import Table from "../common/Table";
import { UserMentors } from "../constants";

const headerList = [
    {title: "First Name", key: "firstName", className: "flex-basis-20"},
    {title: "Last Name", key: "lastName", type: '', className: "flex-basis-20"},
    {title: "Email", key: "email", type: '', className: "flex-basis-20"},
    {title: "Course", key: "course", type: '', className: "flex-basis-15"}
];

const Mentors = ({onClickAction}) => {    
  return (
    <div className="main-wrapper">
        <BreadCrumb />
        <Table
            headerList={headerList}
            tableBodyData={UserMentors}
            headerClassName=""
            tableClassName = ""
            onClickAction={onClickAction}
        />
    </div>
  );
};

export default Mentors;
