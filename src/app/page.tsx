import BannerSlider from "@/components/Banner/BannerSlider";
import CategorySection from "@/components/Category/CategorySection";
import "./Home.css";
import CategoryGrid from "@/components/CategoryGrid/CategoryGrid";
import HomeClient from "@/components/HomeClient/HomeClient";

export default function Home() {
  return (
    <main>
      <BannerSlider />
      <CategoryGrid />
      <HomeClient />
    </main>
  );
}
