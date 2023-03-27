import React from "react";
import "../../css/question-management.css";
import {
  CloudUploadOutlined,
  EditOutlined,
  EyeOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { Button, Input, Table } from "antd";

const { Search } = Input;
const onSearch = (value) => console.log(value);

const QuestionManagementComponent = () => {
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
        <div style={{ display: "flex", gap: 10 }}>
          <EyeOutlined />
          <EditOutlined />
          <DeleteOutlined />
        </div>
      ),
    },
  ];
  const data = [
    {
      questionId: "1",
      question: "Giá trị biểu thức nào dưới đây bằng 0,0000000375?",
      subject: "Toán",
      category: "Trắc nghiệm",
      level: "Thông hiểu",
    },
    {
      questionId: "2",
      question: "What does he ________ for a living?",
      subject: "Tiếng Anh",
      category: "Trắc nghiệm",
      level: "Vận dụng",
    },
    {
      questionId: "3",
      question: `Ai là "Nhân vật thể thao của năm" của BBC năm 2001?`,
      subject: "Thể chất",
      category: "Tự luận",
      level: "Vận dụng cao",
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
            <Button icon={<EditOutlined />}>Nhập câu hỏi</Button>
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
        <Table columns={columns} dataSource={data} onChange={onChange} />
      </div>
    </div>
  );
};

export default QuestionManagementComponent;
