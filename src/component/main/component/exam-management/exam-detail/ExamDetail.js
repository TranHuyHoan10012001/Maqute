/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../../../../../css/exam-detail.css";
import { handleGetExamByIdApi } from "../../../../../services/examService";
export const ExamDetail = () => {
  const { id } = useParams();
  const [examByIdData, setExamByIdData] = useState();

  const getExam = async (examId) => {
    let examData = await handleGetExamByIdApi(examId);
    setExamByIdData(examData);
  };
  useEffect(() => {
    getExam(id);
  }, []);

  const listQuestions = examByIdData?.exam;
  console.log("listQuestions: ", listQuestions);
  return (
    <div>
      <header className="headerContainer">
        <h2>
          .....................................................................
        </h2>
        <h2>Đề thi số {id}</h2>
        <h2>Môn học: {listQuestions.subject}</h2>
        <h3>Thời gian: {listQuestions.timeLimit} phút</h3>
      </header>
      <main className="mainExamContainer">
        <h4>
          Câu 1: Khái niệm " Tư tưởng Hồ Chí Minh" mà đại hội IX nêu lên bao gồm
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
        <h4>Câu 4: Thời kỳ Bác Hồ xác định con đường cứu nước được tính từ?</h4>
        <span>A. Trước năm 1911</span> <br />
        <span>B. Từ 1911 - 1920</span> <br />
        <span>C. Từ 1911 - 1930</span> <br />
        <span>D. Từ 1920 - 1941</span> <br />
      </main>
    </div>
  );
};
