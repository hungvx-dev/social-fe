import React, { useEffect, useState } from 'react'
import queryString from 'query-string'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { UserAPI } from '@/services'
import * as typesHome from '@/modules/home/store/action_types'
import { AppBar, Tabs } from '@material-ui/core'
import { makeGetSearchBlogs, makeGetSearchPostsWithType, makeGetSearchUsers } from './store/selector'

import Posts from './Posts'
import Blogs from '../blog/Blogs'
import PostsBlogs from '../blog/PostsBlogs'
import { a11yProps, LinkTab, TabPanel } from '../blog/BlogHome'
import { SearchWrapper } from './Post.style'
import User from '../user/User'

const convertLocationToIndex = search => {
  switch (search) {
    case 'all':
      return 0
    case 'postsTopics':
      return 3
    case 'postsBlogs':
      return 4
    case 'blogs':
      return 2
    case 'people':
      return 1
    default:
      return 0
  }
}

function Search() {
  const location = useLocation()
  const params = queryString.parse(location.search)
  params.tab = params.tab || 'all'
  const dispatch = useDispatch()

  const blogs = makeGetSearchBlogs()
  const users = makeGetSearchUsers()
  const postsTopic = makeGetSearchPostsWithType('forum')
  const postsBlogs = makeGetSearchPostsWithType('blog')
  const [tabValue, setTabValue] = useState(convertLocationToIndex(params.tab))

  useEffect(() => {
    const fetchDataSearch = async () => {
      if (params.q.length > 0) {
        const data = await UserAPI.search(params.q)
        dispatch({ type: typesHome.SET_SEARCH, payload: data })
      }
    }

    fetchDataSearch().then(() => null)
  }, [params.q])

  const handleChange = (_, newValue) => {
    setTabValue(newValue)
  }

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
          <LinkTab label="Tất cả" to={`?q=${params.q}&tab=all`} {...a11yProps(0)} />
          <LinkTab label="Mọi người" to={`?q=${params.q}&tab=people`} {...a11yProps(1)} />
          <LinkTab label="Blogs" to={`?q=${params.q}&tab=blogs`} {...a11yProps(2)} />
          <LinkTab label="Bài viết Diễn Đàn" to={`?q=${params.q}&tab=postsTopics`} {...a11yProps(3)} />
          <LinkTab label="Bài viết Blogs" to={`?q=${params.q}&tab=postsBlogs`} {...a11yProps(4)} />
        </Tabs>
      </AppBar>
      <div className="md:max-w-2xl m-auto">
        <TabPanel value={tabValue} index={0}>
          {users.length > 0 && (
            <SearchWrapper>
              <h2>Mọi người</h2>
              {users.map(user => (
                <User user={user} key={user.id} />
              ))}
            </SearchWrapper>
          )}
          {postsTopic.length > 0 && (
            <SearchWrapper>
              <h2>Bài viết Diễn Đàn</h2>
              <Posts posts={postsTopic} />
            </SearchWrapper>
          )}
          {postsBlogs.length > 0 && (
            <SearchWrapper>
              <h2>Bài viết Blog</h2>
              <PostsBlogs posts={postsBlogs} view type="postSearch" />
            </SearchWrapper>
          )}
          {blogs.length > 0 && (
            <SearchWrapper>
              <h2>Blogs</h2>
              <Blogs blogs={blogs} />
            </SearchWrapper>
          )}
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          {users.length > 0 && (
            <SearchWrapper>
              <h2>Mọi người</h2>
              {users.map(user => (
                <User user={user} key={user.id} />
              ))}
            </SearchWrapper>
          )}
        </TabPanel>
        <TabPanel value={tabValue} index={2}>
          {blogs.length > 0 && (
            <SearchWrapper>
              <h2>Blogs</h2>
              <Blogs blogs={blogs} />
            </SearchWrapper>
          )}
        </TabPanel>
        <TabPanel value={tabValue} index={3}>
          {postsTopic.length > 0 && (
            <SearchWrapper>
              <h2>Bài viết Diễn Đàn</h2>
              <Posts posts={postsTopic} />
            </SearchWrapper>
          )}
        </TabPanel>
        <TabPanel value={tabValue} index={4}>
          {postsBlogs.length > 0 && (
            <SearchWrapper>
              <h2>Bài viết Blog</h2>
              <PostsBlogs posts={postsBlogs} view type="postSearch" />
            </SearchWrapper>
          )}
        </TabPanel>
      </div>
    </div>
  )
}

export default Search
