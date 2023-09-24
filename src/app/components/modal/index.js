import React from 'react';
import styles from './modal.module.css'

const ProjectModal = ({ project, onClose }) => {
  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <button onClick={onClose} className={styles.closeButton}>
          Close
        </button>
        <div className={styles.modalData}>
        <p className={styles.heading}>Title</p>
        <p className={styles.headingData}>{project.title}</p>
        <p className={styles.heading}>Project Technologies</p>
        <p className={styles.headingData}>{project.technologies}</p>
        <p className={styles.heading}>Technical Skillset Frontend</p>
        <p className={styles.headingData}>{project.skillset_frontend}</p>
        <p className={styles.heading}>Technical Skillset Backend</p>
        <p className={styles.headingData}>{project.skillset_backend}</p>
        <p className={styles.heading}>Technical Skillset Databases</p>
        <p className={styles.headingData}>{project.skillset_databases}</p>
        <p className={styles.heading}>Technical Skillset Infrastructure</p>
        <p className={styles.headingData}>{project.skillset_infrastructure}</p>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal