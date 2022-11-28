export const ErrorField = (
  errorMap: { key: string; value: string } | undefined
) => {
  if (!errorMap) return null;
  return (
    <div className="text-red-700">{errorMap.value}</div>
  );
};
