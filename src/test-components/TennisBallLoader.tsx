import React from 'react';
import { useLoading } from '../LoadingContext/LoadingContext.tsx';
import "./Ball.css";

interface TennisBallLoaderProps {
  size?: number; // Size of the tennis ball in pixels
  speed?: number; // Speed of the falling animation in seconds
}

const TennisBallLoader: React.FC<TennisBallLoaderProps> = ({ size, speed }) => {
  const { isLoading } = useLoading();

  let ballStyle, pseudoAfterStyle, pseudoBeforeStyle = {};

  if(size && speed){

    ballStyle = {
      position: 'absolute',
      overflow: 'hidden',
      height: size,
      width: size,
      top: '50%',
      left: '50%',
      borderRadius: '50%',
      background: 'radial-gradient(ellipse at center, #e5e300 30%, #c0c000 60%, #808000 100%)',
      boxSizing: 'border-box',
      transform: 'translate(-50%, -50%) rotate(30deg)',
      animation: `ball-fall-keyframes ${speed}s linear infinite alternate, spin ${speed * 2.5}s linear infinite`,
    } as React.CSSProperties;
  
    pseudoBeforeStyle = {
      content: "''",
      position: 'absolute',
      display: 'block',
      height: '100%',
      width: '100%',
      border: `solid ${size / 15}px #fff`,
      borderRadius: '50%',
      boxSizing: 'border-box',
      right: '70%',
    } as React.CSSProperties;
  
    pseudoAfterStyle = {
      content: "''",
      position: 'absolute',
      display: 'block',
      height: '100%',
      width: '100%',
      border: `solid ${size / 15}px #fff`,
      borderRadius: '50%',
      boxSizing: 'border-box',
      left: '70%',
    } as React.CSSProperties;
  }

  const keyframes = `
    @keyframes ball-fall-keyframes {
      0% { top: 0%; }
      10% { top: 1%; }
      20% { top: 4%; }
      30% { top: 9%; }
      40% { top: 16%; }
      50% { top: 25%; }
      60% { top: 36%; }
      70% { top: 49%; }
      80% { top: 64%; }
      90% { top: 81%; }
      100% { top: 100%; }
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;

  if (!isLoading) {
    return null;
  }

  return (
    <div style={{ margin: '0 auto', height: '250px', padding: '16px 0 56px'}}>
      <style>{keyframes}</style>
      <div style={{ height: '100%', position: 'relative' }}>
        <div style={ballStyle}>
          <div style={pseudoBeforeStyle} />
          <div style={pseudoAfterStyle} />
        </div>
      </div>
    </div>
  );
};

export default TennisBallLoader;