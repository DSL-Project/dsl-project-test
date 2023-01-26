import { useState, useEffect } from "react";
import Client from "../util/useContentful";
import ErrorData from "../util/ErrorData";

// receive page props from each page components
// Contentful call to retrieve content model "PageTitle"

const PageTitle = (props) => {

  const [ page, setPage ] = useState([]);
  const [ error, setError ] = useState(null);
  const [ loading, setLoading ] = useState(true);
  
  useEffect(() => {
    const getPage = async () => {
      try {
        const res = await Client.getEntries({
          content_type: "pageTitle"
        })

        if (!!res) {
          const items = res?.items.filter(item => item?.fields?.page === props.page).map(item => ({ title: item?.fields?.title, description: item?.fields?.description })) || [];
          setPage(items);
          setLoading(false);
        }
      } catch (error) {
        // ToDo: error guarding
        console.log(`Error fetching ${error}`);
        setError(error);
        setLoading(false);
      }
    }
    getPage();
  }, [props.page]);

  if (error) {
    return (
      <ErrorData />
    )
  }

  return (
    <section className="pageTitleContainer">
      {
        loading
        ?
          <p>loading</p>
        :
          page.length !== 0
          ?
            <>
              <h1 className="pageTitle">{page[0].title}</h1>
              <p className="pageDescription">{page[0].description}</p>
            </>
          : null
      }
    </section>
  );
}

export default PageTitle;