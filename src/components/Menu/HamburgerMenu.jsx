import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaBars, 
  FaTimes, 
  FaBook, 
  FaShieldAlt, 
  FaUserSecret, 
  FaInfoCircle, 
  FaEnvelope,
  FaGithub,
  FaArrowLeft,
  FaHome
} from 'react-icons/fa';
import metadata from '../../metadata.json';
import './HamburgerMenu.scss';

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Close menu on escape key
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest('.hamburger-menu')) {
        setIsOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]);

  const menuItems = [
    {
      title: 'Home',
      icon: <FaHome />,
      path: 'home',
      description: 'Return to the password generator'
    },
    {
      title: 'User Guide',
      icon: <FaBook />,
      path: 'USER_GUIDE',
      description: 'Learn how to use the password generator effectively'
    },
    {
      title: 'Privacy Policy',
      icon: <FaUserSecret />,
      path: 'legal-PRIVACY',
      description: 'How we handle and protect your data'
    },
    {
      title: 'Terms of Service',
      icon: <FaShieldAlt />,
      path: 'legal-TERMS',
      description: 'Rules and guidelines for using our service'
    },
    {
      title: 'About Us',
      icon: <FaInfoCircle />,
      path: 'ABOUT',
      description: 'Learn more about our mission and team'
    },
    {
      title: 'Contact',
      icon: <FaEnvelope />,
      path: 'CONTACT',
      description: 'Get in touch with us'
    }
  ];

  const handleDocClick = (path) => {
    if (path === 'home') {
      navigate('/');
    } else {
      navigate(`/docs/${path}`);
    }
    setIsOpen(false);
  };

  return (
    <div className={`hamburger-menu ${isOpen ? 'open' : ''}`}>
      <button className="menu-toggle" onClick={toggleMenu} aria-label="Toggle Menu">
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      <div className="menu-content">
        <div className="menu-header">
          <h2>Menu</h2>
          <a 
            href={metadata.developer.github}
            target="_blank"
            rel="noopener noreferrer"
            className="github-link"
          >
            <FaGithub />
            {metadata.developer.slug}
          </a>
        </div>

        <nav className="menu-items">
          {menuItems.map((item, index) => (
            <div 
              key={index}
              className="menu-item"
              onClick={() => handleDocClick(item.path)}
            >
              <div className="item-header">
                <span className="icon">{item.icon}</span>
                <span className="title">{item.title}</span>
              </div>
              <p className="description">{item.description}</p>
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default HamburgerMenu;
