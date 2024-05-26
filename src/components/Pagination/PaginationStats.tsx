import React from "react";

export interface IPaginationStatsProps {
  start: number;
  end: number;
  total: number;
}
const PaginationStats: React.FC<IPaginationStatsProps> = ({
  start,
  end,
  total,
}) => {
  return (
    <div>
      <p>
        Showing {start} to {end} of {total} total items
      </p>
    </div>
  );
};

export default PaginationStats;
