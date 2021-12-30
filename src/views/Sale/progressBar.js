const ProgressBar = props => {
  const { completed, text } = props;

  const containerStyles = {
    height: 20,
    width: "100%",
    backgroundColor: "#e0e0de",
    borderRadius: 50,
    margin: 0,
    padding: "auto",
    marginTop: "5px"
  };

  const fillerStyles = {
    height: "100%",
    width: `${completed}%`,
    backgroundColor: "rgb(85 150 40)",
    borderRadius: "inherit",
    textAlign: "right",
    alignItem: "center",
  };

  const labelStyles = {
    padding: 5,
    color: "white",
    fontWeight: "bold",
    position: "relative",
    top: "3px"
  };

  return (
    <div style={containerStyles}>
      <div style={fillerStyles}>
        <span style={labelStyles}>{text}</span>
      </div>
    </div>
  );
};

export default ProgressBar;
