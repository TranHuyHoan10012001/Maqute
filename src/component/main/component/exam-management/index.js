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
import { useContext } from "react";
import { Context } from "../../../../context";
import ExamUploadFile from "./exam-upload";
import ExamCreate from "./exam-add";

const { Search } = Input;
const onSearch = (value) => console.log(value);
const ExamManagementComponent = () => {
  const context = useContext(Context);
  console.log("context.questionsList: ", context.questionsList);
  const [isOpen, toggleModal] = useState(false); //modal upload file exam
  const [isOpenCreateExamModal, setIsOpenCreateExamModal] = useState(false);

  const [listExams, setListExams] = useState();
  const navigate = useNavigate();

  const handleOnClickExamDetail = (examId) => {
    navigate(`/exam-management/exam-detail/${examId}`);
  };
  const handleGetAllExam = async () => {
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
          text: "Tư tưởng Hồ Chí Minh",
          value: "Tư tưởng Hồ Chí Minh",
        },
        {
          text: "Nguyên lý hệ điều hành",
          value: "Nguyên lý hệ điều hành",
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
            <Button
              icon={<EditOutlined />}
              onClick={() => setIsOpenCreateExamModal(true)}
            >
              Tạo đề thi
            </Button>
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
          onRefreshList={async () => {
            let allExamsData = await handleGetAllExamApi();
            setListExams(allExamsData);
          }}
        />
      )}
      {isOpenCreateExamModal && (
        <ExamCreate
          title={<h2 className="mb-[32px] underline">Tạo đề thi</h2>}
          open={isOpenCreateExamModal}
          rootClassName="modal-create-exam"
          onCancel={() => {
            setIsOpenCreateExamModal(false);
          }}
          getContainer={false}
          isEdit={false}
          okText="Tạo đề thi"
          cancelText="Hủy bỏ"
          onRefreshList={async () => {
            let allExamsData = await handleGetAllExamApi();
            setListExams(allExamsData);
          }}
        />
      )}
    </div>
  );
};

export default ExamManagementComponent;
