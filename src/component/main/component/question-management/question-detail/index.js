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
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const originData = [
  {
    key: "question",
    name: "Giá trị biểu thức nào dưới đây bằng 0,0000000375?",
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
  },
];
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
  const [form] = Form.useForm();
  const [data, setData] = useState(originData);
  const [editingKey, setEditingKey] = useState("");
  const isEditing = (record) => record.key === editingKey;
  const navigate = useNavigate();
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
  const handleOnclickDone = () => {
    navigate("/question-management");
  };
  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setData(newData);
        setEditingKey("");
      } else {
        newData.push(row);
        setData(newData);
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
  return (
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={data}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={false}
        showHeader={false}
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
