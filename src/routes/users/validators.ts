export function validateRegister(body: any): {success: boolean, msg: string} {
  if (body.handle.indexOf(' ') > -1 || !body.handle.match(/^[a-z0-9_]+$/g)) {
    return {success: false, msg: 'You have illegal characters in your handle! For some reason, we decided that uppercase letters are illegal.'};
  }

  if (body.handle.length > 20) {
    return {success: false, msg: 'Handle length is limited to 20 characters. Sorry.'};
  }

  if (!body.firstName.match(/^[a-zA-Z0-9_\-']+$/g) || !body.lastName.match(/^[a-zA-Z0-9_\-']+$/g)) {
    return {success: false, msg: 'Your name has illegal characters in it. If you think that\'s dumb, send some feedback and tell us what\'s up.'};
  }

  if (body.phoneNumber && !body.phoneNumber.match(/^[0-9\-]+$/g)) {
    return {success: false, msg: 'There\'s something funky with your phone number...'};
  }

  if (body.password.length < 8) {
    return {success: false, msg: 'Your password should be at least 8 characters.'};
  }

  return {success: true, msg: 'Cool!'};
}
