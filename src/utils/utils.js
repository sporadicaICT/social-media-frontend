/**
 * Clean one-liner for async await with error handling. Generally used for fetch to ensure that response is valid. Still returns same promise data as awaited
 */
export async function errorHandled(promise) {
  try {
    const someResult = await promise;
    if (someResult instanceof Response) {
      // Do checks for fetch
      if (!someResult.ok) throw new Error(someResult.statusText);
    }
    return [someResult, null];
  } catch (error) {
    return [null, error];
  }
}
