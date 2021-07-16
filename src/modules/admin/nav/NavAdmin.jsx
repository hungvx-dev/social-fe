import React from 'react'
import clsx from 'clsx'
import { useTheme } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import CssBaseline from '@material-ui/core/CssBaseline'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import GroupIcon from '@material-ui/icons/Group'
import ReportProblemIcon from '@material-ui/icons/ReportProblem'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { useStyles } from './Nav.style'

const list = [
  { title: 'User', icon: <GroupIcon />, regex: /users/, slug: 'users' },
  { title: 'Report', icon: <ReportProblemIcon />, regex: /reports/, slug: 'reports' },
]

export default function NavAdmin({ children }) {
  const classes = useStyles()
  const theme = useTheme()
  const [open, setOpen] = React.useState(false)
  const location = useLocation()
  const history = useHistory()

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  return (
    <div className="theme-admin">
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar style={{ backgroundColor: '#48bb78' }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, {
                [classes.hide]: open,
              })}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              <Link to="/" className="hover:underline">
                Diễn đàn
              </Link>
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            }),
          }}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </div>
          <Divider />
          <List>
            {list.map(item => (
              <ListItem button key={item.title} onClick={() => history.push(`/admin/${item.slug}`)}>
                <ListItemIcon style={{ color: item.regex.test(location.pathname) && '#48bb78' }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.title} style={{ color: item.regex.test(location.pathname) && '#48bb78' }} />
              </ListItem>
            ))}
          </List>
        </Drawer>
        <main className={classes.content}>
          <div className="pt-12">{children} </div>
        </main>
      </div>
    </div>
  )
}
