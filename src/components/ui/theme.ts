// @ts-ignore
import {createMuiTheme, Theme} from "@material-ui/core";
import {Typography} from "@material-ui/core/styles/createTypography";
import {PrimitiveObject} from "../../common-types";
import {CSSProperties} from "react";

const arcBlue = '#0B72B9';
const arcOrange = '#FFBA60';

interface ApplicationTypography extends Typography {
    tab: CSSProperties,
    estimate: CSSProperties
}

export interface ApplicationTheme extends Theme {
    typography: ApplicationTypography
}

/* We can use this to overwrite any of the default theme values. We merge it with the default values.
* The ones that were before remain, but the ones that we want to overwrite get changed. */
export const theme = createMuiTheme({ // https://material-ui.com/customization/default-theme/
    /*
    palette
        * common holds the common color values that you might want to use across the app. E.g. all texts of a certain type
        should be of a certain color.
        * type can be used to differentiate between the dark and light mode of an application.
        * Both with primary and secondary, if you provide a main color, then Material UI automatically generates a light
        and dark version. A lot of components get their color values from the primary and secondary colors, so changing them will already
        affect those components.
        * error is used to provide a color for the error objects.
        * grey is used to have a consistent set of greys, with varying degree.
        * contrastThreshold, getContrastText, augmentColor are used by Material UI to decide how to balance the color
        of the text with the colors of the background or that it maintains the same level of readability regardless of
        your theme. Probably won't have to mess with these unless you're getting into very specific color cases.
        * text provides different text colors based on the importance of the texts.
        * divider provides a color for the divider.
        * background has the default background color for the entire page and for the paper component, which is used commonly
        in Material UI.
        * action has different colors based on the actions that you are trying to display.
    */
    palette: {
        primary: {
            main: arcBlue
        },
        secondary: {
            main: arcOrange
        }
    },
    /*
    typography - can be used to define the fonts used across the application.
        * fontSize can be used to define the default fontSize that typography will use. However, there are variants, in the
        typography object that use rem to define their fontSizes and those use the default fontSize. E.g. h1 variant uses 6rem.
        The Typography component can be used to uses these definitions. <Typography variant={'h1'}>Something</Typography>
    */
    typography: {
        h3: {
            fontWeight: 300
        }
    }
}, { /* The args can be used to merge with the main theme object. Overcomes the limitations from TypeScript. */
    palette: {
        common: {
            blue: arcBlue,
            orange: arcOrange
        }
    },
    typography: {
        tab: {
            fontFamily: 'Raleway',
            textTransform: 'none',
            fontWeight: 700,
            fontSize: '1rem',
        },
        estimate: {
            fontFamily: 'Pacifico',
            fontSize: '1rem',
            textTransform: 'none',
            color: 'white'
        }
    }
});