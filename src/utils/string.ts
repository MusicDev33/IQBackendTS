export const subjectNameToURL = (subjectText: string): string => {
  let urlText = ""
  const specialChars = "!@#$%^&*()>< '"

  for (let i = 0; i < subjectText.length; i++) {
    if (specialChars.indexOf(subjectText[i]) > -1) {
      urlText += "-"
    } else if (subjectText[i] == "?") {

    } else {
      urlText += subjectText[i]
    }
  }
  return urlText
}

export const nameToURL = (subjectText: string): string => {
  let urlText = ""
  const specialChars = "!@#$%^&*()>< '"

  for (let i = 0; i < subjectText.length; i++) {
    if (specialChars.indexOf(subjectText[i]) > -1) {
      urlText += "-"
    } else if (subjectText[i] == "?") {

    } else {
      urlText += subjectText[i]
    }
  }
  return urlText
}

export const urlToName = (url: string): string => {
  let nameText = '';
  const specialChars = '!@#$%^&*()>< \'';

  for (let i = 0; i < url.length; i++) {
    if (url[i] === '-') {
      nameText += ' ';
    } else if (specialChars.indexOf(url[i]) > -1) {
      nameText += ''; // Basically do nothing.
    } else {
      nameText += url[i];
    }
  }
  return nameText;
}
