export default function validateInfo(input) {
    let errors = {};
  
    if (!input.title) {
      errors.title = 'Title is required';
    } else if (input.title.length > 100) {
      errors.title = 'Title is too long';
    }
    if (input.description.length > 3000) {
      errors.description = 'Description is too long';
    }
  
    if (!input.maxAttendee) {
      errors.maxAttendee = 'Number of Attendee is required';
    } else if (parseInt(input.maxAttendee, 10) <= 0) {
      errors.maxAttendee = 'Number of Attendee must have more than 0';
    }
    
    if (!input.cost) {
        errors.cost = 'Cost is required';
    } else if (parseInt(input.cost, 10) <= 0) {
      errors.cost = 'Cost must have more than 0';
    }
    return errors;
}