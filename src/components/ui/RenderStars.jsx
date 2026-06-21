import classNames from "classnames";

// asset
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";

export default function RenderStars({rating, width}){
  return Array.from({ length: 5 }).map((_, index) => (
    <FontAwesomeIcon
      key={index}
      icon={solidStar}
      className={classNames(
        {'text-xs': width === "small"},
        {'text-(--text-star)': index < Math.round(rating) },
        {'text-(--text-light)': index >= Math.round(rating)}
      )}
    />  
  ))
}