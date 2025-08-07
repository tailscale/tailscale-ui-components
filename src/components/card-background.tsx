import cx from "classnames"
import React from "react"

export type CardBackgroundProps = {
  bottomSVGClassName?: string
  topSVGClassName?: string
}

/*
CardBackground is a component that renders a Tailscale specific, branded background. 
It is historically used on cards and banners to give them a branded look and feel.
Because of the absolute positioning of both SVGs, the props bottomSVGClassName and topSVGClassName 
are used to allow for custom positioning of the SVGs.

NOTE: To prevent SVGs from overlapping with other elements in the card, position: relative will need to be used
directly on elements that need to sit on top of the SVGs.
Usage:
<Card>
  <h1 className="relative">This is a header that I want to sit on top of the SVGs</h1>
  <CardBackground />
</Card>
*/

export function CardBackground(props: CardBackgroundProps) {
  const { bottomSVGClassName, topSVGClassName } = props
  return (
    <>
      <svg
        width="471"
        height="470"
        viewBox="0 0 471 470"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cx(
          "absolute -bottom-[370px] -left-[150px] z-10",
          bottomSVGClassName
        )}
      >
        <g opacity="1">
          <ellipse
            cx="235.5"
            cy="235"
            rx="235.5"
            ry="235"
            fill="url(#paint0_linear_9388_24795)"
          />
        </g>
        <defs>
          <linearGradient
            id="paint0_linear_9388_24795"
            x1="235.5"
            y1="0"
            x2="235.5"
            y2="223"
            gradientUnits="userSpaceOnUse"
          >
            <stop
              stopColor="currentColor"
              className="text-gray-100 dark:text-gray-700"
            />
            <stop
              offset="1"
              stopColor="currentColor"
              className="text-gray-100 dark:text-gray-700"
              stopOpacity="0.5"
            />
          </linearGradient>
        </defs>
      </svg>
      <svg
        className={cx(
          "absolute -top-[250px] -right-[30px] z-10 hidden sm:block",
          topSVGClassName
        )}
        width="587"
        height="391"
        viewBox="0 0 587 391"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g opacity="0.25">
          <path
            d="M392 195.5C392 87.5283 304.248 -3.52492e-05 196 -3.05176e-05L196 391C304.248 391 392 303.472 392 195.5Z"
            fill="url(#paint0_linear_9388_24790)"
          />
          <path
            d="M196 195.5C196 87.5283 108.248 -3.52492e-05 -1.70912e-05 -3.05176e-05L0 391C108.248 391 196 303.472 196 195.5Z"
            fill="url(#paint1_linear_9388_24790)"
          />
          <path
            d="M587 195.5C587 87.5283 499.696 -3.52251e-05 392 -3.05176e-05L392 391C499.696 391 587 303.472 587 195.5Z"
            fill="url(#paint2_linear_9388_24790)"
          />
        </g>
        <defs>
          <linearGradient
            id="paint0_linear_9388_24790"
            x1="244.246"
            y1="263"
            x2="244.246"
            y2="391"
            gradientUnits="userSpaceOnUse"
          >
            <stop
              stopColor="currentColor"
              className="text-gray-300 dark:text-gray-600"
            />
            <stop
              offset="1"
              stopColor="currentColor"
              className="text-gray-300 dark:text-gray-600"
              stopOpacity="0.6"
            />
          </linearGradient>
          <linearGradient
            id="paint1_linear_9388_24790"
            x1="48.2462"
            y1="263"
            x2="48.2462"
            y2="391"
            gradientUnits="userSpaceOnUse"
          >
            <stop
              stopColor="currentColor"
              className="text-gray-200 dark:text-gray-700"
            />
            <stop
              offset="1"
              stopColor="currentColor"
              className="text-gray-200 dark:text-gray-700"
              stopOpacity="0.6"
            />
          </linearGradient>
          <linearGradient
            id="paint2_linear_9388_24790"
            x1="440"
            y1="263"
            x2="440"
            y2="391"
            gradientUnits="userSpaceOnUse"
          >
            <stop
              stopColor="currentColor"
              className="text-gray-400 dark:text-gray-500"
            />
            <stop
              offset="1"
              stopColor="currentColor"
              className="text-gray-400 dark:text-gray-500"
              stopOpacity="0.6"
            />
          </linearGradient>
        </defs>
      </svg>
    </>
  )
}
