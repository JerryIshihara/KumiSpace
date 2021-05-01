import { Carousel } from "antd";
import "./style.less";

// import img from "../../assets/Archivement.svg";

const MyCarousel: React.FC = () => (
	<Carousel autoplay /* className="landing-carousel" */ >
		<div>
			<div style={{backgroundColor: "grey", width: "100%", height: "300px"}}/>
		</div>
		<div>
			{/* <img className="landing-carousel-picture" src={img} alt="pic" /> */}
			<div style={{backgroundColor: "grey", width: "100%", height: "300px"}}/>
		</div>
	</Carousel>
);

export default MyCarousel;
