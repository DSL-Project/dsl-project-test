import Client from "../util/useContentful";
import { useEffect } from "react";

const Peoplelist = () => {

  useEffect(() => {
    const getPeopleList = async () => {
      try {
        const res = await Client.getEntries({
          content_type: "peopleList",

        })

        if(!!res) {
          console.log(res.items);
          
          // const items = res?.items
        }
      } catch (error) {
        console.log(error);
        
      }
    }
    getPeopleList();
  },[]);

  return (
    <h1>People</h1>
  );
}

export default Peoplelist;