import React from 'react';
import './FromList.css'
import { useGetFormListQuery } from '../../slices/userApiSlice';
import { Link,useNavigate } from 'react-router-dom';


function FormList() {
const { data, error, isLoading, refetch } = useGetFormListQuery({});
const navigate = useNavigate()
const  navigateTo = (id)=>{
    navigate(`/form/${id}`)
}
if(isLoading){
    return(
        <h1>Loading..........</h1>
    )
}

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Forms</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item._id}>
              <td onClick={()=>navigateTo(item._id)}>{item.title}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FormList;
