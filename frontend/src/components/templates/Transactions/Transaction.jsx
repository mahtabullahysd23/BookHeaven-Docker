import React from "react";
import TransactionOrganism from "../../organisms/TransactionOrganism/TransactionOrganism";
import { useSelector } from "react-redux";
import UserTransctionOrganism from "../../organisms/UserTransctionOrganism/UserTransctionOrganism";

const Transaction = () => {
  const role = useSelector((state) => state.user.role);
  return <>{role==="admin" ? <TransactionOrganism /> : <UserTransctionOrganism/>}</>;
};

export default Transaction;
