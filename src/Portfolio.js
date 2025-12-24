import React, { useEffect, useState, useRef } from 'react';
import projectsData from './projects.json';
import './Portfolio.css';

const Portfolio = () => {
  const [projects, setProjects] = useState([]);
  const swiperRefs = useRef({});

  
  useEffect(() => {
    // Load projects directly from imported JSON
    setProjects(projectsData);
  }, []);

  useEffect(() => {
    // Wait for Swiper to be available and DOM to be ready
    const initSwipers = () => {
      if (typeof window === 'undefined' || !window.Swiper) {
        // Retry after a short delay if Swiper is not yet loaded
        setTimeout(initSwipers, 100);
        return;
      }

      projects.forEach((project, index) => {
        const images = project.images || (project.image ? [project.image] : []);
        if (images.length > 1) {
          const swiperId = `swiper-${index}`;
          const swiperElement = document.getElementById(swiperId);
          const imagesCount = images.length;
          
          if (swiperElement && !swiperRefs.current[swiperId]) {
            // Use requestAnimationFrame to ensure DOM is fully ready
            requestAnimationFrame(() => {
              // Find elements within the swiper container
              const paginationEl = swiperElement.querySelector(`.swiper-pagination-${index}`);
              const nextEl = swiperElement.querySelector(`.swiper-button-next-${index}`);
              const prevEl = swiperElement.querySelector(`.swiper-button-prev-${index}`);
              
              if (swiperElement && !swiperRefs.current[swiperId]) {
                try {
                  swiperRefs.current[swiperId] = new window.Swiper(swiperElement, {
                    slidesPerView: 1,
                    spaceBetween: 0,
                    loop: imagesCount > 2, // Only loop if more than 2 slides
                    autoplay: imagesCount > 1 ? {
                      delay: 3000,
                      disableOnInteraction: false,
                    } : false,
                    pagination: paginationEl ? {
                      el: paginationEl,
                      clickable: true,
                    } : false,
                    navigation: (nextEl || prevEl) ? {
                      nextEl: nextEl,
                      prevEl: prevEl,
                    } : false,
                  });
                } catch (error) {
                  console.error('Error initializing Swiper:', error);
                }
              }
            });
          }
        }
      });
    };

    // Initialize with a small delay to ensure DOM is ready
    const timeoutId = setTimeout(initSwipers, 50);

    // Cleanup function
    return () => {
      clearTimeout(timeoutId);
      Object.values(swiperRefs.current).forEach(swiper => {
        if (swiper && swiper.destroy) {
          try {
            swiper.destroy(true, true);
          } catch (error) {
            console.error('Error destroying Swiper:', error);
          }
        }
      });
      swiperRefs.current = {};
    };
  }, [projects]);

  const renderProjectImage = (project, index) => {
    const images = project.images || (project.image ? [project.image] : []);
    
    if (images.length > 1) {
      // Render Swiper slider for multiple images
      return (
        <div className="rounded-2 h-100 position-relative" style={{ pointerEvents: 'none' }}>
          <div className="swiper portfolio-swiper" id={`swiper-${index}`}>
            <div className="swiper-wrapper">
              {images.map((img, imgIndex) => (
                <div className="swiper-slide" key={imgIndex}>
                  <img src={img} className="w-100" alt={`${project.title} - ${imgIndex + 1}`} style={{ pointerEvents: 'none' }} />
                </div>
              ))}
            </div>
            <div className={`swiper-pagination swiper-pagination-${index}`} style={{ pointerEvents: 'auto' }}></div>
            <div className={`swiper-button-next swiper-button-next-${index}`} style={{ pointerEvents: 'auto' }}></div>
            <div className={`swiper-button-prev swiper-button-prev-${index}`} style={{ pointerEvents: 'auto' }}></div>
          </div>
        </div>
      );
    } else {
      // Render single image
      return (
        <div className="rounded-2 h-100" style={{ pointerEvents: 'none' }}>
          <img src={images[0] || project.image} className="w-100" alt="portfolio-img" style={{ pointerEvents: 'none' }} />
        </div>
      );
    }
  };

  if (projects.length === 0) {
    return (
      <div className="container pt-4 pt-lg-0">
        <div className="text-center py-5">
          <p>Загрузка проектов...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container pt-4 pt-lg-0">
      {projects.map((project, index) => (
        <div className="card bg-transparent overflow-hidden mb-6 mb-xl-8" key={index}>
          <div className="row g-xl-6 align-items-center">
            {index % 2 === 0 ? (
              <>
                <div className="col-lg-6">
                  {renderProjectImage(project, index)}
                </div>
                <div className="col-lg-6">
                  <div className="card-body h-100 px-0 p-xl-5">
                    <h3 className="card-title d-flex align-items-center gap-2">
                      {project.title}
                      {project.inDevelopment && (
                        <span className="badge bg-secondary" style={{ fontSize: '0.75rem' }}>В разработке</span>
                      )}
                    </h3>
                    <p className="card-text mb-3 mb-lg-4">{project.description}</p>
                    <div className="d-flex gap-2 gap-sm-3 gap-lg-1 flex-lg-column flex-wrap mb-3 mb-lg-4">
                      <div><i className="fa-solid fa-circle fa-2xs text-bs-indigo me-2"></i>{project.year}</div>
                      {project.skills.map((skill, i) => <span key={i}>{skill}</span>)}
                    </div>
                    {project.link && project.link.trim() !== '' && (
                      <a target="_blank" rel="noreferrer" href={project.link} className="text-dark-hover heading-color mb-0">
                        Посетить сайт <i className="fa-solid fa-arrow-right-long fa-fw ms-2"></i>
                      </a>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="col-lg-6 order-2 order-lg-1">
                  <div className="card-body h-100 px-0 p-xl-5 text-lg-end">
                    <h3 className="card-title d-flex align-items-center gap-2 justify-content-lg-end">
                      {project.title}
                      {project.inDevelopment && (
                        <span className="badge bg-secondary" style={{ fontSize: '0.75rem' }}>В разработке</span>
                      )}
                    </h3>
                    <p className="card-text mb-3 mb-lg-4">{project.description}</p>
                    <div className="d-flex justify-content-lg-end gap-2 gap-sm-3 gap-lg-1 flex-lg-column flex-wrap mb-3 mb-lg-4">
                      <div><i className="fa-solid fa-circle fa-2xs text-bs-indigo me-2"></i>{project.year}</div>
                      {project.skills.map((skill, i) => <span key={i}>{skill}</span>)}
                    </div>
                    {project.link && project.link.trim() !== '' && (
                      <a target="_blank" rel="noreferrer" href={project.link} className="text-dark-hover heading-color mb-0">
                        Посетить сайт <i className="fa-solid fa-arrow-right-long fa-fw ms-2"></i>
                      </a>
                    )}
                  </div>
                </div>
                <div className="col-lg-6 order-1 order-lg-2">
                  {renderProjectImage(project, index)}
                </div>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Portfolio;
