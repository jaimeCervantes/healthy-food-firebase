export function getFinalString(chain: string, separtor: string) {
  const chainParts = chain.split(separtor);
  const positionFinalString = chainParts.length - 1;

  if (chainParts[positionFinalString] === "") {
    return chainParts[positionFinalString - 1];
  }

  return chainParts[positionFinalString];
}
