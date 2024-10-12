import React from "react";
import List from "./AdminList"; // Assuming it's in the same folder
import { users } from "../constants/usersData"; // Users data

const AdminsList = () => {
  return <List items={users} title="NorthLark Admins" type="user" />;
};

export default AdminsList;
