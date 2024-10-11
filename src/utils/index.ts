function isValidBase64(str: string) {
  // Base64 string is consist of the characters: A-Z, a-z, 0-9, +, /
  // at most two "=" characters in the end
  const base64Regex = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;

  return base64Regex.test(str) && str.length % 4 === 0;
}

function isLocalStorageValueValid(input: string) {
  if (input.trim().startsWith('{')) {
    try {
      const parsed = JSON.parse(input);

      // check the parsing result is an object
      if (typeof parsed === 'object' && parsed !== null) {
        return true;
      }
    } catch (err) {
      return false;
    }

    return false;
  }

  return true;
}

export {
  isValidBase64,
  isLocalStorageValueValid,
};
