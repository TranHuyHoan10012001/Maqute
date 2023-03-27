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
const ExamManagementComponent = () => {
  const columns = [
    {
      title: "STT",
      dataIndex: "examId",
    },
    {
      title: "Đề thi",
      dataIndex: "exam",
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
      filterMode: "tree",
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
      filterMode: "tree",
      filterSearch: true,
      onFilter: (value, record) => record.category.startsWith(value),
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
      examId: "1",
      exam: "Đề số 1",
      subject: "Toán",
      category: "Trắc nghiệm",
    },
    {
      examId: "2",
      exam: "Đề số 2",
      subject: "Tiếng Anh",
      category: "Trắc nghiệm",
    },
    {
      examId: "3",
      exam: `Đề số 3`,
      subject: "Thể chất",
      category: "Tự luận",
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
            <Button icon={<EditOutlined />}>Tạo đề thi</Button>
          </div>
        </div>
        <div className="rightPath">
          <div className="search">
            <Search
              placeholder="Tìm kiếm đề thi"
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

export default ExamManagementComponent;
