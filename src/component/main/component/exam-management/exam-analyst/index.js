import React from "react";
import "../../../../../css/exam-analyst.css";
import { Button, Input } from "antd";
export const ExamAnalyst = () => {
  return (
    <div className="containerExamAnalyst">
      <div className="headerExamAnalyst">
        <h1>Đánh giá đề thi</h1>
      </div>
      <div className="exam">
        <h2>Đề thi số 1</h2>
      </div>
      <div className="mainExamAnalyst">
        <div className="high-grade">
          <h3>Phần trăm điểm cao: </h3>
          <input type="number" />
        </div>
        <div className="common-grade">
          <h3>Phần trăm điểm trung bình: </h3>
          <input type="number" />
        </div>
        <div className="low-grade">
          <h3>Phần trăm điểm yếu: </h3>
          <input type="number" />
        </div>
        <div className="comment">
          <h3>Đánh giá </h3>
          <Input.TextArea style={{ minHeight: "100px" }} />
        </div>
        <div className="add-comment">
          <Button type="primary">Thêm nhận xét</Button>
        </div>
      </div>
    </div>
  );
};
