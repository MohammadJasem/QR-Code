export const spaces = {
    AdminSpace:{
        baseName: '/admin',
        links: [
            {
                title: "Teachers Management",
                dropDown: true,
                subdir: 'teachers',
                sublinks:[
                    {
                        title: 'All Teachers',
                        endpoint: 'view',
                    },
                    {
                        title: 'Add Teacher',
                        endpoint: 'add',
                    },
                ],
            },
            {
                title: "Students Management",
                dropDown: true,
                subdir: 'students',
                sublinks:[
                    {
                        title: 'All Student',
                        endpoint: 'view',
                    },
                    {
                        title: 'Add New Student',
                        endpoint: 'add',
                    },
                ],
            },
            {
                title: "Subjects",
                dropDown: true,
                subdir: 'subjects',
                sublinks:[
                    {
                        title: 'All Subjects',
                        endpoint: 'view',
                    },
                    {
                        title: 'Add Subject',
                        endpoint: 'add',
                    },
                ],
            },
            {
                title: "groups",
                dropDown: true,
                subdir: 'groups',
                sublinks:[
                    {
                        title: 'All groups',
                        endpoint: 'view',
                    },
                    {
                        title: 'Add New Group',
                        endpoint: 'add',
                    },
                ],
            },
            {
                title: "settings"
            },
        ]
    },
    TeacherSpace:{
        baseName: '/teacher',
        links: [
            {
                title: "News Section",
                dropDown: true,
                subdir: 'News',
                sublinks:[
                    {
                        title: 'All News',
                        endpoint: 'view',
                    },
                    {
                        title: 'Add News',
                        endpoint: 'add',
                    },
                ],
            },
            {
                title: "Schedules Management",
                dropDown: true,
                subdir: 'schedules',
                sublinks:[
                    {
                        title: 'View Schedules',
                        endpoint: 'view',
                    },
                    {
                        title: 'Create Schedule',
                        endpoint: 'add',
                    },
                ],
            },
            {
                title: "settings"
            },
        ]
    }
};