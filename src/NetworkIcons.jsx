const NetworkIcons = ({ networks }) => {
  return (
    <div className="absolute bottom-2 right-2 flex mr-2 ">
      {networks.map((network, index) => (
        <div
          key={index}
          className={`network-icon ${
            network.isActive ? "bg-blue-500 order-last" : " bg-blue-700"
          }`}
        >
          <img
            src={`/icons/${network.name}.svg`}
            alt={network.name}
            className={network.isActive ? "opacity-100" : "opacity-20"}
          />
        </div>
      ))}
    </div>
  );
};

export default NetworkIcons;
