import React, { useEffect, useState } from 'react';

const Portfolio = () => {
  const [projects, setProjects] = useState([]);
  
  useEffect(() => {
  fetch('https://mirrosha26.github.io/public/static/projects.json')
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => setProjects(data))
    .catch(error => console.error('Error fetching projects:', error));
}, []);


  return (
    <div className="container pt-4 pt-lg-0">
      {projects.map((project, index) => (
        <div className="card card-img-scale bg-transparent overflow-hidden mb-6 mb-xl-8" key={index}>
          <div className="row g-xl-6 align-items-center">
            {index % 2 === 0 ? (
              <>
                <div className="col-lg-6">
                  <div className="card-img-scale-wrapper rounded-2 h-100">
                    <img src={project.image} className="img-scale" alt="portfolio-img" />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="card-body h-100 px-0 p-xl-5">
                    <h3 className="card-title">{project.title}</h3>
                    <p className="card-text mb-3 mb-lg-4">{project.description}</p>
                    <div className="d-flex gap-2 gap-sm-3 gap-lg-1 flex-lg-column flex-wrap mb-3 mb-lg-4">
                      <div><i className="fa-solid fa-circle fa-2xs text-bs-indigo me-2"></i>{project.year}</div>
                      {project.skills.map((skill, i) => <span key={i}>{skill}</span>)}
                    </div>
                    <a target="_blank" href={project.link} className="text-dark-hover stretched-link heading-color mb-0">
                      Посетить сайт <i className="fa-solid fa-arrow-right-long fa-fw ms-2"></i>
                    </a>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="col-lg-6 order-2 order-lg-1">
                  <div className="card-body h-100 px-0 p-xl-5 text-lg-end">
                    <h3 className="card-title">{project.title}</h3>
                    <p className="card-text mb-3 mb-lg-4">{project.description}</p>
                    <div className="d-flex justify-content-lg-end gap-2 gap-sm-3 gap-lg-1 flex-lg-column flex-wrap mb-3 mb-lg-4">
                      <div><i className="fa-solid fa-circle fa-2xs text-bs-indigo me-2"></i>{project.year}</div>
                      {project.skills.map((skill, i) => <span key={i}>{skill}</span>)}
                    </div>
                    <a target="_blank" href={project.link} className="text-dark-hover stretched-link heading-color mb-0">
                      Посетить сайт <i className="fa-solid fa-arrow-right-long fa-fw ms-2"></i>
                    </a>
                  </div>
                </div>
                <div className="col-lg-6 order-1 order-lg-2">
                  <div className="card-img-scale-wrapper rounded-2 h-100">
                    <img src={project.image} className="img-scale" alt="portfolio-img" />
                  </div>
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
