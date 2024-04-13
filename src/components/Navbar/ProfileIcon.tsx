interface PropsI {
  name: string;

  onClick?: () => void;
  otherStyles?: string;
}

const ProfileIcon = ({ name, onClick, otherStyles }: PropsI) => {
  return (
    <div
      onClick={onClick}
      className={`bg-slate-100 text-black h-10 w-10 rounded-full overflow-hidden cursor-pointer flex items-center justify-center border border-solid border-primary-blue-380 ${otherStyles}`}
    >
      <span className="text-2xl font-bold capitalize">{name}</span>
    </div>
  );
};

export default ProfileIcon;
