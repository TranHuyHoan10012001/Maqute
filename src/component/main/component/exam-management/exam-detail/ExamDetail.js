/* eslint-disable react-hooks/exhaustive-deps */
import {
  CloudDownloadOutlined,
  EditOutlined,
  CommentOutlined,
} from "@ant-design/icons";
import { Button, Input, Modal } from "antd";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import "../../../../../css/exam-detail.css";
import { handleGetExamByIdApi } from "../../../../../services/examService";
import { jsPDF } from "jspdf";
import { Context } from "../../../../../context";
import { font } from "./common";
import { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export const ExamDetail = () => {
  const context = useContext(Context);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pdfFile, setPdfFile] = useState();
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const { id } = useParams();
  const [examByIdData, setExamByIdData] = useState();
  const [questionsToRender, setQuestionsToRender] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [numPages, setNumPages] = useState(null);

  const getExam = async (examId) => {
    let examData = await handleGetExamByIdApi(examId);
    setExamByIdData(examData);
    if (examData.exam.file) {
      const file = require(`uploads/${examData.exam.file}`);
      setPdfFile(file);
    }
  };
  const createPDF = async () => {
    const pdf = new jsPDF("portrait", "pt", "a4");
    const data = await document.querySelector("#pdf-container");
    const cloneData = data.cloneNode(true);
    cloneData.style.width = "600px";
    pdf.addFileToVFS("times-normal.ttf", font);
    pdf.addFont("times-normal.ttf", "times", "normal");
    pdf.setFont("times");
    pdf.html(cloneData).then(() => {
      pdf.save(`De_thi_so_${id}.pdf`);
    });
  };
  useEffect(() => {
    getExam(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let questionAllContext = context?.questionsList?.questions;
    let keyAllContext = context?.key.keys;
    if (examByIdData && examByIdData.exam.questions && questionAllContext) {
      const listQuestions = examByIdData?.exam;

      let questionIdList = listQuestions?.questions.split(",");
      const questions = questionIdList.map((questionId) => {
        let questionContent = questionAllContext.find(
          (question) => question.id == questionId
        );
        if (questionContent.category === "Trắc nghiệm") {
          questionContent.answer = keyAllContext.find(
            (key) => key.questionId == questionId
          );
        }
        return questionContent;
      });
      console.log("questions to render: ", questions);
      setQuestionsToRender(questions);
    }
  }, [examByIdData]);

  const QuestionDetail = ({ question, index }) => {
    const answers =
      question.answer !== undefined ? question.answer.keyAnswer.split("|") : [];
    return (
      <div>
        <h4>{`Câu ${index + 1}: ${question.content.replace(
          /<[^>]+>/g,
          ""
        )}`}</h4>
        {question.category === "Trắc nghiệm" ? (
          answers.map((answer) => (
            <>
              <span>{answer.replace(/<[^>]+>/g, "")}</span>
              <br />
            </>
          ))
        ) : (
          <br />
        )}
      </div>
    );
  };

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div>
      <div className="action-exam">
        <div className="upload">
          <Button icon={<CloudDownloadOutlined />} onClick={() => createPDF()}>
            Xuất file
          </Button>
        </div>
        <div className="edit-exam">
          <Button icon={<EditOutlined />} onClick={showModal}>
            Chỉnh sửa đề thi
          </Button>
          <Modal
            title="Chỉnh sửa đề thi"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <div>
              Câu hỏi bạn muốn chỉnh sửa là
              <Input type="number" />
            </div>
          </Modal>
        </div>
        <div className="analyst-exam">
          <Button icon={<CommentOutlined />}>Đánh giá đề thi</Button>
        </div>
      </div>
      {examByIdData?.exam.file ? (
        <Document file={pdfFile} onLoadSuccess={onDocumentLoadSuccess}>
          <Page pageNumber={1} renderTextLayer={false} />
        </Document>
      ) : (
        <div
          className="exam-detail"
          id="pdf-container"
          style={{ fontFamily: '"Times New Roman", Times, serif' }}
        >
          <header className="headerContainer">
            <h2>
              .....................................................................
            </h2>
            <h2>Đề thi số {id}</h2>
            <h2>Môn học: {examByIdData?.exam.subject}</h2>
            <h3>Thời gian: {examByIdData?.exam.timeLimit} phút</h3>
          </header>
          <main className="mainExamContainer">
            {questionsToRender.map((question, index) => (
              <QuestionDetail question={question} index={index} />
            ))}
          </main>
        </div>
      )}
    </div>
  );
};
