import React, { useEffect, useState } from 'react';
import './CustomCursor.scss';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseDown = () => {
      setIsClicking(true);
    };

    const handleMouseUp = () => {
      setIsClicking(false);
    };

    const handleMouseEnter = () => {
      document.body.classList.add('custom-cursor-active');
    };

    const handleMouseLeave = () => {
      document.body.classList.remove('custom-cursor-active');
    };

    // Add global event listeners
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mouseleave', handleMouseLeave);

    // Add hover detection for interactive elements
    const interactiveElements = document.querySelectorAll('button, a, input, .interactive');
    const handleElementHover = (enter) => (e) => {
      setIsHovering(enter);
    };

    interactiveElements.forEach(element => {
      element.addEventListener('mouseenter', handleElementHover(true));
      element.addEventListener('mouseleave', handleElementHover(false));
    });

    // Cleanup function
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mouseleave', handleMouseLeave);

      interactiveElements.forEach(element => {
        element.removeEventListener('mouseenter', handleElementHover(true));
        element.removeEventListener('mouseleave', handleElementHover(false));
      });
    };
  }, []);

  return (
    <div 
      className={`custom-cursor ${isHovering ? 'hovering' : ''} ${isClicking ? 'clicking' : ''}`}
      style={{
        left: `${position.x}px`, 
        top: `${position.y}px`
      }}
    />
  );
};

export default CustomCursor;
