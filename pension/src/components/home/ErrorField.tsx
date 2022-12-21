//ErrorField component to display error to the user.
export const ErrorField = (
  errorMap: { key: string; value: string } | undefined
) => {
  if (!errorMap) return null;
  return (
    <div
      data-test-id-error={errorMap.key}
      className="absolute left-1/2 -translate-x-1/2 text-sm text-red-700"
    >
      {errorMap.value}
    </div>
  );
};
