import React, {useState} from 'react';
import {AppBar, Button, Tab, Tabs, Toolbar, useScrollTrigger} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
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
        marginBottom: '3rem'
    },
    logo: {
        height: '7rem'
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
    }
}));

interface HeaderProps {

}

export function Header(props: HeaderProps) {
    const classes = useStyles();
    const history = useHistory();
    const [value, setValue] = useState(history.location.pathname.replace('/', '') || 'home');

    const handleChange = (event: React.ChangeEvent<{}>, value: any) => {
        setValue(value);
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

                        <Tabs value={value} onChange={handleChange} className={classes.tabContainer} indicatorColor={'primary'}>
                            <Tab value={'home'} className={classes.tab} component={Link} label={'Home'} to={'/'} />
                            <Tab value={'services'} className={classes.tab} component={Link} label={'Services'} to={'/services'} />
                            <Tab value={'revolution'} className={classes.tab} component={Link} label={'The Revolution'} to={'/revolution'} />
                            <Tab value={'about'} className={classes.tab} component={Link} label={'About us'} to={'/about'} />
                            <Tab value={'contact'} className={classes.tab} component={Link} label={'Contact us'} to={'/contact'} />
                        </Tabs>
                        <Button variant={'contained'} color={'secondary'} className={classes.button}>
                            Free Estimate
                        </Button>
                    </Toolbar>
                </AppBar>
            </ElevationScroll>
            <div className={classes.toolbarMargin} /> {/* Use this to push the content away from overlapping with the toolbar. */}
        </React.Fragment>
    );
}