export const subjectNameToURL = (subjectText: string): string => {
  let urlText = ""
  const specialChars = "!@#$%^&*()>< '"

  for (let i = 0; i < subjectText.length; i++) {
    if (specialChars.indexOf(subjectText[i]) > -1){
      urlText += "-"
    }else if (subjectText[i] == "?"){

    }else{
      urlText += subjectText[i]
    }
  }
  return urlText
}
