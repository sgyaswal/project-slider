// components/ProjectCard.js
import React from 'react';

import styles from "./card.module.css"

const ProjectCard = ({
  onClick,
  title,
  technologies,
  skillset_frontend,
  skillset_backend,
  skillset_databases,
  skillset_infrastructure,
}) => {
  return (
    <div className={styles.card} onClick={onClick}>
      <div className={styles.cardContent}>
      <p className={styles.headingData1}>Title</p>
        <p className={styles.headingTitle}>{title}</p>
        <p className={styles.heading}>Project Technologies</p>
        <p className={styles.headingData}>{technologies}</p>
        <p className={styles.heading}>Technical Skillset Frontend</p>
        <p className={styles.headingData}>{skillset_frontend}</p>
        <p className={styles.heading}>Technical Skillset Backend</p>
        <p className={styles.headingData}>{skillset_backend}</p>
        <p className={styles.heading}>Technical Skillset Databases</p>
        <p className={styles.headingData}>{skillset_databases}</p>
        <p className={styles.heading}>Technical Skillset Infrastructure</p>
        <p className={styles.headingData}>{skillset_infrastructure}</p>
      </div>
    </div>
  );
};

export default ProjectCard;