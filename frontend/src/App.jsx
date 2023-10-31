import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import FormBuilder from "./component/FormBuilder";
import FormForUser from "./component/FormForUser/FormForUser";
import FormList from "./component/FormList/FormList";
const router = createBrowserRouter([
  {
    path: "/admin",
    element: <FormBuilder />,
  },
  {
    path: "/form/:id",
    element: <FormForUser />,
  },
  {
    path: "/formList",
    element: <FormList />,
  },
]);


function App() {
  return (  
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;