import React from "react";
import { useParams } from "react-router-dom";
import { ExamDetail } from "./ExamDetail";

export const ExamDetailWrapper = () => {
  const { id } = useParams();
  return <ExamDetail id={id} />;
};
