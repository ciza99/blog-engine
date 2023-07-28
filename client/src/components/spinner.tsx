import { animated, config, useSpring } from "@react-spring/web";

export const Spinner = () => {
  const style = useSpring({
    from: {
      rotate: 0,
    },
    to: {
      rotate: 360,
    },
    loop: true,
    config: config.slow,
  });

  return (
    <animated.div
      className="h-12 w-12 border-4 border-b-transparent border-l-transparent border-t-primary border-r-primary rounded-full"
      style={style}
    />
  );
};
