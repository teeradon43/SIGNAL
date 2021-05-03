export default function validateInfo(input) {
    let errors = {};
    errors.pass = 0;
    if (!input.name) {
      errors.name = 'Title is required';
    } else if (input.name.length > 100) {
      errors.name = 'Title is too long';
    }
    else{
      errors.pass += 1;
    }
    return errors;
}