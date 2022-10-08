# Ticket Breakdown

We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**

Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".

You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

### Ticket No 1

- Create the DB Schema for entities Facilities, Agents, Shifts Tables.
- Create CRUD functions in the respective repositories for easier accessibility to services.
- Note: Relational DB will be preferred as compared to NoSQL DBs as there are relations between those tables.
- Add the basic test cases to validate the functions in repositories.
- _Estimate:_ 2H.

### Ticket No 2

- Create an API function `getShiftsByFacility()` to return all the shifts along with the agent metadata where the input is Facilities ID and pagination should be supported.
- API FORMAT: `GET /shifts/<facilityId>?pageNo=1,limit=10`
- Include all the necessary validations and checks for the inputs.
- If no input is given in pageNo and limit, default will _pageNo_:1 & _limit_:10
- Throw error if invalid facility ID is provided.
- Limit shouldn't be greater than _50_ (for greater performance).
- Include all the test cases for following scenerio
  - Valid ID -> should return array of shifts.
  - Invalid ID -> should throw error.
  - Page size greater - should return empty array.
  - Throw error if limit doesn't falls in the range (1-50)
  - Throw error if page no. <= 1
- Note: Check for cost of the query, and include all the necessary indexes in DB if required.
- _Estimate:_ 6H.

### Ticket No 3

- Create an API function `generateReport()` to generate PDF Report for the list of shifts.
- API FORMAT: `POST /generateShiftsReport/ -d { shifts: \[shiftIDS\] }`
- Include all the necessary validations and checks for the inputs.
- API should generate the PDF report and the file should be uploaded to S3 bucket with expiration date (30 days), and API should return the S3 URL.
- The name of the file should be hash of all the shifts combined.
- The function should generate the hash for all the shifts combined and then, check in the S3 bucket to avoid the duplicate generation of the files.
- Necessary Checks
  - Throw error if input shifts length is empty;
  - Shifts array length should be less than _50_ (for better performance)
  - Valid shift IDs.
- Include all the test cases for following scenerio
  - Valid IDs -> generate report
  - Throw error if shift array is empty or length is greater than _50_.
- Note: Check for cost of the query, and include all the necessary indexes in DB if required.
- _Estimate:_ 8H.
