import React, {ChangeEvent, ComponentType, Fragment, useState} from 'react';
import {createStyles, withStyles} from '@material-ui/core/styles';
import {compose} from 'recompose';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper/Paper';
import BookingCompleted from '@/views/ProfilePage/BookingCompleted';
import {ThemeCustom} from "@/components/Theme/Theme";

const styles: any = (theme: ThemeCustom) => createStyles({
    boxBookingProfile: {
        position: 'relative',
    },
    tabsRoot: {
        borderBottom: '1px solid #e8e8e8',
    },
    tabsIndicator: {
        backgroundColor: '#1890ff',
    },
    tabRoot: {
        textTransform: 'initial',
        minWidth: 72,
        fontWeight: theme.typography!.fontWeightRegular,
        marginRight: theme.spacing!.unit! * 4,
        fontFamily: [
            '-apple-system',
            'Roboto',
        ].join(','),
        '&:hover': {
            color: '#40a9ff',
            opacity: 1,
        },
        '&$tabSelected': {
            color: '#1890ff',
            fontWeight: theme.typography!.fontWeightMedium,
        },
        '&:focus': {
            color: '#40a9ff',
        },
    },
    tabSelected: {},
    myBooking: {
        paddingTop: 20,
        width: '90%',
        margin: '0 auto',
    },
});

interface ITabContainer {
    children: any
}

interface IBookingProfile {
    classes?: any;
}

const TabContainer: ComponentType<ITabContainer> = (props: ITabContainer) => {
    return (
        <Fragment>
            {props.children}
        </Fragment>
    );
};

const BookingProfile: ComponentType<IBookingProfile> = (props: IBookingProfile) => {
    const {classes} = props;
    const [value, setValue] = useState<number>(0);

    const handleChange = (event: ChangeEvent<{}>, values: number) => {
        setValue(values);
    };

    return (
        <Fragment>
            <Paper square>
                <Tabs
                    value = {value}
                    onChange = {handleChange}
                    classes = {{root: classes.tabsRoot, indicator: classes.tabsIndicator}}
                >
                    <Tab
                        disableRipple
                        classes = {{root: classes.tabRoot, selected: classes.tabSelected}}
                        label = 'Upcoming'
                    />
                    <Tab
                        disableRipple
                        classes = {{root: classes.tabRoot, selected: classes.tabSelected}}
                        label = 'Completed'
                    />
                    <Tab
                        disableRipple
                        classes = {{root: classes.tabRoot, selected: classes.tabSelected}}
                        label = 'Cancelled'
                    />

                </Tabs>
                <div>
                    {value === 0 && <TabContainer> <BookingCompleted />
                    </TabContainer>}
                </div>
                <div>
                    {value === 1 && <TabContainer> Completed
                    </TabContainer>}
                </div>
                <div>
                    {value === 2 && <TabContainer> Cancelled
                    </TabContainer>}
                </div>
            </Paper>
        </Fragment>
    );
};

export default compose<IBookingProfile, any>(
    withStyles(styles)
)(BookingProfile);
