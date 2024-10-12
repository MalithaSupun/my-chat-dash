import React from "react";
import List from "./AdminList"; // Assuming it's in the same folder
import { groups } from "../constants/groupsData"; // Groups data

const GroupsList = () => {
  return <List items={groups} title="NorthLark Groups" type="group" />;
};

export default GroupsList;
