import { AppBar, Box, Tab, Tabs } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import Blogs from './Blogs'
import PostsBlogs from './PostsBlogs'
import { makeGetBlogsMe, makeGetBlogsTop, makeGetPostsNew, makeGetPostsUserFollowed } from './store/selector'
import * as types from './store/action_types'
import { makeGetIsAuthenticated } from '../auth/store/selector'

export function LinkTab(props) {
  return <Tab component={Link} {...props} />
}

export function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  )
}

export function a11yProps(index) {
  return {
    id: `nav-tab-${index}`,
    'aria-controls': `nav-tabpanel-${index}`,
  }
}

const convertLocationToIndex = search => {
  switch (search) {
    case '?tab=news':
      return 0
    case '?tab=top':
      return 1
    case '?tab=follow':
      return 2
    case '?tab=me':
      return 3
    default:
      return 0
  }
}

function BlogHome() {
  const location = useLocation()
  const dispatch = useDispatch()

  const isAuth = makeGetIsAuthenticated()
  const blogsTop = makeGetBlogsTop()
  const blogsMe = makeGetBlogsMe()
  const postsNew = makeGetPostsNew()
  const postsUserFollowed = makeGetPostsUserFollowed()

  const [tabValue, setTabValue] = useState(convertLocationToIndex(location.search))

  const handleChange = (_, newValue) => {
    setTabValue(newValue)
  }

  const fetchPostNew = () => dispatch({ type: types.S_FETCH_POSTS_NEW })

  const fetchBlogs = () => dispatch({ type: types.S_FETCH_BLOGS_TOP })

  const fetchPostsUserFollowed = () => {
    if (isAuth) dispatch({ type: types.S_FETCH_POSTS_USER_FOLLOWED })
  }

  const fetchBlogsMe = () => {
    if (isAuth) dispatch({ type: types.S_FETCH_BLOGS_ME })
  }

  useEffect(() => {
    const fetchData = () => {
      switch (location.search) {
        case '?tab=news':
          return fetchPostNew()
        case '?tab=top':
          return fetchBlogs()
        case '?tab=follow':
          return fetchPostsUserFollowed()
        case '?tab=me':
          return fetchBlogsMe()
        default:
          return fetchPostNew()
      }
    }
    fetchData()
  }, [location])

  return (
    <div className="nav-blogs">
      <AppBar position="static">
        <Tabs
          variant="fullWidth"
          value={tabValue}
          onChange={handleChange}
          className="md:w-3xl m-auto bb"
          aria-label="nav tabs example"
        >
          <LinkTab label="Bài mới" to="?tab=news" {...a11yProps(0)} />
          <LinkTab label="Top blogs" to="?tab=top" {...a11yProps(1)} />
          {/* {isAuth && (
            <> */}
          <LinkTab label="Theo dõi" to="?tab=follow" {...a11yProps(2)} />
          <LinkTab label="Blogs của tôi" to="?tab=me" {...a11yProps(3)} /> {/* </>
          )} */}
        </Tabs>
      </AppBar>
      <div className="md:max-w-2xl m-auto">
        <TabPanel value={tabValue} index={0}>
          <PostsBlogs posts={postsNew} type="postsNew" />
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <Blogs blogs={blogsTop} />
        </TabPanel>
        {/* {isAuth && (
          <> */}
        <TabPanel value={tabValue} index={2}>
          <PostsBlogs posts={postsUserFollowed} type="postsUserFollowed" />
        </TabPanel>
        <TabPanel value={tabValue} index={3}>
          <Blogs blogs={blogsMe} />
        </TabPanel>
        {/* </>
        )} */}
      </div>
    </div>
  )
}

export default BlogHome
