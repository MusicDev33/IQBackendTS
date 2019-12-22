export function validateRegister(body: any): boolean {
  if (body.handle.indexOf(' ') > -1 || !body.handle.match(/^[a-z0-9_]+$/g)) {
    return false;
  }

  if (!body.firstName.match(/^[a-zA-Z0-9_\-']+$/g) || !body.lastName.match(/^[a-zA-Z0-9_\-']+$/g)) {
    return false;
  }

  if (body.phoneNumber && !body.phoneNumber.match(/^[0-9\-]+$/g)) {
    return false;
  }

  if (body.password.length < 8) {
    return false;
  }

  return true;
}
