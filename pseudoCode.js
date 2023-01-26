// Content Model
  // 1. PageTitle - [{ page(str), title(str), description(str) }]
  // 2. ProjectList - [{ title(str), subHeading(str), people([{id:str}]), publication([{id:str}]), media (URL), partners(str), funding(str), id({sys.id}) }]
  // 3. ProgramList - [{ {title(str), description(str), url(str), id({sys.id}) }]
  // 4. PublicationList - [{ type(str), title(str), people([{id:str}]), project([{id:str}]), id({sys.id}) }]
  // 5. PeopleList - [{ type(str), name(str), title(str), profilePic(media), intro(str), website(url/str), email(str), project([{id:str}]), publication([{id:str}]), id({sys.id}) }]

// PSEUDO-Code
  // Page Components
    // 1. Home
      // render PageTitle Component with the page === 'home'
    // 2. Projects
      // render PageTitle Component with the page === 'projects'
      // render ProjectList Component with only title and description
        // 2-1. Project (project-slug)
          // render each project
    // 3. Programs
      // render PageTitle Component with the page === 'programs'
      // render ProgramList Component with title, description and url
    // 4. Publications
      // render PageTitle Component with the page === 'publications'
      // render PublicationList with type, title, author(name only), project(title only)
    // 5. People
      // render PageTitle Component with the page === 'people'
      // render list of people by type with only profilePic, name and title
        // 5-1. Person (person-slug)
          // render each person
    // 6. Contact
      // render PageTitle Component with the page === 'contact'
      // render form
      // render ContactList with map (not sure whether we need to create contentful for this)
    // 7. ErrorPage
      // render errorPage
  // Components
    // 1. PageTitle
      // Contentful call to retrieve content model "PageTitle"
      // receive props from each page components 'item.page' 
        // * use this component on project page as well
    // 2. ProjectList
      // Contentful call to retrieve content model "ProjectList"
      // pass each project(id) objects to Project Component
    // 3. ProgramList
      // Contentful call to retrieve content model "ProgramList"
    // 4. PublicationList
      // Contentful call to retrieve content model "PublicationList"
    // 5. PeopleList
      // Contentful call to retrieve content model "PeopleList"
      // pass each person(id) objects to Person Component
    // 6. Card/Container reusable component
    // 7. PageMenu reusable component

// App
  // export satellite = createContext()
  
  // <Nav/>
  // <Routes>
    // <Route path='/' element={<Home/>}/>
      // <PageTitle page='home'/>
        // Client.getEntries({'pageTitle'})
          // setPage({title: item.fields.title, description: item.field.description})
        // HomeContent component required for the rest of contents on homePage
    
    // <Route path='/projects' element={<Projects/>}/>
      // <PageTitle page='projects'/>
        // Client.getEntries({'pageTitle'})
          // setPage({title: item.fields.title, description: item.field.description})
      // <ProjectList/>
          // Client.getEntries({'projectList', include=10})
          // setProject({id: item.sys.id, title: item.fields.title, subHeading: item.fields.subHeading, summary: item.fields.summary, people: item.fields.people.sys.id, publication: item.fields.publication.sys.id, media: item.fields.media, partner: item.fields.partner, funding: item.fields.funding})
          // setPeople(id from people above should be equal to {include.asset.sys.id, include.asset.fields.name?})
          // setPublication(id from publication above should be equal to {include.asset.sys.id}))
        // onClick project, <Link path='projects/projectSlug' element={<Project/> id={project.id}}/>
          // <Project/>
          // <satellite.Provider value={}>
            // {projectSlug} = useParams();
            // onClick people, <Link path='people/personSlug' element={<Person/>}/>
            // onClick publication, <Link path='publications/publicationSlug' element={<Publication/>}/>
    
    // <Route path='/programs' element={<Programs/>}/>
      // <PageTitle page='programs'/>
        // Client.getEntries({'pageTitle'})
          // setPage({title: item.fields.title, description: item.field.description, url: item.fields.url})
      // <ProgramList/>
        // Client. getEntries({'programList'})
          // setProgram({})
    
    // <Route path='/publications' element={<Publications/>}/>
      // <PageTitle page='publications'/>
        // Client.getEntries({'pageTitle'})
          // setPage({title: item.fields.title, description: item.field.description})
      // <PublicationList/>
        // useContext(satellite);
        // Client.getEntries({'publicationList', order:'type'})
          // setPublication({})
            // OR setJournal({}) & setPress({})
    
    // <Route path='/people' element={<People/>}/>
      // <PageTitle page='projects'/>
        // Client.getEntries({'pageTitle'})
          // setPage({title: item.fields.title, description: item.field.description})
      // <PeopleList/>
        // useContext(satellite);
        // Client.getEntries({'peopleList', order:'type'})
      // onClick people, <Route path='people/personSlug' element={<Person/>}/>
        // <Person/>
          // {personSlug} = useParams();
          // onClick project, <Route path='projects/projectSlug' element={<Project/>}
          // onClick publication, <Route path='publications/publicationSlug' element={<Publication/>}/>
    
    // <Route path='/contact' element={<Contact/>}/>
      // <PageTitle page='contact'/>
        // Client.getEntries({'pageTitle'})
          // setPage({title: item.fields.title, description: item.field.description})
      // <Form/> component or hard-coded form
      // <ContactBody/> component or hard-coded body content with map
    
    // <Route path='*' element={<ErrorPage/>}/>
  // </Routes>
  // <Footer/>