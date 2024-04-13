import { useAppDispatch } from "../store/store";
import { useVerifyTokenMutation } from "../store/features/auth/authApi";
import { RouterProvider } from "react-router-dom";
import router from "../routes/router";

const App = () => {
  const pathname = window.location.pathname;
  const dispatch = useAppDispatch();
  const [verifyToken] = useVerifyTokenMutation();

  return <RouterProvider router={router} />;
};

export default App;
