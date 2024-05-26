import React, { PropsWithChildren } from "react";

interface IRenderProps extends PropsWithChildren {
  in: boolean;
}
const Render = (props: IRenderProps) => {
  if (props.in) return <>{props.children}</>;
  return <></>;
};

const Skeleton: React.FC<{ Component: React.FC; items: number }> = ({
  Component,
  items,
}) => {
  const elements: React.ReactNode[] = [];
  for (let i = 0; i < items; i++) {
    elements.push(<Component key={i} />);
  }
  return <>{elements.map((node) => node)}</>;
};

Render.Skeleton = Skeleton;
export default Render;
