import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { IBucketKeyEnums, bucket } from "../utils/helpers/storage";
import useToastHook from "../utils/hooks/toast/useToastHook";
interface IProps {
  children: ReactNode;
}

export const ProtectedLayout = ({ children }: IProps) => {
  const { showToast } = useToastHook();
  const token = bucket.get(IBucketKeyEnums.TOKEN);

  if (token) return <>{children} </>;
  else {
    showToast("Please Login!", { type: "warning" });
    return <Navigate to="/home" />;
  }
};
