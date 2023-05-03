/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "../../../../../css/add-question.css";
import { Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { handleQuestionAddApi } from "../../../../../services/questionService";
import { Context } from "../../../../../context";
import { handleAddKeyApi } from "../../../../../services/keyService";

export const AddQuestion = () => {
  const context = useContext(Context);
  const user = context?.user;
  const author = user?.firstName + user?.lastName;
  const navigate = useNavigate();
  const [questionContent, setQuestionContent] = useState("");
  const [questionSubject, setQuestionSubject] = useState("");
  const [questionCategory, setQuestionCategory] = useState("Trắc nghiệm");
  const [questionLevel, setQuestionLevel] = useState("Thông hiểu");
  const [keyA, setKeyA] = useState("");
  const [keyB, setKeyB] = useState("");
  const [keyC, setKeyC] = useState("");
  const [keyD, setKeyD] = useState("");
  const [keyAnswer, setKeyAnswer] = useState("");
  const [key, setKey] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const keyMultiChoice = keyA + "|" + keyB + "|" + keyC + "|" + keyD;

  const handleOnclickAddQuestion = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    try {
      let newQuestionData = await handleQuestionAddApi(
        questionContent,
        questionCategory === "Trắc nghiệm" ? key : keyAnswer,
        questionSubject,
        questionCategory,
        questionLevel,
        author
      );
      console.log("keyMultiChoice: ", keyMultiChoice);
      let newKeyMultiChoice = await handleAddKeyApi(
        newQuestionData?.question?.id,
        keyMultiChoice
      );
      if (
        (newQuestionData && newQuestionData.errorCode !== 200) ||
        (newKeyMultiChoice && newKeyMultiChoice.errorCode !== 200)
      ) {
        setErrorMessage(newQuestionData.message);
      }
      if (
        (newQuestionData && newQuestionData.errorCode === 200) ||
        (newKeyMultiChoice && newKeyMultiChoice.errorCode === 200)
      ) {
        navigate("/question-management");
      }
    } catch (error) {
      if (error.response) {
        if (error.response.data) {
          setErrorMessage(error.response.data.message);
        }
      }
    }
  };

  return (
    <div className="addQuestionContainer">
      <div className="questionContent">
        <h2>Nội dung câu hỏi</h2>
        <CKEditor
          editor={ClassicEditor}
          data={questionContent}
          onReady={(editor) => {
            // You can store the "editor" and use when it is needed.
            console.log("Editor is ready to use!", editor);
          }}
          onChange={(event, editor) => {
            const data = editor.getData();
            setQuestionContent(data);
          }}
        />
      </div>
      <div className="questionKey">
        <h2>Đáp án</h2>
        {questionCategory === "Trắc nghiệm" && (
          <form style={{ display: "flex", flexDirection: "column" }}>
            <div className="key">
              A. <Input onChange={(e) => setKeyA(e.target.value)} />
            </div>
            <div className="key">
              B. <Input onChange={(e) => setKeyB(e.target.value)} />
            </div>
            <div className="key">
              C. <Input onChange={(e) => setKeyC(e.target.value)} />
            </div>
            <div className="key">
              D. <Input onChange={(e) => setKeyD(e.target.value)} />
            </div>
            <div className="key-answer">
              <h2>Đáp án</h2>
              <Form>
                <Input
                  data={key}
                  onChange={(e) => setKey(e.target.value)}
                  width={20}
                />
              </Form>
            </div>
          </form>
        )}
        {questionCategory === "Tự luận" && (
          <CKEditor
            editor={ClassicEditor}
            data={keyAnswer}
            onChange={(event, editor) => {
              const data = editor.getData();
              setKeyAnswer(data);
            }}
          />
        )}
      </div>

      <div className="questionSubject">
        <h2>Môn học</h2>
        <Form>
          <Input
            data={questionSubject}
            onChange={(e) => setQuestionSubject(e.target.value)}
            width={20}
          />
        </Form>
      </div>
      <div className="questionCategory">
        <h2>Thể loại</h2>
        <form>
          <select
            id="subjectSelect"
            onChange={(e) => setQuestionCategory(e.target.value)}
          >
            <option value="Trắc nghiệm" selected="selected">
              Trắc nghiệm
            </option>
            <option value="Tự luận">Tự luận</option>
          </select>
        </form>
      </div>
      <div className="questionLevel">
        <h2>Mức độ</h2>
        <form>
          <select
            id="subjectSelect"
            onChange={(e) => setQuestionLevel(e.target.value)}
          >
            <option value="Thông hiểu" selected="selected">
              Thông hiểu
            </option>
            <option value="Vận dụng">Vận dụng</option>
            <option value="Vận dụng cao">Vận dụng cao</option>
          </select>
        </form>
      </div>
      <div className="addQuestionButton">
        <button type="primary" onClick={handleOnclickAddQuestion}>
          Thêm câu hỏi
        </button>
      </div>
      <div className="errorMessage">{errorMessage}</div>
    </div>
  );
};
