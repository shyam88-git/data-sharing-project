import { IconType } from "react-icons";

interface PropsI {
  icon: IconType;
  title: string;
  children: React.ReactNode;
}

const ContentCard = ({ icon: Icon, title, children }: PropsI) => {
  return (
    <div className="h-[206px] w-[354px] ">
      <div className="flex gap-3 items-center justify-start mb-2">
        <Icon size={40} className="text-primary-blue-300" />
        <p className="text-xl leading-3xl">{title}</p>
      </div>
      <p className="text-base font-medium leading-[22px] text-justify">
        {children}
      </p>
    </div>
  );
};

export default ContentCard;
