import React from "react";

import { render, prettyDOM, cleanup, fireEvent } from "@testing-library/react";
import { screen } from "@testing-library/dom";

import Form from "components/Appointment/Form";

afterEach(cleanup);

describe("Form", () => {
  const interviewers = [
    {
      id: 1,
      student: "Sylvia Palmer",
      avatar: "https://i.imgur.com/LpaY82x.png"
    }
  ];

  it("renders without student name if not provided", () => {
    const { getByPlaceholderText } = render(<Form interviewers={interviewers}/>);
    expect(getByPlaceholderText("Enter Student Name")).toHaveValue("");
  });

  it("renders with initial student name", () => {
    const { getByTestId } = render(<Form interviewers={interviewers} student="Lydia Miller-Jones" />)
    expect(getByTestId("student-name-input")).toHaveValue("Lydia Miller-Jones")
  });

  it("validates that the student name is not blank", () => {
    const onSave = jest.fn();
    const { queryByText, getByText} = render(<Form interviewers={interviewers} student="" onSave={onSave} interviewer={1}/>)

    const button = getByText("Save")
    fireEvent.click(button);

    /* validation is shown */
    expect(getByText(/Student name cannot be blank/i)).toBeInTheDocument();
  
    /* onSave is not called */
    expect(onSave).not.toHaveBeenCalled();
  });
  
  it("validates that the interviewer cannot be null", () => {
    const onSave = jest.fn();
    const { queryByText, getByText} = render(<Form interviewers={interviewers} student="Lydia Miller-Jones" onSave={onSave}/>)
    
    const button = getByText("Save")
    fireEvent.click(button);
    
    expect(getByText(/Please select an interviewer/i)).toBeInTheDocument();
    expect(onSave).not.toHaveBeenCalled();
  });

  it("can successfully save after trying to submit an empty student name", () => {
    const onSave = jest.fn();

    const { getByText, getByPlaceholderText, queryByText } = render(
      <Form interviewers={interviewers} onSave={onSave} student={""} interviewer={1}/>
    );
  
    //click with no student entered
    fireEvent.click(getByText("Save"));
  
    expect(getByText(/student name cannot be blank/i)).toBeInTheDocument();
    expect(onSave).not.toHaveBeenCalled();
  
    fireEvent.change(getByPlaceholderText("Enter Student Name"), {
      target: { value: "Lydia Miller-Jones" }
    });
  
    //click with student entered
    fireEvent.click(getByText("Save"));
  
    expect(queryByText(/student name cannot be blank/i)).toBeNull();
  
    expect(onSave).toHaveBeenCalledTimes(1);
    expect(onSave).toHaveBeenCalledWith("Lydia Miller-Jones", 1);
  });

  it("calls onCancel and resets the input field", () => {
    const onCancel = jest.fn();
    const { getByText, getByPlaceholderText, queryByText } = render(
      <Form
        interviewers={interviewers}
        name="Lydia Mill-Jones"
        interviewer={1}
        onSave={jest.fn()}
        onCancel={onCancel}
      />
    );
  
    //save current data
    fireEvent.click(getByText("Save"));
  
    //update data
    fireEvent.change(getByPlaceholderText("Enter Student Name"), {
      target: { value: "Lydia Miller-Jones" }
    });
  
    //cancel change
    fireEvent.click(getByText("Cancel"));
  
    expect(queryByText(/student name cannot be blank/i)).toBeNull();
    expect(getByPlaceholderText("Enter Student Name")).toHaveValue("");
    expect(onCancel).toHaveBeenCalledTimes(1);
  });
});