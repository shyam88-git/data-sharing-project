import { Navigate } from "react-router-dom";
import { IBucketKeyEnums, bucket } from "../utils/helpers/storage";
import MainLayout from "./MainLayout";

interface verifyAuthProps {
  children: React.ReactNode;
}

const VerifyAuthLayout = ({ children }: verifyAuthProps) => {
  const hasToken =
    bucket.get(IBucketKeyEnums.TOKEN) && bucket.get(IBucketKeyEnums.ID);
  if (hasToken) return <Navigate to="/map" />;
  return <MainLayout>{children}</MainLayout>;
};

export default VerifyAuthLayout;
