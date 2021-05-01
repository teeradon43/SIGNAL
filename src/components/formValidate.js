export default function validateInfo(input) {
    let errors = {};
    errors.pass = 0;
  
    if (!input.title) {
      errors.title = 'Title is required';
    } else if (input.title.length > 100) {
      errors.title = 'Title is too long';
    }
    else{
      errors.pass += 1;
    }

    if (input.description.length > 3000) {
      errors.description = 'Description is too long';
    }
    else{
      errors.pass += 1;
    }
  
    if (!input.maxAttendee) {
      errors.maxAttendee = 'Number of Attendee is required';
    } else if (parseInt(input.maxAttendee) <= 0) {
      errors.maxAttendee = 'Number of Attendee must have more than 0';
    }
    else{
      errors.pass += 1;
    }
    
    if (!input.cost) {
        errors.cost = 'Cost is required';
    } else if (parseInt(input.cost) < 0) {
      errors.cost = 'Cost must not be negative';
    }
    else{
      errors.pass += 1;
    }

    return errors;
}