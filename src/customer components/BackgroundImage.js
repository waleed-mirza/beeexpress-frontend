import BackgroundImage from "../foodimages/backgroundowner.jpg";
import BackgroundImage2 from "../foodimages/bg-decor.jpg";

export const FoodBg = () => {
  return (
    <div className="app-background">
      <img src={BackgroundImage} alt="" loading="lazy" />
    </div>
  );
};

export const EventBg = () => {
  const prebg = document.querySelector(".app-background");
  if (prebg) prebg.style.display = "none";
  return (
    <div className="app-background2">
      <img src={BackgroundImage2} alt="" loading="lazy" />
    </div>
  );
};
