const GENERIC_ERROR = "Something went wrong while executing async task.";

export const handleError = (error: unknown) => {
  if (error instanceof Error) {
    throw new Error(`Error: ${error.message.replaceAll('"', "")}`);
  }
};

export async function executeAsync<T>(
  task: (...args: Array<any>) => Promise<T>
): Promise<T> {
  try {
    return await task();
  } catch (error) {
    handleError(error);
  }

  throw new Error(GENERIC_ERROR);
}
