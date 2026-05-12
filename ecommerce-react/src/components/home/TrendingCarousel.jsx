import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading.jsx';
import ProductCard from '../common/ProductCard.jsx';
import Container from '../layout/Container.jsx';
import Button from '../ui/Button.jsx';

export default function TrendingCarousel({ products, onQuickView }) {
  const swiperRef = useRef(null);

  return (
    <section className="py-16 sm:py-20">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading eyebrow="Trending" title="What everyone’s adding" />
          <div className="flex gap-2">
            <Button
              type="button"
              variant="secondary"
              size="icon"
              aria-label="Previous slide"
              onClick={() => swiperRef.current?.slidePrev()}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              type="button"
              variant="secondary"
              size="icon"
              aria-label="Next slide"
              onClick={() => swiperRef.current?.slideNext()}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </Container>
      <div className="mt-10 pl-4 sm:pl-6 lg:pl-[max(2rem,calc((100vw-80rem)/2+2rem))]">
        <Swiper
          modules={[Pagination]}
          pagination={{ clickable: true, dynamicBullets: true }}
          spaceBetween={22}
          slidesPerView={1.08}
          breakpoints={{
            640: { slidesPerView: 1.4 },
            900: { slidesPerView: 2.2 },
            1200: { slidesPerView: 3.1 },
            1400: { slidesPerView: 3.6 },
          }}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
        >
          {products.map((p) => (
            <SwiperSlide key={p.id} className="!h-auto pb-12">
              <ProductCard product={p} onQuickView={onQuickView} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
