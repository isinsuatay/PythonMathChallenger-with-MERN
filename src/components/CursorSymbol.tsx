import React, { useEffect, useRef } from 'react';

const CursorSymbol: React.FC = () => {
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  const leftPos = useRef({ x: 0, y: 0 });
  const rightPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const lerp = (start: number, end: number, amount: number) => {
      return start + (end - start) * amount;
    };

    const updatePosition = (target: { x: number; y: number }, pos: { current: { x: number; y: number } }, speed: number) => {
      pos.current.x = lerp(pos.current.x, target.x, speed);
      pos.current.y = lerp(pos.current.y, target.y, speed);

      if (leftRef.current) {
        leftRef.current.style.transform = `translate3d(${leftPos.current.x}px, ${leftPos.current.y}px, 0)`;
      }
    
      if (rightRef.current) {
        rightRef.current.style.transform = `translate3d(${rightPos.current.x}px, ${rightPos.current.y}px, 0)`;
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      updatePosition({ x: e.pageX - 20, y: e.pageY - 20 }, leftPos, 0.15);
      updatePosition({ x: e.pageX + 20, y: e.pageY + 20 }, rightPos, 0.05);
    };

    const animate = () => {
      updatePosition(leftPos.current, leftPos, 0.15);
      updatePosition(rightPos.current, rightPos, 0.05);

      requestAnimationFrame(animate);
    };

    document.addEventListener('mousemove', handleMouseMove);
    animate();

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const symbolStyle: React.CSSProperties = {
    position: 'absolute',
    pointerEvents: 'none',
    fontSize: '3rem',
    color: 'black',
  };

  return (
    <>
      <div ref={leftRef} style={symbolStyle}>{'+'}</div>
      <div ref={rightRef} style={symbolStyle}>{'-'}</div>
    </>
  );
};

export default CursorSymbol;
