import Navbar from "./components/Navbar";
import About from "./sections/About";
import Contact from "./sections/Contact";
import Education from "./sections/Education";
import Experience from "./sections/Experience";
import Footer from "./sections/Footer";
import Hero from "./sections/Hero";
import Projects from "./sections/Projects";
import Skills from "./sections/Skills";
import Loader from "./components/Loader";

import ParticlesBackground from "./components/ParticlesBackground";
import { getDetailsAboutMe, getEducationDetails, getHeroSectionDetails, getMySkills, getTechExperienceDetails } from "./services/services";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const App = () => {
  const [heroSectionDetails, setHeroSectionDetails] = useState(null);
  const [skills, setSkills] = useState([]);
  const [aboutMe, setAboutMe] = useState(null);
  const [education, setEducation] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [techExperience, setTechExperience] = useState([]);

  const TOTAL_API_CALLS = 4;
  const PROGRESS_INCREMENT = 100 / TOTAL_API_CALLS;

  const updateProgress = () => {
    setProgress((prev) => {
      const newProgress = Math.min(prev + PROGRESS_INCREMENT, 100);
      return newProgress;
    });
  };

  const getHeroSectionData = async () => {
    try {
      const heroSectionDetails = await getHeroSectionDetails(true);
      setHeroSectionDetails(heroSectionDetails);
      console.log("heroSectionDetails", heroSectionDetails);
    } catch (error) {
      console.error("Error fetching hero section details:", error);
    } finally {
      updateProgress();
    }
  };

  const getAllSkillsData = async () => {
    try {
      const skillsData = await getMySkills(true);
      const sortedSkills = skillsData?.sort((a, b) => (a?.order || 0) - (b?.order || 0));
      setSkills(sortedSkills || []);
    } catch (err) {
      console.error("Error fetching skills details:", err);
    } finally {
      updateProgress();
    }
  }

  const getDetailsAboutMeData = async () => {
    try {
      const aboutMeData = await getDetailsAboutMe(true);
      setAboutMe(aboutMeData);
    } catch (err) {
      console.error("Error fetching about me details:", err);
    } finally {
      updateProgress();
    }
  }

  const getEducationDetailsData = async () => {
    try {
      const educationData = await getEducationDetails(true);
      setEducation(educationData);
    } catch (err) {
      console.error("Error fetching education details:", err);
    } finally {
      updateProgress();
    }
  }

  const getTechExperienceDetailsData = async () => {
    try {
      const techExperienceData = await getTechExperienceDetails(true);
      const sortedTechExperience = techExperienceData?.sort((a, b) => (a?.order || 0) - (b?.order || 0)).reverse();
      setTechExperience(sortedTechExperience || []);
    } catch (err) {
      console.error("Error fetching tech experience details:", err);
    } finally {
      updateProgress();
    }
  }

  useEffect(() => {
    const fetchAllData = async () => {
      setIsLoading(true);
      setProgress(0);
      try {
        // Execute all API calls in parallel
        await Promise.all([
          getHeroSectionData(),
          getAllSkillsData(),
          getDetailsAboutMeData(),
          getEducationDetailsData(),
          getTechExperienceDetailsData()
        ]);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        // Ensure progress reaches 100% if it hasn't already
        setTimeout(() => {
          setProgress(100);
          // Wait a bit more for the progress bar animation to complete
          setTimeout(() => {
            setIsLoading(false);
          }, 2000);
        }, 100);
      }
    };

    fetchAllData();
  }, []);

  return (
    <>
      <AnimatePresence mode="wait" >
        {isLoading && <Loader progress={progress} />}
      </AnimatePresence>
      
      {!isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative min-h-screen bg-transparent text-slate-100"
        >
          <ParticlesBackground />
          <Navbar />
          <main className="flex flex-col gap-24 pt-24">
            <Hero heroSectionDetails={heroSectionDetails} />
            <About heroSectionDetails={heroSectionDetails} aboutMe={aboutMe} />
            <Education education={education} />
            <Skills skills={skills} />
            <Experience techExperience={techExperience} image={heroSectionDetails?.heroImage?.url}/>
            <Projects />
            <Contact />
          </main>
          <Footer />
        </motion.div>
      )}
    </>
  );
}

export default App;
