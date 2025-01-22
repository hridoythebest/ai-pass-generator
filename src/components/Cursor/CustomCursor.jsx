import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './CustomCursor.scss';

const CustomCursor = () => {
  const cursorOuterRef = useRef(null);
  const cursorInnerRef = useRef(null);
  const requestRef = useRef();
  const previousTimeRef = useRef();
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });
  const [linkHovered, setLinkHovered] = React.useState(false);

  const onMouseMove = (event) => {
    const { clientX, clientY } = event;
    setMousePosition({ x: clientX, y: clientY });
  };

  const animateOuterCursor = (time) => {
    if (previousTimeRef.current !== undefined) {
      const deltaX = (mousePosition.x - cursorOuterRef.current.offsetLeft) / 8;
      const deltaY = (mousePosition.y - cursorOuterRef.current.offsetTop) / 8;

      cursorOuterRef.current.style.transform = `translate3d(${deltaX}px, ${deltaY}px, 0)`;
    }
    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animateOuterCursor);
  };

  useEffect(() => {
    document.addEventListener('mousemove', onMouseMove);
    requestRef.current = requestAnimationFrame(animateOuterCursor);

    const innerCursor = cursorInnerRef.current;
    const outerCursor = cursorOuterRef.current;

    gsap.set(innerCursor, {
      x: mousePosition.x,
      y: mousePosition.y,
    });

    gsap.to(innerCursor, {
      duration: 0.1,
      x: mousePosition.x,
      y: mousePosition.y,
    });

    const handleLinkHoverEvents = () => {
      const linkElements = document.querySelectorAll('a, button, input, .interactive');
      
      linkElements.forEach((link) => {
        link.addEventListener('mouseenter', () => {
          setLinkHovered(true);
        });
        
        link.addEventListener('mouseleave', () => {
          setLinkHovered(false);
        });
      });
    };

    handleLinkHoverEvents();

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(requestRef.current);
    };
  }, [mousePosition]);

  useEffect(() => {
    if (linkHovered) {
      cursorInnerRef.current.classList.add('cursor-hover');
      cursorOuterRef.current.classList.add('cursor-hover');
    } else {
      cursorInnerRef.current.classList.remove('cursor-hover');
      cursorOuterRef.current.classList.remove('cursor-hover');
    }
  }, [linkHovered]);

  return (
    <>
      <div ref={cursorOuterRef} className="cursor-outer"></div>
      <div ref={cursorInnerRef} className="cursor-inner"></div>
    </>
  );
};

export default CustomCursor;
