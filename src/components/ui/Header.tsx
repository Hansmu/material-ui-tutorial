import React from 'react';
import {AppBar, Toolbar, Typography, useScrollTrigger} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import {ApplicationTheme} from "./theme";

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
        ...theme.mixins.toolbar /* It contains minHeight configuration */
    }
}));

interface HeaderProps {

}

export function Header(props: HeaderProps) {
    const classes = useStyles();

    return (
        <React.Fragment>
            <ElevationScroll>
                <AppBar color={'primary'}> {/* Color primary comes from the theme. We've overwritten it in theme.ts */}
                    {/*
                    The Toolbar component is needed to lay out the objects horizontally. Otherwise it would start stacking vertically.
                    */}
                    <Toolbar>
                        <Typography variant={'h3'} color={'secondary'}>
                            Arc Development
                        </Typography>
                    </Toolbar>
                </AppBar>
            </ElevationScroll>
            <div className={classes.toolbarMargin} /> {/* Use this to push the content away from overlapping with the toolbar. */}
        </React.Fragment>
    );
}