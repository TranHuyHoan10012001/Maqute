/* eslint-disable array-callback-return */
import React, { useEffect, useState } from "react";
import "../../../../css/question-management.css";
import {
  CloudUploadOutlined,
  EditOutlined,
  EyeOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { Button, Input, Table } from "antd";
import { useNavigate } from "react-router-dom";
import { handleQuestionListApi } from "../../../../services/questionService";

const { Search } = Input;
const onSearch = (value) => console.log(value);

const QuestionManagementComponent = () => {
  const [listQuestionsData, setListQuestionsData] = useState();
  const navigate = useNavigate();
  const handleOnclickViewQuestion = () => {
    navigate("/question-management/detail");
  };
  const handleOnClickTypeQuestion = () => {
    navigate("/question-management/type-question");
  };
  const getAllQuestion = async () => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    let allQuestionsData = await handleQuestionListApi();
    setListQuestionsData(allQuestionsData);
  };
  const dataRow = [];

  useEffect(() => {
    getAllQuestion();
  }, []);
  listQuestionsData?.questions.forEach((question) => {
    let questionContent = question.content.replace(/<[^>]+>/g, "");
    dataRow.push({
      questionId: question.id,
      question: questionContent,
      subject: question.subject,
      category: question.category,
      level: question.level,
    });
  });

  console.log("dataRow: ", dataRow);
  const columns = [
    {
      title: "STT",
      dataIndex: "questionId",
    },
    {
      title: "Câu hỏi",
      dataIndex: "question",
      width: "30%",
    },
    {
      title: "Chủ đề",
      dataIndex: "subject",
      filters: [
        {
          text: "Thể chất",
          value: "Thể chất",
        },
        {
          text: "Tiếng Anh",
          value: "Tiếng Anh",
        },
        {
          text: "Toán học",
          value: "Toán học",
        },
      ],
      filterSearch: true,
      onFilter: (value, record) => record.subject.startsWith(value),
    },
    {
      title: "Thể loại",
      dataIndex: "category",
      filters: [
        {
          text: "Tự luận",
          value: "Tự luận",
        },
        {
          text: "Trắc nghiệm",
          value: "Trắc nghiệm",
        },
      ],
      filterSearch: true,
      onFilter: (value, record) => record.category.startsWith(value),
    },
    {
      title: "Mức độ",
      dataIndex: "level",
      filters: [
        {
          text: "Thông hiểu",
          value: "Thông hiểu",
        },
        {
          text: "Vận dụng",
          value: "Vận dụng",
        },
        {
          text: "Vận dụng cao",
          value: "Vận dụng cao",
        },
      ],
      onFilter: (value, record) => record.level.startsWith(value),
      filterSearch: true,
    },
    {
      title: "Action",
      dataIndex: "",
      key: "action",
      render: () => (
        <div style={{ display: "flex", gap: 20 }}>
          <EyeOutlined onClick={handleOnclickViewQuestion} />
          <DeleteOutlined />
        </div>
      ),
    },
  ];

  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };
  return (
    <div className="questionContainer">
      <div className="uploadAndSearch">
        <div className="leftPath">
          <div className="upload">
            <Button icon={<CloudUploadOutlined />}>Tải file lên</Button>
          </div>
          <div className="writeQuestion">
            <Button icon={<EditOutlined />} onClick={handleOnClickTypeQuestion}>
              Nhập câu hỏi
            </Button>
          </div>
        </div>
        <div className="rightPath">
          <div className="search">
            <Search
              placeholder="Tìm kiếm câu hỏi"
              onSearch={onSearch}
              style={{
                width: 200,
              }}
            />
          </div>
        </div>
      </div>
      <div className="listQuestion">
        <Table columns={columns} dataSource={dataRow} onChange={onChange} />
      </div>
    </div>
  );
};

export default QuestionManagementComponent;
