const Error = ({ children }) => {
  return (
    <div className="alert alert-danger text-center m-2" role="alert">
      {children}
    </div>
  );
};

export default Error;
