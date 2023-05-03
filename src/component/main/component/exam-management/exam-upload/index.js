import React from "react";

import { UploadOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Modal, Row, Select, Upload } from "antd";
import { useState } from "react";
import axios from "axios";

export default function ExamUploadFile(props) {
  const [fileList, setFileList] = useState([]);
  const [form] = Form.useForm();
  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    console.log("fileList: ", newFileList);
  };

  return (
    <Modal
      {...props}
      okButtonProps={{ htmlType: "submit", form: "form_upload_exam_file" }}
    >
      <Form
        name="form_upload_exam_file"
        form={form}
        layout="vertical"
        onFinish={async (data) => {
          console.log("data", data);
          // ---
          //create exam api
          if (fileList && fileList[0]) {
            const formData = new FormData();
            formData.append("file", fileList[0]);
            formData.append("subject", data?.subject);
            formData.append("category", data?.category);
            formData.append("question", "");
            formData.append("timeLimit", 90);
            formData.append("maxScore", 10);

            await axios
              .post("http://localhost:8080/api/create-exam", formData)
              .then((response) => {
                props.onCancel();
                props.onRefreshList();
              })
              .catch((error) => {
                console.error(error);
              });
          }
          //----

          // on finish: callback props.onRefreshList()
        }}
      >
        <Row gutter={[24, 0]}>
          <Col span={24}>
            <Form.Item
              label={<div>Tên đề thi</div>}
              name={"exam_name"}
              rules={[{ required: true, message: "Vui lòng điền tên đề thi!" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label={<div>Chủ đề</div>}
              name={"subject"}
              rules={[{ required: true, message: "Vui lòng chọn chủ đề!" }]}
            >
              <Select>
                <Select.Option value="Tư tưởng Hồ Chí Minh">
                  Tư tưởng Hồ Chí Minh
                </Select.Option>
                <Select.Option value="Nguyên lý Hệ điều hành">
                  Nguyên lý Hệ điều hành
                </Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label={<div>Thể loại</div>}
              name={"category"}
              rules={[{ required: true, message: "Vui lòng chọn thể loại!" }]}
            >
              <Select>
                <Select.Option value="Tự luận">Tự luận</Select.Option>
                <Select.Option value="Trắc nghiệm">Trắc nghiệm</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              rules={[
                { required: true, message: "Vui lòng tải lên file đề thi!" },
              ]}
              label={<div className="capitalize">File đề thi</div>}
              name={"file"}
            >
              <Upload
                customRequest={() => {}}
                fileList={fileList}
                onChange={onChange}
                maxCount={1}
                showUploadList={false}
              >
                <>
                  <div className="flex justify-center items-center gap-[12px]">
                    <Button icon={<UploadOutlined />}>Click to upload</Button>{" "}
                  </div>
                  {fileList && fileList[0] && <div>{fileList[0]?.name}</div>}
                </>
              </Upload>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}
