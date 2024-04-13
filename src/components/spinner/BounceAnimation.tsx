import "./BounceAnimation.css";

const BounceAnimation = () => {
  return (
    <div className="w-full h-full flex items-center justify-center space-x-2 my-8 animate-pulse  bg-transparent">
      <div className="w-4 h-4 bg-blue-400 rounded-full bounce-animation"></div>
      <div className="w-4 h-4 bg-green-400 rounded-full bounce-animation"></div>
      <div className="w-4 h-4 bg-red-400 rounded-full bounce-animation"></div>
    </div>
  );
};

export default BounceAnimation;
