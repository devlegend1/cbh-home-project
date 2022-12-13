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

## Assumptions (agreed by contract with customer)

1.  _saveAgent_ - A function that saves _**Agent**_ data to database. Currently it receives all the fields for Agent (except internal database id, auto-generated)
    - eg.: saveAgent(name, surname, email, facility (fk)) → _**saveAgent('Carlos', 'Soares', 'carlos.soares@gmail.com', 1)**_
2.  saveFacility - A function that saves **Facility** data to database. Currently it receives all the fields for Facility (except internal database id, auto-generated)
3.  Data is saved in the database in the Facilities, Agents, and Shifts tables
4.  A function getShiftsByFacility is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
5.  A function generateReport is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.
6.  As the new field (custom_id) is OPTIONAL, if it is not present on DB, the database id must be returned with parentheses to differentiate.

---

## Task 1 - New column custom_id on Agent table

**Summary**: To create new column custom_id on Agent table.

**Details**:

- String
- Nullable
- Unique

**Acceptance criteria**: New column must exists in all DB instances.

**Estimation**: 2hrs

---

## Task - Update function saveAgent

**Summary**: To Update function saveAgent getting a new optional parameter called _custom_id_.

**Details**:

- Case this new parameter is passed:
  - Check if this object is a valid String.
    - Yes: Save it on new column _**Agent.custom_id**_
    - No: Return Error validation

**Acceptance criteria**:

- If nothing is passed to new parameter, the function must work as usual (save data to Agent, but _custom_id_ = _null_)
- If a valid String is passed thru new parameter, it all data must be saved properly including this new column _custom_id_.
- If a invalid String is passed thru new parameter, the function must return an error.

**Estimation**: 4hrs

---

## Task - Update function getShiftsbyFacility

**Summary**: To Update function getShiftsbyFacility to include _custom_id_ on the Agent metadata.

**Details**: Include new column _custom_id_ to Agent metadata return.

**Acceptance criteria**:

- The metadata returned from getShiftsbyFacility must return _custom_id_ to Agent Metadata.

**Estimation**: 3hrs

---

## Task - Update function generateReport

**Summary**: To Update function generateReport to return _custom_id_ if it is present on metadata.

**Details**: Include new column _custom_id_ to PDF as Agent Id following the logic below:

- If _custom_id_ is not null, use it as Agent Id.
- If _custom_id_ is NULL, use internal database id (current behavior), by putting the value in parenthesis.

**Acceptance criteria**:

- If _custom_id_ is not null, it must be returned it as Agent Id.
- If _custom_id_ is NULL, internal database id (current behavior) must be returned in parenthesis.

**Estimation**: 2hrs
