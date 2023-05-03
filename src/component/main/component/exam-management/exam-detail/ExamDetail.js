/* eslint-disable react-hooks/exhaustive-deps */
import {
  CloudDownloadOutlined,
  EditOutlined,
  CommentOutlined,
} from "@ant-design/icons";
import { Button, Input, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../../../../../css/exam-detail.css";
import { handleGetExamByIdApi } from "../../../../../services/examService";
import { jsPDF } from "jspdf";
export const ExamDetail = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const getExam = async (examId) => {
    let examData = await handleGetExamByIdApi(examId);
    setExamByIdData(examData);
  };
  const createPDF = async () => {
    const pdf = new jsPDF("portrait", "pt", "a4");
    const data = await document.querySelector("#pdf-container");
    pdf.html(data).then(() => {
      pdf.save(`De_thi_so_${id}.pdf`);
    });
  };
  useEffect(() => {
    getExam(id);
  }, []);

  const listQuestions = examByIdData?.exam;
  console.log("listQuestions: ", listQuestions);
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
      <div
        className="exam-detail"
        id="pdf-container"
        style={{
          fontFamily:
            "-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji",
        }}
      >
        <header className="headerContainer">
          <h2>
            .....................................................................
          </h2>
          <h2>Đề thi số {id}</h2>
          <h2>Môn học: {listQuestions?.subject}</h2>
          <h3>Thời gian: {listQuestions?.timeLimit} phút</h3>
        </header>
        <main className="mainExamContainer">
          <h4>
            Câu 1: Khái niệm " Tư tưởng Hồ Chí Minh" mà đại hội IX nêu lên bao
            gồm
          </h4>
          <span>A. Bản chất cách mạng, khoa học của Tư tưởng Hồ Chí Minh</span>{" "}
          <br />
          <span>
            B. Nguồn gốc tư tưởng, lý luận của Tư tưởng Hồ Chí Minh
          </span>{" "}
          <br />
          <span>C. Nội dung tư tưởng Hồ Chí Minh</span> <br />
          <span>D. Kết cấu tư tưởng Hồ Chí Minh</span> <br />
          <h4>
            Câu 2: Có mấy nguyên tắc phương pháp luận khi nghiên cứu tư tưởng Hồ
            Chí Minh?
          </h4>
          <span>A. 4 nguyên tắc</span> <br />
          <span>B. 5 nguyên tắc</span> <br />
          <span>C. 6 nguyên tắc</span> <br />
          <span>D. 7 nguyên tắc</span> <br />
          <h4>
            Câu 3: Tư tưởng Hồ Chí Minh có vị trí như thế nào trong hệ thống tư
            tưởng của Đảng cộng Sản Việt Nam?
          </h4>
          <span>A. Là một bộ phận tỏng hệ thống tư tưởng của Đảng</span> <br />
          <span>
            B. Là bộ phận quan trọng trong hệ thống tư tưởng của Đảng
          </span>{" "}
          <br />
          <span>
            C. Là bộ phận rất quan trọng trong hệ thống tư tưởng của Đảng
          </span>{" "}
          <br />
          <span>
            D. Là bộ phận nền tảng, kim chỉ nam cho hành động của Đảng
          </span>{" "}
          <br />
          <h4>
            Câu 4: Thời kỳ Bác Hồ xác định con đường cứu nước được tính từ?
          </h4>
          <span>A. Trước năm 1911</span> <br />
          <span>B. Từ 1911 - 1920</span> <br />
          <span>C. Từ 1911 - 1930</span> <br />
          <span>D. Từ 1920 - 1941</span> <br />
        </main>
      </div>
    </div>
  );
};
