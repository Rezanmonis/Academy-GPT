const DottedLoader = ({ size = 20, color = "#ffffff" }) => {
    return (
      <div className="flex items-center justify-center">
        <div
          className="flex space-x-1"
          style={{ height: size, alignItems: "center" }}
        >
          {[...Array(3)].map((_, i) => (
            <span
              key={i}
              className="animate-bounce"
              style={{
                width: size / 3,
                height: size / 3,
                backgroundColor: color,
                borderRadius: "50%",
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
        </div>
      </div>
    );
  };
  
  export default DottedLoader;