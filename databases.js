// This file contains the databases and SQL types used in the game.
// Each database has a name and a list of tables, where each table has a name and a list of columns.
// The SQL types are stored in a separate array for easy access when generating prompts.
//This is used accross easy.js, medium.js and hard.js to generate prompts and check answers.
const databases = [
    {
        name: "School",
        tables: [
            { name: "Students", columns: [{ name: "Id", type: "INT" }, { name: "Name", type: "VARCHAR(255)" }, { name: "Gender", type: "VARCHAR(50)" }, { name: "EnrolledDate", type: "DATE" }, { name: "IsActive", type: "BOOLEAN" }] },
            { name: "Teachers", columns: [{ name: "Id", type: "INT" }, { name: "Name", type: "VARCHAR(255)" }, { name: "Position", type: "VARCHAR(255)" }, { name: "StartDate", type: "DATE" }, { name: "IsFullTime", type: "BOOLEAN" }] },
            { name: "Subjects", columns: [{ name: "Id", type: "INT" }, { name: "Name", type: "VARCHAR(255)" }, { name: "Examboard", type: "VARCHAR(255)" }, { name: "CreditHours", type: "SMALLINT" }] },
        ]
    },
    {
        name: "Company",
        tables: [
            { name: "Employees", columns: [{ name: "Id", type: "INT" }, { name: "Name", type: "VARCHAR(255)" }, { name: "Department", type: "VARCHAR(255)" }, { name: "Salary", type: "DECIMAL(10,2)" }, { name: "IsRemote", type: "BOOLEAN" }] },
            { name: "Departments", columns: [{ name: "Id", type: "INT" }, { name: "Name", type: "VARCHAR(255)" }, { name: "Location", type: "VARCHAR(255)" }, { name: "Budget", type: "DECIMAL(15,2)" }, { name: "EmployeeCount", type: "SMALLINT" }] }
        ]
    },
    {
        name: "Hospital",
        tables: [
            { name: "Patients", columns: [{ name: "PatientId", type: "INT" }, { name: "FullName", type: "VARCHAR(255)" }, { name: "Age", type: "INT" }, { name: "BloodType", type: "CHAR(3)" }, { name: "AdmittedDate", type: "DATE" }, { name: "IsDischarge", type: "BOOLEAN" }] },
            { name: "Doctors", columns: [{ name: "DoctorId", type: "INT" }, { name: "FullName", type: "VARCHAR(255)" }, { name: "Specialty", type: "VARCHAR(255)" }, { name: "YearsExperience", type: "SMALLINT" }, { name: "IsOnCall", type: "BOOLEAN" }] },
            { name: "Appointments", columns: [{ name: "AppointmentId", type: "INT" }, { name: "PatientId", type: "INT" }, { name: "DoctorId", type: "INT" }, { name: "Ward", type: "VARCHAR(100)" }, { name: "AppointmentDate", type: "DATE" }] },
            { name: "Medications", columns: [{ name: "MedicationId", type: "INT" }, { name: "Name", type: "VARCHAR(255)" }, { name: "Dosage", type: "VARCHAR(100)" }, { name: "Stock", type: "INT" }, { name: "UnitCost", type: "DECIMAL(6,2)" }, { name: "RequiresPrescription", type: "BOOLEAN" }] }
        ]
    },
    {
        name: "Library",
        tables: [
            { name: "Books", columns: [{ name: "BookId", type: "INT" }, { name: "Title", type: "VARCHAR(255)" }, { name: "Genre", type: "VARCHAR(100)" }, { name: "PageCount", type: "SMALLINT" }, { name: "IsAvailable", type: "BOOLEAN" }] },
            { name: "Authors", columns: [{ name: "AuthorId", type: "INT" }, { name: "Name", type: "VARCHAR(255)" }, { name: "Nationality", type: "VARCHAR(100)" }, { name: "BirthDate", type: "DATE" }] },
            { name: "Members", columns: [{ name: "MemberId", type: "INT" }, { name: "Name", type: "VARCHAR(255)" }, { name: "LoansCount", type: "SMALLINT" }, { name: "JoinDate", type: "DATE" }, { name: "IsActive", type: "BOOLEAN" }] },
            { name: "Loans", columns: [{ name: "LoanId", type: "INT" }, { name: "MemberId", type: "INT" }, { name: "BookId", type: "INT" }, { name: "DaysOverdue", type: "SMALLINT" }, { name: "LoanDate", type: "DATE" }, { name: "IsReturned", type: "BOOLEAN" }] }
        ]
    },
    {
        name: "Ecommerce",
        tables: [
            { name: "Customers", columns: [{ name: "CustomerId", type: "INT" }, { name: "Username", type: "VARCHAR(100)" }, { name: "Email", type: "VARCHAR(255)" }, { name: "LoyaltyPoints", type: "INT" }, { name: "JoinDate", type: "DATE" }, { name: "IsVerified", type: "BOOLEAN" }] },
            { name: "Products", columns: [{ name: "ProductId", type: "INT" }, { name: "Name", type: "VARCHAR(255)" }, { name: "Category", type: "VARCHAR(100)" }, { name: "Price", type: "DECIMAL(8,2)" }, { name: "Stock", type: "INT" }, { name: "IsListed", type: "BOOLEAN" }] },
            { name: "Orders", columns: [{ name: "OrderId", type: "INT" }, { name: "CustomerId", type: "INT" }, { name: "Status", type: "VARCHAR(50)" }, { name: "TotalAmount", type: "DECIMAL(10,2)" }, { name: "OrderDate", type: "DATE" }] },
            { name: "Reviews", columns: [{ name: "ReviewId", type: "INT" }, { name: "ProductId", type: "INT" }, { name: "Rating", type: "SMALLINT" }, { name: "Comment", type: "TEXT" }, { name: "ReviewDate", type: "DATE" }, { name: "IsVerified", type: "BOOLEAN" }] }
        ]
    },
    {
        name: "Police",
        tables: [
            { name: "Officers", columns: [{ name: "BadgeNumber", type: "INT" }, { name: "Name", type: "VARCHAR(255)" }, { name: "Rank", type: "VARCHAR(100)" }, { name: "YearsService", type: "SMALLINT" }, { name: "IsActive", type: "BOOLEAN" }] },
            { name: "Incidents", columns: [{ name: "IncidentId", type: "INT" }, { name: "Type", type: "VARCHAR(100)" }, { name: "Location", type: "VARCHAR(255)" }, { name: "Severity", type: "SMALLINT" }, { name: "IncidentDate", type: "DATE" }, { name: "IsResolved", type: "BOOLEAN" }] },
            { name: "Suspects", columns: [{ name: "SuspectId", type: "INT" }, { name: "Name", type: "VARCHAR(255)" }, { name: "Age", type: "SMALLINT" }, { name: "Status", type: "VARCHAR(100)" }, { name: "IsArrested", type: "BOOLEAN" }] },
            { name: "Evidence", columns: [{ name: "EvidenceId", type: "INT" }, { name: "IncidentId", type: "INT" }, { name: "Description", type: "TEXT" }, { name: "ItemCount", type: "SMALLINT" }, { name: "CollectedDate", type: "DATE" }] }
        ]
    },
    {
        name: "Airport",
        tables: [
            { name: "Flights", columns: [{ name: "FlightId", type: "INT" }, { name: "Destination", type: "VARCHAR(255)" }, { name: "Gate", type: "CHAR(5)" }, { name: "SeatsAvailable", type: "SMALLINT" }, { name: "DepartureDate", type: "DATE" }, { name: "IsDelayed", type: "BOOLEAN" }] },
            { name: "Passengers", columns: [{ name: "PassengerId", type: "INT" }, { name: "Name", type: "VARCHAR(255)" }, { name: "Nationality", type: "VARCHAR(100)" }, { name: "BaggageWeight", type: "DECIMAL(5,2)" }, { name: "HasCheckedIn", type: "BOOLEAN" }] },
            { name: "Airlines", columns: [{ name: "AirlineId", type: "INT" }, { name: "Name", type: "VARCHAR(255)" }, { name: "Country", type: "VARCHAR(100)" }, { name: "FleetSize", type: "SMALLINT" }, { name: "IsOperational", type: "BOOLEAN" }] },
            { name: "Staff", columns: [{ name: "StaffId", type: "INT" }, { name: "Name", type: "VARCHAR(255)" }, { name: "Role", type: "VARCHAR(100)" }, { name: "Terminal", type: "CHAR(5)" }, { name: "ShiftStart", type: "DATE" }] }
        ]
    },
    {
        name: "Restaurant",
        tables: [
            { name: "MenuItems", columns: [{ name: "ItemId", type: "INT" }, { name: "Name", type: "VARCHAR(255)" }, { name: "Category", type: "VARCHAR(100)" }, { name: "Price", type: "DECIMAL(6,2)" }, { name: "Calories", type: "SMALLINT" }, { name: "IsVegetarian", type: "BOOLEAN" }] },
            { name: "Staff", columns: [{ name: "StaffId", type: "INT" }, { name: "Name", type: "VARCHAR(255)" }, { name: "Role", type: "VARCHAR(100)" }, { name: "HoursWorked", type: "DECIMAL(5,2)" }, { name: "IsFullTime", type: "BOOLEAN" }] },
            { name: "Reservations", columns: [{ name: "ReservationId", type: "INT" }, { name: "GuestName", type: "VARCHAR(255)" }, { name: "TableNumber", type: "SMALLINT" }, { name: "PartySize", type: "SMALLINT" }, { name: "ReservationDate", type: "DATE" }, { name: "IsConfirmed", type: "BOOLEAN" }] },
            { name: "Suppliers", columns: [{ name: "SupplierId", type: "INT" }, { name: "Name", type: "VARCHAR(255)" }, { name: "Category", type: "VARCHAR(100)" }, { name: "DeliveryDays", type: "SMALLINT" }, { name: "ContractStart", type: "DATE" }, { name: "IsActive", type: "BOOLEAN" }] }
        ]
    },
    {
        name: "VideoGameStore",
        tables: [
            { name: "Games", columns: [{ name: "GameId", type: "INT" }, { name: "Title", type: "VARCHAR(255)" }, { name: "Genre", type: "VARCHAR(100)" }, { name: "Price", type: "DECIMAL(6,2)" }, { name: "CopiesInStock", type: "SMALLINT" }, { name: "ReleaseDate", type: "DATE" }, { name: "IsDigital", type: "BOOLEAN" }] },
            { name: "Consoles", columns: [{ name: "ConsoleId", type: "INT" }, { name: "Brand", type: "VARCHAR(100)" }, { name: "Model", type: "VARCHAR(100)" }, { name: "UnitsInStock", type: "SMALLINT" }, { name: "Price", type: "DECIMAL(8,2)" }, { name: "IsDiscontinued", type: "BOOLEAN" }] },
            { name: "Customers", columns: [{ name: "CustomerId", type: "INT" }, { name: "Username", type: "VARCHAR(100)" }, { name: "RewardPoints", type: "INT" }, { name: "JoinDate", type: "DATE" }, { name: "IsSubscribed", type: "BOOLEAN" }] },
            { name: "TradeIns", columns: [{ name: "TradeInId", type: "INT" }, { name: "CustomerId", type: "INT" }, { name: "GameId", type: "INT" }, { name: "OfferAmount", type: "DECIMAL(6,2)" }, { name: "TradeDate", type: "DATE" }, { name: "IsAccepted", type: "BOOLEAN" }] }
        ]
    },
    {
        name: "GymChain",
        tables: [
            { name: "Members", columns: [{ name: "MemberId", type: "INT" }, { name: "Name", type: "VARCHAR(255)" }, { name: "MembershipTier", type: "VARCHAR(50)" }, { name: "MonthsActive", type: "SMALLINT" }, { name: "JoinDate", type: "DATE" }, { name: "IsFrozen", type: "BOOLEAN" }] },
            { name: "Trainers", columns: [{ name: "TrainerId", type: "INT" }, { name: "Name", type: "VARCHAR(255)" }, { name: "Specialty", type: "VARCHAR(100)" }, { name: "SessionRate", type: "DECIMAL(6,2)" }, { name: "IsAvailable", type: "BOOLEAN" }] },
            { name: "Equipment", columns: [{ name: "EquipmentId", type: "INT" }, { name: "Name", type: "VARCHAR(255)" }, { name: "Category", type: "VARCHAR(100)" }, { name: "Quantity", type: "SMALLINT" }, { name: "PurchaseDate", type: "DATE" }, { name: "IsWorking", type: "BOOLEAN" }] },
            { name: "Classes", columns: [{ name: "ClassId", type: "INT" }, { name: "Name", type: "VARCHAR(255)" }, { name: "TrainerId", type: "INT" }, { name: "Capacity", type: "SMALLINT" }, { name: "Duration", type: "SMALLINT" }, { name: "ClassDate", type: "DATE" }, { name: "IsCancelled", type: "BOOLEAN" }] }
        ]
    }
];