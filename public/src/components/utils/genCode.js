export const genCode = async function () {
  const response = await fetch('/code');
  const code = await response.text();
  return code;
};
