import React, { useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

function Carousel(){
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider(
    {
      initial: 0,
      slideChanged(slider) {
        setCurrentSlide(slider.track.details.rel);
      },
      created() {
        setLoaded(true);
      },
      loop: true,
      slides: {
        perView: 1,
        spacing: 15,
      },
    },

    [
      (slider) => {
        let timeout;
        let mouseOver = false;
        function clearNextTimeout() {
          clearTimeout(timeout);
        }
        function nextTimeout() {
          clearTimeout(timeout);
          if (mouseOver) return;
          timeout = setTimeout(() => {
            slider.next();
          }, 2000);
        }
        slider.on("created", () => {
          slider.container.addEventListener("mouseover", () => {
            mouseOver = true;
            clearNextTimeout();
          });
          slider.container.addEventListener("mouseout", () => {
            mouseOver = false;
            nextTimeout();
          });
          nextTimeout();
        });
        slider.on("dragStarted", clearNextTimeout);
        slider.on("animationEnded", nextTimeout);
        slider.on("updated", nextTimeout);
      },
    ]
  );

  return (
    <>
      <div className="navigation-wrapper relative">
        <div
          ref={sliderRef}
          className="keen-slider cursor-grab rounded-xl h-96"
        >
          <div
            id="BlackCon"
            className="keen-slider__slide number-slide1 flex flex-col items-center justify-center p-10"
          >
            <div className="flex justify-between items-center text-white text-md">
              <div className="left__container md:mr-20">
                <p className="text-3xl mb-5 text-primary_orange-0 font-sans font-semibold">
                  Top 3 Contributors
                </p>
                <ol className="list-none md:text-lg">
                  <li className="mb-2">
                    <span className="pr-2">💲</span>
                    Cash Prizes
                  </li>
                  <li className="mb-2">
                    <span className="pr-2">✨</span>
                    Internship opportunities through Hiring Partners
                  </li>
                  <li className="mb-2">
                    <span className="pr-2">👕</span>
                    Cool T-shirts and Schwag Kits
                  </li>
                  <li className="mb-2">
                    <span className="pr-2">🔊</span>
                    Shout outs on Socials
                  </li>
                  <li className="mb-2">
                    <span className="pr-2">🏅</span>
                    Certificate of Appreciation
                  </li>
                  <li className="mb-2">
                    <span className="pr-2">😎</span>
                    Subscriptions and perks from In-Kind Sponsors
                  </li>
                </ol>
              </div>
              <div className="right__container hidden md:block">
                <img
                  //   className="w-1/2 h-auto"
                  src="https://user-images.githubusercontent.com/64256342/163843876-e3a8c903-93b2-4142-831a-998d02677467.svg"
                  alt="top3"
                />
              </div>
            </div>
          </div>
          <div
            id="BlobCon"
            className="keen-slider__slide number-slide2  flex items-center p-10 justify-center"
          >
            <div className="flex justify-between items-center text-white text-md">
              <div className="left__container hidden md:block">
                <img
                  className="h-auto w-3/5"
                  src="https://user-images.githubusercontent.com/64256342/163848590-1ecf9f72-7df0-4a10-a55b-f20cfd85a31f.svg"
                  alt="top10"
                />
              </div>
              <div className="right__container md:ml-20">
                <p className="text-3xl mb-5 text-white font-sans font-semibold">
                  Top 10 Contributors
                </p>
                <ol className="list-none  md:text-lg">
                  {/* <li className="mb-2">
                    <span className="pr-2">
                      💲
                    </span>
                    Cash Prizes
                  </li> */}
                  <li className="mb-2">
                    <span className="pr-2">✨</span>
                    Internship opportunities through Hiring Partners
                  </li>
                  <li className="mb-2">
                    <span className="pr-2">👕</span>
                    Cool T-shirts and Schwag Kits
                  </li>
                  <li className="mb-2">
                    <span className="pr-2">🔊</span>
                    Shout outs on Socials
                  </li>
                  <li className="mb-2">
                    <span className="pr-2">🏅</span>
                    Certificate of Appreciation
                  </li>
                  <li className="mb-2">
                    <span className="pr-2">😎</span>
                    Subscriptions and perks from In-Kind Sponsors
                  </li>
                </ol>
              </div>
            </div>
          </div>
          <div
            id="BlackCon"
            className="keen-slider__slide number-slide3 flex items-center justify-center"
          >
            <div className="flex justify-between items-center p-10 text-white text-md">
              <div className="left__container md:mr-20">
                <p className="text-3xl mb-5 text-primary_orange-0 font-sans font-semibold">
                  Top 25 Contributors
                </p>
                <ol className="list-none md:text-lg">
                  <li className="mb-2">
                    <span className="pr-2">👕</span>
                    Cool T-shirts and Schwag Kits
                  </li>
                  <li className="mb-2">
                    <span className="pr-2">🔊</span>
                    Shout outs on Socials
                  </li>
                  <li className="mb-2">
                    <span className="pr-2">🏅</span>
                    Certificate of Appreciation
                  </li>
                  <li className="mb-2">
                    <span className="pr-2">😎</span>
                    Subscriptions and perks from In-Kind Sponsors
                  </li>
                </ol>
              </div>
              <div className="right__container hidden md:block">
                <img
                  className="h-auto w-9/12"
                  src="https://user-images.githubusercontent.com/64256342/163849591-705b999b-e4cd-439e-9b38-a3f98f78037d.svg"
                  alt="top25"
                />
              </div>
            </div>
          </div>
          <div
            id="OrangeCon"
            className="keen-slider__slide number-slide4  flex items-center p-10 justify-center"
          >
            <div className="flex justify-between items-center text-white text-md">
              <div className="left__container hidden md:block">
                <img
                  className="h-auto w-3/5"
                  src="https://user-images.githubusercontent.com/64256342/163850367-8c859c61-3545-446a-b32f-f2cddc2b045a.svg"
                  alt="top50"
                />
              </div>
              <div className="right__container md:ml-20">
                <p className="text-3xl mb-5 text-white font-sans font-semibold">
                  Top 50 Contributors
                </p>
                <ol className="list-none md:text-lg">
                  <li className="mb-2">
                    <span className="pr-2">🔊</span>
                    Shout outs on Socials
                  </li>
                  <li className="mb-2">
                    <span className="pr-2">🏅</span>
                    Certificate of Appreciation
                  </li>
                  <li className="mb-2">
                    <span className="pr-2">😎</span>
                    Subscriptions and perks from In-Kind Sponsors
                  </li>
                </ol>
              </div>
            </div>
          </div>
          <div
            id="BlackCon"
            className="keen-slider__slide number-slide5  flex items-center p-10 justify-center"
          >
            <div className="flex justify-between items-center text-white text-md">
              <div className="left__container md:mr-20">
                <p className="text-3xl mb-5 text-primary_orange-0 font-sans font-semibold">
                  Top 100 Contributors
                </p>
                <ol className="list-none md:text-lg">
                  <li className="mb-2">
                    <span className="pr-2">🏅</span>
                    Certificate of Appreciation
                  </li>
                  <li className="mb-2">
                    <span className="pr-2">😎</span>
                    Subscriptions from In-Kind Sponsors
                  </li>
                </ol>
              </div>
              <div className="right__container hidden md:block">
                <img
                  className="w-9/12 h-auto"
                  src="https://user-images.githubusercontent.com/64256342/163851012-b0d6f6ca-41d1-4ead-b8a4-8c60cfa612d9.svg"
                  alt="top100"
                />
              </div>
            </div>
          </div>
          <div
            id="PNGCon"
            className="keen-slider__slide number-slide6 flex items-center p-10 justify-center"
          >
            <div className="flex justify-between items-center text-white text-md">
              <div className="left__container hidden md:block">
                <img
                  src="https://user-images.githubusercontent.com/64256342/163851539-901a49df-8a41-433f-ad6a-98d337f16155.svg"
                  alt="mentors&admin"
                />
              </div>
              <div className="right__container md:ml-20">
                <p className="text-3xl mb-5 text-white font-sans font-semibold">
                  Rewards for Active Project Admins and Mentors
                </p>
                <ol className="list-none md:text-lg">
                  <li className="mb-2">
                    <span className="pr-2">👕</span>
                    Cool T-shirts and Schwag Kits
                  </li>
                  <li className="mb-2">
                    <span className="pr-2">🔊</span>
                    Shout outs on Socials
                  </li>
                  <li className="mb-2">
                    <span className="pr-2">🏅</span>
                    Certificate of Appreciation
                  </li>
                  <li className="mb-2">
                    <span className="pr-2">😎</span>
                    Subscriptions and perks from In-Kind Sponsors
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
        {loaded && instanceRef.current && (
          <>
            <Arrow
              left
              onClick={(e) =>
                e.stopPropagation() || instanceRef.current?.prev()
              }
              disabled={currentSlide === 0}
            />

            <Arrow
              onClick={(e) =>
                e.stopPropagation() || instanceRef.current?.next()
              }
              disabled={
                currentSlide ===
                instanceRef.current.track.details.slides.length - 1
              }
            />
          </>
        )}
      </div>
    </>
  );
};
function Arrow(props) {
  const disabeld = props.disabled ? " arrow--disabled" : "";
  return (
    <svg
      onClick={props.onClick}
      className={`arrow ${
        props.left ? "arrow--left" : "arrow--right"
      } ${disabeld}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      {props.left && (
        <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
      )}
      {!props.left && (
        <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
      )}
    </svg>
  );
}

export default Carousel;