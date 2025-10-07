// The encoding of the data send by the API need can be wrong so we need correct the encoding format

export default function decodeHtmlEntities(str) {
  const txt = document.createElement("textarea");
  txt.innerHTML = str;
  return txt.value;
}