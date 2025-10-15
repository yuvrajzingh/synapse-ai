import React from 'react';
import styled from 'styled-components';

const LoadingSpinner = () => {
  return (
    <StyledWrapper className='flex justify-center items-center mt-10'>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 384" className="loader">
        <circle r={176} cy={192} cx={192} strokeWidth={32} fill="transparent" pathLength={360} className="active" />
        <circle r={176} cy={192} cx={192} strokeWidth={32} fill="transparent" pathLength={360} className="track" />
      </svg>
      <span className="sr-only">Loading...</span>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  /* Inspired by: m3.material.io/components/progress-indicators/overview */

  .loader {
    width: 32px;
    /* Subpixels get cut off */
    overflow: visible;
    transform: rotate(-90deg);
    transform-origin: center;

    --active: #a6abad;
    --track: #ededed;

    --duration: 8s;

    animation: spin 2s linear infinite;
  }

  @keyframes spin {
    0% {
      rotate: 0deg;
    }

    100% {
      rotate: 360deg;
    }
  }

  .active {
    stroke: var(--active);
    stroke-linecap: round;
    stroke-dashoffset: 360;
    animation: active-animation var(--duration) ease-in-out infinite;
  }

  @keyframes active-animation {
    0% {
      stroke-dasharray: 0 0 0 360 0 360;
    }
    12.5% {
      stroke-dasharray: 0 0 270 90 270 90;
    }
    25% {
      stroke-dasharray: 0 270 0 360 0 360;
    }
    37.5% {
      stroke-dasharray: 0 270 270 90 270 90;
    }
    50% {
      stroke-dasharray: 0 540 0 360 0 360;
    }
    50.001% {
      stroke-dasharray: 0 180 0 360 0 360;
    }
    62.5% {
      stroke-dasharray: 0 180 270 90 270 90;
    }
    75% {
      stroke-dasharray: 0 450 0 360 0 360;
    }
    87.5% {
      stroke-dasharray: 0 450 270 90 270 90;
    }
    87.501% {
      stroke-dasharray: 0 90 270 90 270 90;
    }
    100% {
      stroke-dasharray: 0 360 1 360 0 360;
    }
  }

  .track {
    stroke: var(--track);
    stroke-linecap: round;
    stroke-dashoffset: 360;
    animation: track-animation var(--duration) ease-in-out infinite;
  }

  @keyframes track-animation {
    0% {
      stroke-dasharray: 0 20 320 40 320 40;
    }
    12.5% {
      stroke-dasharray: 0 290 50 310 50 310;
    }
    25% {
      stroke-dasharray: 0 290 320 40 320 40;
    }
    37.5% {
      stroke-dasharray: 0 560 50 310 50 310;
    }
    37.501% {
      stroke-dasharray: 0 200 50 310 50 310;
    }
    50% {
      stroke-dasharray: 0 200 320 40 320 40;
    }
    62.5% {
      stroke-dasharray: 0 470 50 310 50 310;
    }
    62.501% {
      stroke-dasharray: 0 110 50 310 50 310;
    }
    75% {
      stroke-dasharray: 0 110 320 40 320 40;
    }
    87.5% {
      stroke-dasharray: 0 380 50 310 50 310;
    }
    100% {
      stroke-dasharray: 0 380 320 40 320 40;
    }
  }`;

export default LoadingSpinner;
