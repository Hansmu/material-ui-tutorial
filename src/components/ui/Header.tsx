import React, {useState} from 'react';
import {AppBar, Button, Menu, MenuItem, Tab, Tabs, Toolbar, useScrollTrigger, useTheme} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {ApplicationTheme} from "./theme";

import logo from '../../assets/logo.svg';
import {Link, useHistory} from "react-router-dom";

interface Props {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window?: () => Window;
    children: React.ReactElement;
}

function ElevationScroll(props: Props) {
    const { children } = props;

    /*This is to add a scroll listener*/
    const trigger = useScrollTrigger({
        disableHysteresis: true, /* it defines if you want a little delay to when the user is scrolling. */
        threshold: 0 /* how much the user has to scroll before it gets triggered. */
    });

    return React.cloneElement(children, {
        elevation: trigger ? 4 : 0,
    });
}

const useStyles = makeStyles((theme: ApplicationTheme) => ({
    toolbarMargin: {
        ...theme.mixins.toolbar, /* It contains minHeight configuration */
        marginBottom: '3rem',
        [theme.breakpoints.down('md')]: {
            marginBottom: '2rem'
        },
        [theme.breakpoints.down('xs')]: {
            marginBottom: '1.25rem'
        }
    },
    logo: {
        height: '7rem',
        [theme.breakpoints.down('md')]: {
            height: '6rem'
        },
        [theme.breakpoints.down('xs')]: {
            height: '5rem'
        }
    },
    tabContainer: {
        marginLeft: 'auto'
    },
    tab: {
        ...theme.typography.tab,
        minWidth: 10,
        marginLeft: '25px'
    },
    button: {
        ...theme.typography.estimate,
        borderRadius: '50px',
        marginLeft: '50px',
        marginRight: '25px',
        height: '45px'
    },
    logoContainer: {
        padding: 0,
        '&:hover': {
            backgroundColor: 'transparent'
        }
    },
    menu: {
        backgroundColor: theme.palette.primary.main,
        color: 'white',
        borderRadius: 0
    },
    menuItem: {
        ...theme.typography.tab,
        opacity: 0.7,
        '&:hover': {
            opacity: 1
        }
    }
}));

interface HeaderProps {

}

const subMenus: {[k: string]: {url: string, label: string}[]} = {
    services: [
        {
            url: '/customsoftware',
            label: 'Custom Software Development'
        },
        {
            url: '/mobileapps',
            label: 'Mobile App Development'
        },
        {
            url: '/websites',
            label: 'Website Development'
        }
    ]
};

export function Header(props: HeaderProps) {
    const classes = useStyles();
    const history = useHistory();
    const currentUrl = history.location.pathname.replace('/', '');
    const parentUrl = Object.keys(subMenus)
        .find(parentUrl => subMenus[parentUrl]
            .some(url => url.url === history.location.pathname)
        );
    const [value, setValue] = useState(parentUrl || currentUrl || 'home');
    const [anchorEl, setAnchorEl] = useState<HTMLAnchorElement | null>(null);

    const theme = useTheme();
    const isMediumOrBelowScreen = useMediaQuery(theme.breakpoints.down('md'));

    const handleChange = (event: React.ChangeEvent<{}>, value: any) => {
        setValue(value);
    };

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        setAnchorEl(e.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSubMenuClick = (value: string) => {
        handleClose();
        setValue(value);
    };

    const renderServicesSubMenu = (url: string, text: string, parent: string = currentUrl) => {
        return (
            <MenuItem
                onClick={() => handleSubMenuClick('services')}
                component={Link}
                to={url}
                selected={url.replace('/', '') === parent}
                classes={{root: classes.menuItem}}
            >
                {text}
            </MenuItem>
        );
    };

    const renderTabs = () => {
        return (
            <>
                <Tabs value={value} onChange={handleChange} className={classes.tabContainer} indicatorColor={'primary'}>
                    <Tab value={'home'} className={classes.tab} component={Link} label={'Home'} to={'/'} />
                    <Tab
                        aria-owns={anchorEl ? 'simple-menu' : undefined}
                        aria-haspopup={anchorEl ? true : undefined}
                        value={'services'}
                        className={classes.tab}
                        component={Link}
                        onMouseOver={handleClick}
                        label={'Services'}
                        to={'/services'}
                    />
                    <Tab value={'revolution'} className={classes.tab} component={Link} label={'The Revolution'} to={'/revolution'} />
                    <Tab value={'about'} className={classes.tab} component={Link} label={'About us'} to={'/about'} />
                    <Tab value={'contact'} className={classes.tab} component={Link} label={'Contact us'} to={'/contact'} />
                </Tabs>
                <Button variant={'contained'} color={'secondary'} className={classes.button}>
                    Free Estimate
                </Button>
                <Menu
                    id={'simple-menu'}
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    classes={{paper: classes.menu}}
                    MenuListProps={{onMouseLeave: handleClose}}
                    elevation={0}
                >
                    {renderServicesSubMenu('/services', 'Services')}
                    {subMenus.services.map(child => renderServicesSubMenu(child.url, child.label, 'services'))}
                </Menu>
            </>
        );
    };

    return (
        <React.Fragment>
            <ElevationScroll>
                <AppBar color={'primary'}> {/* Color primary comes from the theme. We've overwritten it in theme.ts */}
                    {/*
                    The Toolbar component is needed to lay out the objects horizontally. Otherwise it would start stacking vertically.
                    */}
                    <Toolbar disableGutters>
                        <Button component={Link} to={'/'} className={classes.logoContainer} disableRipple onClick={() => setValue('home')}>
                            <img className={classes.logo} src={logo} alt={'company logo'} />
                        </Button>

                        {isMediumOrBelowScreen
                            ? null
                            : renderTabs()
                        }
                    </Toolbar>
                </AppBar>
            </ElevationScroll>
            <div className={classes.toolbarMargin} /> {/* Use this to push the content away from overlapping with the toolbar. */}
        </React.Fragment>
    );
}