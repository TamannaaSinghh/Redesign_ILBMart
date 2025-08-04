import BannerSlider from "@/components/Banner/BannerSlider";
import CategorySection from "@/components/Category/CategorySection";
import "./Home.css";
import CategoryGrid from "@/components/CategoryGrid/CategoryGrid";
import HomeClient from "@/components/HomeClient/HomeClient";
import ImagePreloader from "@/components/ImagePreloader";

export default function Home() {
  return (
    <main>
      <ImagePreloader />
      <BannerSlider />
      <CategoryGrid />
      <HomeClient />
    </main>
  );
}
