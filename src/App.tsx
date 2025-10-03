import React, { useState, useRef, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import clevertap from "clevertap-web-sdk";

clevertap.init("TEST-865-ZRW-7K7Z");
clevertap.setLogLevel(3);

const onNativeDisplay = () => {
  clevertap.event.push("Native Event");
};

function App() {
  const [carouselItems, setCarouselItems] = useState<any[]>([]);
  const [notificationDetail, setNotificationDetail] = useState<any>(null); // <-- Add this
  const carouselRef = useRef<HTMLDivElement>(null);

  // Handler to display the carousel
  function handleCarouselNativeDisplay(detail: any) {
    if (detail && detail.kv) {
      // Fire notification viewed event
      clevertap.renderNotificationViewed(detail);
      setNotificationDetail(detail);

      const items = [];

      // Check if we have unnumbered keys first
      if (detail.kv.image) {
        items.push({
          imageUrl: detail.kv.image,
          title: detail.kv.title || "Default Title",
          link: detail.kv.link || "#",
        });
      }

      // Then check for numbered keys (1-5)
      for (let i = 1; i <= 5; i++) {
        const imageKey = `image${i}`;
        const titleKey = `title${i}`;
        const linkKey = `link${i}`;
        if (detail.kv[imageKey]) {
          items.push({
            imageUrl: detail.kv[imageKey],
            title: detail.kv[titleKey] || `Product ${i}`,
            link: detail.kv[linkKey] || "#",
          });
        }
      }

      setCarouselItems(items);
    } else {
      setCarouselItems([]);
      setNotificationDetail(null);
    }
  }

  // Attach handler to window so the event listener can access it
  (window as any).handleCarouselNativeDisplay = handleCarouselNativeDisplay;

  // Register event listener in useEffect
  useEffect(() => {
    function onCTWebNativeDisplay(event: any) {
      console.log("CT_web_native_display event received:", event);
      if (event.detail && event.detail.kv) {
        console.log("Native display keys:", Object.keys(event.detail.kv));
        console.log("Looking for topic:", event.detail.kv.topic);
        console.log("Looking for displayType:", event.detail.kv.displayType);
        if (
          event.detail.kv.displayType === "imageCarousel" ||
          event.detail.kv.topic === "blueprint"
        ) {
          handleCarouselNativeDisplay(event.detail);
        } else {
          console.log(
            "No match for imageCarousel in either displayType or topic"
          );
        }
      }
    }
    document.addEventListener("CT_web_native_display", onCTWebNativeDisplay);
    return () => {
      document.removeEventListener(
        "CT_web_native_display",
        onCTWebNativeDisplay
      );
    };
  }, []);

  // Carousel navigation
  const scrollBy = (offset: number) => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  return (
    <div className="App">
      <button onClick={onNativeDisplay}> Native Display </button>
      {carouselItems.length > 0 && (
        <div className="max-w-4xl mx-auto my-8">
          <h2 className="text-2xl font-bold mb-4 text-center">Top News</h2>
          <div className="relative w-full">
            <div
              className="carousel-container flex overflow-x-auto gap-4 p-4 snap-x"
              ref={carouselRef}
              style={{
                scrollBehavior: "smooth",
                WebkitOverflowScrolling: "touch",
                scrollbarWidth: "none",
              }}
            >
              {carouselItems.map((item, idx) => (
                <div
                  className="carousel-item"
                  key={idx}
                  style={{
                    flex: "0 0 auto",
                    width: 280,
                    scrollSnapAlign: "start",
                    position: "relative",
                    borderRadius: 8,
                    overflow: "hidden",
                    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                    transition: "transform 0.3s",
                  }}
                >
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => {
                      if (notificationDetail) {
                        clevertap.renderNotificationClicked(notificationDetail); // <-- Simple click
                      }
                    }}
                  >
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      loading="lazy"
                      style={{
                        width: "100%",
                        height: 200,
                        objectFit: "cover",
                      }}
                    />
                    <div
                      className="carousel-caption"
                      style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        background: "rgba(0,0,0,0.7)",
                        color: "white",
                        padding: 8,
                        textAlign: "center",
                      }}
                    >
                      {item.title}
                    </div>
                  </a>
                </div>
              ))}
            </div>
            {/* Navigation arrows */}
            <button
              onClick={() => scrollBy(-300)}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2"
              style={{ zIndex: 2 }}
            >
              <svg
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
            <button
              onClick={() => scrollBy(300)}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2"
              style={{ zIndex: 2 }}
            >
              <svg
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
