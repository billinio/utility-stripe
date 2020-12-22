
/**
 * Return a string rep of JSON data for a textarea
 * 
 * @param data - JSON data to parse
 */
export function JsonToString(data: Dictionary): string {
  return (data && JSON.stringify(data, undefined, 2)) || "";
}
