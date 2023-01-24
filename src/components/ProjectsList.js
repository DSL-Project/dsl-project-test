import { useEffect } from "react";
import Client from "../util/useContentful";

const ProjectsList = () => {

  useEffect(() => {
    const getProjectsList = async () => {
      try {
        const res = await Client.getEntries({
          content_type: "projectList",

        })

        if(!!res) {
          console.log(res.items);
          
          const items = res?.items
        }
      } catch (error) {
        console.log(error);
        
      }
    }
    getProjectsList();
  },[]);

  return(
    <h1>IS IT WORKING??</h1>
  );
}

export default ProjectsList;