/* eslint-disable jsx-a11y/anchor-is-valid */
import {
  Form,
  InputNumber,
  Popconfirm,
  Table,
  Typography,
  Input,
  Button,
} from "antd";
import "../../../../../css/question-detail.css";
import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { handleGetQuestionByIdApi } from "../../../../../services/questionService";
import { useEffect } from "react";
import { Context } from "../../../../../context";

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};
const QuestionDetail = () => {
  const { id } = useParams();
  const [questionDetailData, setQuestionDetailData] = useState();
  const [form] = Form.useForm();
  const [data, setData] = useState();
  const [editingKey, setEditingKey] = useState("");
  const isEditing = (record) => record.key === editingKey;
  const navigate = useNavigate();
  const [loading, setLoading] = useState();
  let dataRow = [];
  const context = useContext(Context);
  const keyAnswer = context.key;
  console.log("keyAnswer: ", keyAnswer);

  const edit = (record) => {
    form.setFieldsValue({
      name: "",

      ...record,
    });
    setEditingKey(record.key);
  };
  const cancel = () => {
    setEditingKey("");
  };
  const getQuestionById = async (questionId) => {
    setLoading(true);
    let questionData = await handleGetQuestionByIdApi(questionId);
    setQuestionDetailData(questionData?.question);
    setLoading(false);
  };
  const handleOnclickDone = () => {
    navigate("/question-management");
  };
  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...dataRow];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        dataRow = newData;
        setEditingKey("");
      } else {
        newData.push(row);
        dataRow = newData;
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };
  const columns = [
    {
      title: "name",
      dataIndex: "name",
      editable: true,
      width: "80%",
    },

    {
      title: "operation",
      dataIndex: "operation",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.key)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link
            disabled={editingKey !== ""}
            onClick={() => edit(record)}
          >
            Chỉnh sửa
          </Typography.Link>
        );
      },
    },
  ];
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === "age" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  if (!loading) {
    let questionContent = questionDetailData?.content?.replace(/<[^>]+>/g, "");

    console.log(questionContent);
    dataRow.push(
      {
        key: "question",
        name: questionContent,
      },
      {
        key: "answer1",
        name: "A. 1",
      },
      {
        key: "answer2",
        name: "B. 1",
      },
      {
        key: "answer3",
        name: "C. 1",
      },
      {
        key: "answer4",
        name: "D. 1",
      }
    );
  }

  useEffect(() => {
    getQuestionById(id);
  }, []);

  return (
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={dataRow}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={false}
        showHeader={false}
        loading={loading}
      />
      <Button
        type="primary"
        className="button-done"
        onClick={handleOnclickDone}
      >
        Hoàn thành
      </Button>
    </Form>
  );
};
export default QuestionDetail;
