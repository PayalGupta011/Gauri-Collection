import CategoryGrid from '../components/CategoryGrid';
import Features from '../components/Features';
import FeaturedProducts from '../components/FeaturedProducts';
import BrandStory from '../components/BrandStory';
import InstagramFeed from '../components/InstagramFeed';
import Footer from '../components/Footer';
import HeroSlider from '../components/HeroSlider';

const HomePage = () => {
  return (
    <div>
      <div className="h-[118px]"></div>
      <HeroSlider />
      <Features />
      <CategoryGrid />
      <FeaturedProducts />
      <BrandStory />
      <InstagramFeed />
      <Footer />
    </div>
  );
};

export default HomePage;
