/* eslint-disable no-unused-vars */
/* eslint-disable array-callback-return */
import React, { useContext, useEffect, useState } from "react";
import "../../../../css/question-management.css";
import {
  CloudUploadOutlined,
  EditOutlined,
  EyeOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { Button, Input, Popconfirm, Table } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import {
  handleDeleteQuestionApi,
  handleQuestionListApi,
} from "../../../../services/questionService";
import { Context } from "../../../../context";
import { handleKeyListApi } from "../../../../services/keyService";

const { Search } = Input;
const onSearch = (value) => console.log(value);

const QuestionManagementComponent = () => {
  const context = useContext(Context);
  const { id } = useParams();

  const [listQuestionsData, setListQuestionsData] = useState();
  const navigate = useNavigate();
  const handleOnclickViewQuestion = (questionId) => {
    navigate(`/question-management/detail/${questionId}`);
  };
  const handleOnClickTypeQuestion = () => {
    navigate("/question-management/type-question");
  };
  const dataRow = [];

  const getAllQuestion = async () => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    let allQuestionsData = await handleQuestionListApi();
    context.setQuestionsList(allQuestionsData);

    setListQuestionsData(allQuestionsData);
  };
  const getAllKey = async () => {
    let allKeyData = await handleKeyListApi();
    context.setKey(allKeyData);
  };
  const handleDeleteQuestion = async (questionId) => {
    try {
      let res = await handleDeleteQuestionApi(questionId);
      if (res && res.errCode === 0) {
        await getAllQuestion();
        alert("Xóa câu hỏi thành công");
      } else alert(res.errMessage);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllQuestion();
    getAllKey();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      render: (row) => (
        <div className="action">
          <EyeOutlined
            onClick={(e) => handleOnclickViewQuestion(row.questionId)}
          />
          <Popconfirm
            title="Bạn có muốn xóa câu hỏi này không?"
            onConfirm={(e) => handleDeleteQuestion(row.questionId)}
            onCancel={(e) => console.log("No")}
            okText="Đồng ý"
            cancelText="Không đồng ý"
            className="pop-confirm"
          >
            <DeleteOutlined />
          </Popconfirm>
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
