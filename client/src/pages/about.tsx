import { useState } from "react";
import { animated, useSpring } from "@react-spring/web";
import { useDrag } from "react-use-gesture";
import clsx from "clsx";

export const About = () => {
  const [dragging, setDragging] = useState(false);
  const [style, api] = useSpring(() => ({
    x: 0,
    y: 0,
    scale: 1,
    backgroundColor: "lime",
  }));

  const bind = useDrag(({ down, movement: [mx, my] }) => {
    if (down !== dragging) {
      setDragging(down);
    }
    api.start({
      x: down ? mx : 0,
      y: down ? my : 0,
      scale: down ? 1.2 : 1,
      backgroundColor: down ? "hotpink" : "lime",
    });
  });

  return (
    <div className="pt-4">
      <h1 className="text-2xl font-bold">About</h1>
      <p className="mb-4">
        Our designer did not include this page 🤷, so here is something to play
        with
      </p>
      <animated.div
        {...bind()}
        className={clsx("inline-block p-4 select-none font-bold rounded-lg", {
          "cursor-grabbing": dragging,
          "cursor-grab": !dragging,
        })}
        style={style}
      >
        Drag me!
      </animated.div>
    </div>
  );
};
