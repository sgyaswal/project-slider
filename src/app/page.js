"use client";

import React, { useState, useEffect } from "react";
import ProjectCard from "./components/card";
import styles from "./page.module.css";
import ProjectModal from "./components/modal";

export default function Home() {
  const [projects, setProjects] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const openModal = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedProject(null);
    setIsModalOpen(false);
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      console.error("No file selected.");
      return;
    }

    const formData = new FormData();
    formData.append("excel_file", selectedFile);

    try {
      const response = await fetch("https://65.0.97.103/api/excel-data", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        console.log("File uploaded successfully.");
        fetchData();
        alert("File uploaded successfully.");
      } else {
        console.error("Failed to upload file.");
      }
    } catch (error) {
      console.error("An error occurred while uploading the file:", error);
    }
  };

  const filteredProjects = projects.filter((project) => {
    const titleMatch =
      project.title &&
      project.title.toLowerCase().includes(searchQuery.toLowerCase());
    const techMatch =
      project.technologies &&
      project.technologies.toLowerCase().includes(searchQuery.toLowerCase());
    const frontendMatch =
      project.skillset_frontend &&
      project.skillset_frontend
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
    const backendMatch =
      project.skillset_backend &&
      project.skillset_backend
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

    const dbMatch =
      project.skillset_databases !== null &&
      project.skillset_databases !== undefined
        ? project.skillset_databases
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        : false;

    const infraMatch =
      project.skillset_infrastructure !== null &&
      project.skillset_infrastructure !== undefined
        ? project.skillset_infrastructure
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        : false;

    return (
      titleMatch ||
      techMatch ||
      frontendMatch ||
      backendMatch ||
      dbMatch ||
      infraMatch
    );
  });

  const deleteData = async () => {
    try {
      const response = await fetch(
        "https://65.0.97.103/api/delete-projects",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        console.log("Data deleted successfully.");
        fetchData();
        alert("Data deleted successfully.");
        return true;
      } else {
        console.error("Failed to delete data.");
        return false;
      }
    } catch (error) {
      console.error("An error occurred while deleting data:", error);
      return false;
    }
  };

  const getProjects = async () => {
    const apiUrl = "https://65.0.97.103/api/get-projects";

    try {
      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      return data?.data || [];
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  };

  const fetchData = async () => {
    const data = await getProjects();
    setProjects(data);
  };

  useEffect(() => {
    fetchData();

  }, []);

  return (
    <div>
      <div className={styles.header}>
        <label
          className={`${styles.customFileInput} ${
            selectedFile ? "selected" : ""
          }`}
        >
          <input
            // className={styles.customFileInput}
            type="file"
            accept=".xlsx,.xls"
            onChange={handleFileChange}
            data-file-name={
              selectedFile ? selectedFile.name : "Please select a file"
            }
          />
        </label>
        <p id="file-name-element" className={styles.fileName}>
          {selectedFile ? "Selected File: " + selectedFile.name : ""}
        </p>
        {selectedFile && (
          <button className={styles.inputs} onClick={handleUpload}>
            Upload file
          </button>
        )}
        <button className={styles.inputs} onClick={deleteData}>
          Delete Project
        </button>
        <input
          className={styles.inputs}
          type="text"
          placeholder="Search projects"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className={styles.gallery}>
        {filteredProjects?.map((project, index) => (
          <ProjectCard
            key={index}
            onClick={() => openModal(project)} // Apply onClick directly here
            {...project}
          />
        ))}
        {isModalOpen && (
          <ProjectModal project={selectedProject} onClose={closeModal} />
        )}
      </div>
    </div>
  );
}
