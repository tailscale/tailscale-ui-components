import cx from "classnames"
import React, { useCallback, useEffect, useRef, useState } from "react"
import { Button } from "src/components/button/button"
import { ArrowLeft, ArrowRight } from "src/icons"
import { trackEvent } from "src/utils/analytics"

type CarouselProps = {
  children: React.ReactNode
  cardWidth: number
  gap: number
  trackingFeature?: string
  className?: string
}
/**
 * Carousel renders a carousel that is controlled by left and right arrow buttons.
 * cardWidth and gap are passed in to dictate the static width of each element in the
 * carousel and the gap between them, but also to dictate how much the carousel moves
 * with each button press.
 *
 * 2023/12/04 - This component was made specifically for the onboarding-suggestion banner.
 * There's probably some improvements that can be made to generalize the component and add
 * additional functionality, like an auto rotating flag.
 *
 *     <Carousel cardWidth={200} gap={8}>
 *       <CustomCard />
 *       ...
 *     </ Carousel>
 */
export default function Carousel({
  children,
  cardWidth,
  gap,
  trackingFeature,
  className,
}: CarouselProps) {
  const [scrollX, setScrollX] = useState(0)
  const carouselContainerRef = useRef<HTMLDivElement>(null)

  const [containerWidth, setContainerWidth] = useState(0)
  const [isFocusFromClick, setIsFocusFromClick] = useState(false)
  // Extra 8 in calculation to account for ml-2 on each card so it doesn't cut off shadow and focus styling
  const stepWidth = cardWidth + gap + 8

  // Extra 24 to account for margin on carousel container and margin on each card
  const totalContentWidth =
    React.Children.count(children) * stepWidth - gap + 24

  const isPrevDisabled = scrollX >= 0
  const isNextDisabled = scrollX <= -(totalContentWidth - containerWidth)

  // On component mount and on window resize, update the container width
  useEffect(() => {
    const updateWidth = () => {
      const width = carouselContainerRef?.current?.offsetWidth
      if (width) {
        setContainerWidth(width)
      }
    }

    window.addEventListener("resize", updateWidth)
    updateWidth()

    return () => window.removeEventListener("resize", updateWidth)
  }, [])

  const handleCardFocus = useCallback(
    (index: number) => {
      if (!isFocusFromClick) {
        let targetScrollX = -(index * stepWidth)
        const maxPossibleScrollX = containerWidth - totalContentWidth
        setScrollX(Math.max(targetScrollX, maxPossibleScrollX))
      }
      setIsFocusFromClick(false)
    },
    [isFocusFromClick, stepWidth, containerWidth, totalContentWidth]
  )

  const handlePrevClick = useCallback(() => {
    setScrollX((prevScrollX) => Math.min(prevScrollX + stepWidth, 0))
  }, [stepWidth])

  const handleNextClick = useCallback(() => {
    setScrollX((prevScrollX) => {
      const potentialNewScrollX = prevScrollX - stepWidth
      const maxPossibleScrollX = containerWidth - totalContentWidth
      return Math.max(potentialNewScrollX, maxPossibleScrollX)
    })
  }, [stepWidth, containerWidth, totalContentWidth])

  // This is to prevent the carousel from moving when the user clicks on a card.
  const handleMouseDown = useCallback(() => {
    setIsFocusFromClick(true)
  }, [])

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>, index: number) => {
      if (event.key === "ArrowRight") {
        event.preventDefault()
        handleNextClick()
      } else if (event.key === "ArrowLeft") {
        event.preventDefault()
        handlePrevClick()
      }
    },
    [handlePrevClick, handleNextClick]
  )

  return (
    <div className={cx("flex flex-col gap-2 items-stretch", className)}>
      <div
        ref={carouselContainerRef}
        className="overflow-x-auto sm:overflow-x-hidden w-full flex justify-start snap-x snap-mandatory hide-scrollbar"
        role="region"
        aria-roledescription="carousel"
        aria-label="suggestions-carousel"
      >
        <div
          className="flex transition-transform z-20 gap-2 mb-2 ml-4 w-max"
          style={{
            transform: `translateX(${scrollX}px)`,
          }}
        >
          {React.Children.map(children, (child, index) => (
            <div
              key={index}
              className="flex flex-shrink-0 snap-center mt-2 ml-2"
              style={{ width: `${cardWidth}px` }}
              onKeyDown={(event) => handleKeyDown(event, index)}
              onFocus={() => handleCardFocus(index)}
              onMouseDown={handleMouseDown}
            >
              {child}
            </div>
          ))}
        </div>
      </div>
      <div className="justify-end sm:flex hidden mr-4">
        <Button
          type="button"
          onClick={() => {
            handlePrevClick()
            trackEvent("Click previous arrow", {
              featureFlagProperties: {
                feature: trackingFeature,
              },
            })
          }}
          disabled={isPrevDisabled}
          variant="minimal"
          aria-label="Previous items"
        >
          <ArrowLeft size={16} />
        </Button>
        <Button
          type="button"
          onClick={() => {
            handleNextClick()
            trackEvent("Click next arrow", {
              featureFlagProperties: {
                feature: trackingFeature,
              },
            })
          }}
          disabled={isNextDisabled}
          variant="minimal"
          aria-label="Next items"
        >
          <ArrowRight size={16} />
        </Button>
      </div>
    </div>
  )
}
