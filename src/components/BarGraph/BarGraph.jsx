function BarGraph() {
  // Random data for the graph
  const data = [
    16, 5, 12, 2, 19, 2, 18, 18, 2, 19, 12, 15, 7, 20, 7, 8, 14, 1, 11, 12, 7,
    20, 6, 7, 5, 2, 17, 20, 4, 6, 18, 20, 13, 10, 7, 5, 14, 18, 5, 13, 7, 7, 3,
    5, 18,
  ];

  console.log(data);
  return (
    <div className="flex items-end h-20 w-full gap-[2px] bg-white overflow-hidden">
      {data.map((value, index) => (
        <div
          key={index}
          className="flex-1 bg-[#e31c5f] rounded-sm"
          style={{
            height: `${value * 2.5}px`, // Scale bar height
          }}
        ></div>
      ))}
    </div>
  );
}

export default BarGraph;
