/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../../../../../css/exam-detail.css";
import handleGetExamByIdApi from "../../../../../services/examService";
export const ExamDetail = () => {
  const { id } = useParams();
  const [examByIdData, setExamByIdData] = useState();

  const getExam = async (examId) => {
    let examData = await handleGetExamByIdApi(examId);
    setExamByIdData(examData);
  };
  useEffect(() => {
    getExam(id);
  }, []);

  const listQuestions = examByIdData?.exam.questions.split();
  console.log("listQuestions: ", listQuestions);
  return (
    <div>
      <header className="headerContainer">
        <h2>
          .....................................................................
        </h2>
        <h2>Đề thi số {id}</h2>
        <h2>Môn học: Toán</h2>
      </header>
      <main className="mainExamContainer"></main>
    </div>
  );
};
