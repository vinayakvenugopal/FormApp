import React, { useState } from 'react';
import './FormForUser.css';
import { useGetFormSchemaQuery } from '../../slices/userApiSlice';

function FormForUser() {
  const [formDatas, setFormDatas] = useState(null);
  const [formValues, setFormValues] = useState({});

  const id = location.pathname.split("/")[2];
  console.log(id);

  const { data, error, isLoading, refetch } = useGetFormSchemaQuery({id:id});

  if (isLoading) {
    return <h1>Loading</h1>;
  }

  const formData = data;

  if (!formData) {
    return <h1>No forms Available</h1>;
  }

  const formElements = formData.data.map((field) => {
    const handleFieldChange = (event) => {
      const { id, value, type, checked } = event.target;
      const fieldValue = type === 'checkbox' ? checked : value;

      setFormValues((prevFormValues) => ({
        ...prevFormValues,
        [id]: fieldValue,
      }));
    };

    return (
      <div key={field.id} className="form-field">
        <label htmlFor={field.id}>
          {field.value}
          {field.required && <span className="required-field" style={{color:'red'}}>*</span>}
        </label>
        {field.type === 'radio' ? (
          <div className="radio-group">
            {field.options.map((option) => (
              <div key={option.id} className="radio-option">
                <input
                  type="radio"
                  id={option.id}
                  name={field.id}
                  value={option.value}
                  className="radio-input"
                  onChange={handleFieldChange}
                />
                <label htmlFor={option.id} className="radio-label">
                  {option.value}
                </label>
              </div>
            ))}
          </div>
        ) : field.type === 'number' ? (
          <input
            type="number"
            id={field.id}
            name={field.id}
            required={field.required}
            className="input-text"
            onChange={handleFieldChange}
          />
        ) : (
          <input
            type="text"
            id={field.id}
            name={field.id}
            required={field.required}
            className="input-text"
            onChange={handleFieldChange}
          />
        )}
      </div>
    );
  });

  return (
    <div className="form-container">
      <h2 className="form-title">{formData.title}</h2>
      <p className="form-description">{formData.description}</p>
      <form className="form">
        {formElements}
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
}

export default FormForUser;
