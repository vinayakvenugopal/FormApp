import { useState } from "react";
import uuid from "react-uuid";
import Nestable from "react-nestable";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import {toast} from 'react-toastify'
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import {
  TextFieldInput,
  TextArea,
  NumberInput,
  RadioInput,
} from "./elements";
import Layout from './elements/layout'
import { formEl } from "./constants.js";
import Header from "./Header";
import { useAddFormSchemaMutation } from "../../slices/adminApiSlice";
import "react-toastify/dist/ReactToastify.css";

const FormBuilder = () => {
  const initVal = formEl[0]?.value;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState("text");
  const items = data;
  const [addFormSchema] = useAddFormSchemaMutation()

  const formDataToSend = {
    title,
    description,
    data,
  };

  const submitHandler = async()=>{
    try {
    const response = await addFormSchema(formDataToSend)
    setTitle("")
    setDescription("")
    setData([])
    toast.success('Submitted')
  } catch (error) {
      
  }
  }




  const addElement = () => {
    const data = {
      id: uuid(),
      value: null,
      type: formData,
      required: false,
    };
    setData((prevState) => [...prevState, data]);
    setFormData(initVal);
  };

  const deleteEl = (id) => {
    setData((prevState) => prevState.filter((val) => val.id !== id));
  };

  const addAfter = (elArray, index, newEl) => {
    return [...elArray.slice(0, index+1), newEl, ...elArray.slice(index+1)];
  };

  const duplicateElement = (elId, elType) => {
    let elIdx = data.findIndex( (el) =>el.id === elId);
    let newEl = {
      id: uuid(),
      value: null,
      type: elType,
      required: false,
    }
    let newArr = addAfter(data,elIdx,newEl)
    setData(newArr)
  };

  const handleOnChangeSort = ({ items }) => {
    setData(items);
  };

  const handleValue = (id, e) => {
    let newArr = data.map((el) => {
      if (el.id == id) {
        return { ...el, value: e.target.value };
      } else {
        return el;
      }
    });
    setData(newArr);
  };

  const handleRequired = (id) => {
    let newArr = data.map((el) => {
      if (el.id == id) {
        return { ...el, required: !el.required };
      } else {
        return el;
      }
    });
    setData(newArr);
  };

  const handleElType = (id, type) => {
    let newArr = data.map((el) => {
      if (el.id == id) {
        return { ...el, type: type };
      } else {
        return el;
      }
    });
    setData(newArr);
  };

  const addOption = (id, newOption) => {
    let newArr = data.map((el) => {
      if (el.id == id) {
        const objVal = "options" in el ? el?.options : [];
        return { ...el, options: [...objVal, newOption] };
      } else {
        return el;
      }
    });
    setData(newArr);
  };



  const handleOptionValues = (elId, optionId, optionVal) => {
    let newArr = data.map((el) => {
      if (el.id == elId) {
        el?.options &&
          el?.options.map((opt) => {
            if (opt.id == optionId) {
              opt.value = optionVal;
            }
          });
        return el;
      } else {
        return el;
      }
    });
    setData(newArr);
  };

  const deleteOption = (elId, optionId) => {
    let newArr = data.map((el) => {
      if (el.id == elId) {
        let newOptions =
          el?.options && el?.options.filter((opt) => opt.id != optionId);
        return { ...el, options: newOptions };
      } else {
        return el;
      }
    });
    setData(newArr);
  };

  const renderElements = ({ item }) => {
    switch (item.type) {
      case "text":
        return (
          <TextFieldInput
            item={item}
            handleValue={handleValue}
            deleteEl={deleteEl}
            handleRequired={handleRequired}
            handleElType={handleElType}
            duplicateElement={duplicateElement}
          />
        );
      case "textarea":
        return (
          <TextArea
            item={item}
            handleValue={handleValue}
            deleteEl={deleteEl}
            handleRequired={handleRequired}
            handleElType={handleElType}
            duplicateElement={duplicateElement}
          />
        );
      case "number":
        return (
          <NumberInput
            item={item}
            handleValue={handleValue}
            deleteEl={deleteEl}
            handleRequired={handleRequired}
            handleElType={handleElType}
            duplicateElement={duplicateElement}
          />
        );
      case "radio":
        return (
          <RadioInput
            item={item}
            handleValue={handleValue}
            deleteEl={deleteEl}
            handleRequired={handleRequired}
            handleElType={handleElType}
            addOption={addOption}
            handleOptionValues={handleOptionValues}
            deleteOption={deleteOption}
            duplicateElement={duplicateElement}
          />
        );
      default:
        return <></>;
    }
  };

  console.log(data);

  return (
    <>
      <Grid container spacing={1} direction="row" justifyContent="center">
        <Grid item md={6}>
          <Header
            title={title}
            setTitle={setTitle}
            description={description}
            setDescription={setDescription}
          />
          <Nestable
            items={items}
            renderItem={renderElements}
            maxDepth={1}
            onChange={handleOnChangeSort}
          />
        </Grid>
        <Grid item md={1}>
          <Tooltip title="Add Element" aria-label="add-element">
            <IconButton
              aria-label="add-element"
              onClick={addElement}
              sx={{ position: "sticky", top: 30 }}
            >
              <AddCircleOutlineOutlinedIcon color="secondary" />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
      <button style={{marginLeft:"40%"}} onClick={()=>submitHandler()}>Submit</button>
    </>
  );
};
export default FormBuilder;
