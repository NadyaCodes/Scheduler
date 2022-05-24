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

    /* 1. validation is shown */
    expect(getByText(/Student name cannot be blank/i)).toBeInTheDocument();
  
    /* 2. onSave is not called */
    expect(onSave).not.toHaveBeenCalled();
  });
  
  it("validates that the interviewer cannot be null", () => {
    const onSave = jest.fn();
    const { queryByText, getByText} = render(<Form interviewers={interviewers} student="Lydia Miller-Jones" onSave={onSave}/>)
    
    const button = getByText("Save")
    fireEvent.click(button);
    
    /* 3. validation is shown */
    expect(getByText(/Please select an interviewer/i)).toBeInTheDocument();
  
    /* 4. onSave is not called */
    expect(onSave).not.toHaveBeenCalled();
  });
  
  it("calls onSave function when the name is defined", () => {
    const onSave = jest.fn();
    const { queryByText, getByText} = render(<Form interviewers={interviewers} student="Lydia Miller-Jones" onSave={onSave} interviewer={1}/>)
    /* 5. validation is not shown */
    expect(queryByText(/Student name cannot be blank/i)).toBeNull();
    expect(queryByText(/Please select an interviewer/i)).toBeNull();
  
    /* 6. onSave is called once*/
    const button = getByText("Save")
    // console.log(prettyDOM(button))
    //find DOM element that holds the interviewer avatars
    //simulate click


    fireEvent.click(button);
    expect(onSave).toHaveBeenCalledTimes(1);
  
    /* 7. onSave is called with the correct arguments */
    expect(onSave).toHaveBeenCalledWith("Lydia Miller-Jones", 1);
  });
});