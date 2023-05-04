/* eslint-disable jsx-a11y/anchor-is-valid */
import { EditOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../../../../css/question-detail.css";
import { handleGetKeyByIdApi } from "../../../../../services/keyService";
import { handleGetQuestionByIdApi } from "../../../../../services/questionService";
import { EditQuestion } from "../edit-question";

const QuestionDetail = () => {
  const { id } = useParams();
  const [questionDetailData, setQuestionDetailData] = useState();
  const [keyDetailData, setKeyDetailData] = useState();
  const navigate = useNavigate();
  const [loading, setLoading] = useState();
  const [key, setKey] = useState();
  const [isOpen, setIsOpen] = useState(false);

  const getQuestionById = async (questionId) => {
    setLoading(true);
    let questionData = await handleGetQuestionByIdApi(questionId);
    console.log("questionData; ", questionData);

    setQuestionDetailData(questionData?.question);
    setLoading(false);
  };
  const getKeyById = async (questionId) => {
    let keyData = await handleGetKeyByIdApi(questionId);
    setKeyDetailData(keyData);
  };
  const handleOnclickDone = () => {
    navigate("/question-management");
  };

  useEffect(() => {
    getQuestionById(id);
    getKeyById(id);
  }, []);

  useEffect(() => {
    if (keyDetailData) {
      let keys = keyDetailData?.keyAnswer?.keyAnswer;
      let answer = keys.split("|");
      setKey(answer);
      console.log("answer: ", answer);
    }
  }, [keyDetailData]);
  return (
    <div className="container-add-question">
      <div className="edit-question">
        <Button icon={<EditOutlined />} onClick={() => setIsOpen(true)}>
          Chỉnh sửa câu hỏi
        </Button>
      </div>
      <div className="question-detail">
        <h4>
          {!loading &&
            `Câu ${id}: ${questionDetailData?.content.replace(/<[^>]+>/g, "")}`}
        </h4>
        {questionDetailData?.category === "Trắc nghiệm" && (
          <>
            <span>{key && key[0].replace(/<[^>]+>/g, "")}</span> <br />
            <span>{key && key[1].replace(/<[^>]+>/g, "")}</span>
            <br />
            <span>{key && key[2].replace(/<[^>]+>/g, "")}</span>
            <br />
            <span>{key && key[3].replace(/<[^>]+>/g, "")}</span>
            <br />
          </>
        )}
      </div>
      {isOpen && (
        <EditQuestion
          questionId={id}
          title={<h2 className="mb-[32px] underline">Chỉnh sửa câu hỏi</h2>}
          open={isOpen}
          rootClassName="modal-edit-question"
          onCancel={() => {
            setIsOpen(false);
          }}
          getContainer={false}
          isEdit={false}
          okText="Hoàn thành"
          cancelText="Hủy bỏ"
          onRefreshList={async () => {
            let questionData = await handleGetQuestionByIdApi(id);
            setQuestionDetailData(questionData?.question);
            let keyData = await handleGetKeyByIdApi(id);
            setKeyDetailData(keyData);
          }}
        />
      )}
    </div>
  );
};
export default QuestionDetail;
