export interface ServerTimeProps {
  error?: string;
}

export const ServerTime = ({ error }: ServerTimeProps) => {
  const currentTime = new Date().toISOString();

  return (
    <>
      {error ? (
        <div>An error occurred: {error}</div>
      ) : (
        <>
          <strong>Current server time:</strong> <span>{currentTime}</span>
        </>
      )}
    </>
  );
};
