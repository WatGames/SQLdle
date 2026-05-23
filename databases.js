// This file contains the databases and SQL types used in the game.
// Each database has a name and a list of tables, where each table has a name and a list of columns.
// The SQL types are stored in a separate array for easy access when generating prompts.
//This is used accross easy.js, medium.js and hard.js to generate prompts and check answers.
const databases = [
    {
        name: "School",
        tables: [
            { name: "Students", columns: [{name : "id", type: "INT"}, {name: "name", type: "VARCHAR(255)"}, {name: "Gender", type: "VARCHAR(50)"}]},
            { name: "Teachers", columns: [{name: "id", type: "INT"}, {name: "name", type: "VARCHAR(255)"}, {name: "Position", type: "VARCHAR(255)"}]},
            { name: "Subjects", columns: [{name: "id", type: "INT"}, {name: "name", type: "VARCHAR(255)"}, {name: "Examboard", type: "VARCHAR(255)"}]},
        ]
    },
    {
        name: "Company",
        tables: [
            { name: "Employees", columns: [{name: "id", type: "INT"}, {name: "name", type: "VARCHAR(255)"}, {name: "Department", type: "VARCHAR(255)"}]},
            { name: "Departments", columns: [{name: "id", type: "INT"}, {name: "name", type: "VARCHAR(255)"}, {name: "Location", type: "VARCHAR(255)"}]}
        ]

    }
];

const EasySQLTypes = ["SELECT", "DELETE", "UPDATE"];
const MediumSQLTypes = ["SELECT", "DELETE", "INSERT", "UPDATE", "CREATE", "ALTER", "DROP"];
const HardSQLTypes = ["SELECT", "DELETE", "INSERT", "UPDATE", "CREATE", "ALTER", "DROP"];