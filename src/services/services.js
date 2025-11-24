import { fetchGraphQL } from "./contentful";

export async function getAllProjects(preview = true) {
  const projectsData = await fetchGraphQL(
    `query {
            projectsCollection{
                items{
        title
      description
      stack
      demo
      image{
      url
      }
      logo{
      url}
    }
  }
}`,
    preview
  );
  return projectsData?.data?.projectsCollection?.items;
}

export async function getMySkills(preview = true) {
  const skillsData = await fetchGraphQL(
    `query {
          mySkillsCollection{
    items{
      title
      image{
      url
      }
      skillLevel
      order
    }
  }
}`,
    preview
  );
  return skillsData?.data?.mySkillsCollection?.items;
}

export async function getHeroSectionDetails(preview = true) {
  const heroSectionData = await fetchGraphQL(
    `query {
  heroSectionCollection{
    items{
      heroTitle
      heroDescription
      name
      position
      techSpecialist
      age
      experience
      country
      heroImage{
        url
      }
      heroImage2{
        url
      }
    }
    
  }
}`,
    preview
  );
  return heroSectionData?.data?.heroSectionCollection?.items[0];
}

export async function getDetailsAboutMe(preview = true) {
  const aboutMeData = await fetchGraphQL(
    `query {
    aboutMeCollection{
      items{
        name
        email
        phone
        location
        github
        linkedin
        instagram
    }
  }
}`,
    preview
  );
  return aboutMeData?.data?.aboutMeCollection?.items[0];
}

export async function getEducationDetails(preview = true) {
  const educationData = await fetchGraphQL(
    `query {
    educationCollection{
      items{
        degree
        institution
        duration
        icon{
        url
        }
        accent
        description
    }
  }
}`,
    preview
  );
  return educationData?.data?.educationCollection?.items;
}


