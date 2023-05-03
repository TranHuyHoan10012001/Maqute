import React from "react";
import "../../../../css/question-management.css";
import { handleGetAllExamApi } from "../../../../services/examService";
import {
  CloudUploadOutlined,
  EditOutlined,
  EyeOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { Button, Input, Popconfirm, Table } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import ExamUploadFile from "./exam-upload";

const { Search } = Input;
const onSearch = (value) => console.log(value);
const ExamManagementComponent = () => {
  const [isOpen, toggleModal] = useState(false); //modal upload file exam
  const { id } = useParams();
  console.log("id: ", id);
  const [listExams, setListExams] = useState();
  const navigate = useNavigate();

  const handleOnClickExamDetail = (examId) => {
    navigate(`/exam-detail/${examId}`);
  };
  const handleGetAllExam = async () => {
    console.log('hello');
    let allExamsData = await handleGetAllExamApi();
    setListExams(allExamsData);
  };

  const dataRow = [];
  useEffect(() => {
    handleGetAllExam();
  }, []);
  listExams?.listExam.forEach((exam) => {
    dataRow.push({
      examId: exam.id,
      exam: `Đề số ${exam.id}`,
      subject: exam.subject,
      category: exam.category,
    });
  });

  console.log("listExams: ", dataRow);

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
      render: (row) => (
        <div style={{ display: "flex", gap: 20 }}>
          <EyeOutlined onClick={(e) => handleOnClickExamDetail(row.examId)} />
          <Popconfirm
            title="Xóa đề thi"
            description="Bạn có muốn xóa đề thi này không?"
            onConfirm={(e) => console.log("Ok")}
            onCancel={(e) => console.log("No")}
            okText="Đồng ý"
            cancelText="Không đồng ý"
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
            <Button
              onClick={() => toggleModal(true)}
              icon={<CloudUploadOutlined />}
            >
              Tải file lên
            </Button>
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
        <Table columns={columns} dataSource={dataRow} onChange={onChange} />
      </div>
      {isOpen && (
        <ExamUploadFile
          title={<h2 className="mb-[32px] underline">Tải lên đề thi</h2>}
          open={isOpen}
          rootClassName="modal-upload-file-exam"
          onCancel={() => {
            toggleModal(false);
          }}
          getContainer={false}
          isEdit={false}
          okText="Tạo đề thi"
          cancelText="Hủy bỏ"
          onRefreshList={ async ()=> {
            let allExamsData = await handleGetAllExamApi();
            setListExams(allExamsData);
          }}
        />
      )}
    </div>
  );
};

export default ExamManagementComponent;
