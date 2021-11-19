import { clamp } from "lodash";
import { FC } from "react";
import CountUp from "react-countup";
import { animated, useSpring } from "react-spring";
import { useMarketCaps } from "../../api";
import { WidgetBackground, WidgetTitle } from "../WidgetBits";

type ProgressBarProps = { progress: number };

const ProgressBar: FC<ProgressBarProps> = ({ progress }) => {
  const { width } = useSpring({
    to: { width: clamp(progress * 100, 100) },
    from: { width: 0 },
  });

  return (
    <div className="relative">
      <div className="w-full h-2 rounded-full bg-blue-dusk"></div>
      <animated.div
        className="absolute top-0 h-2 rounded-full bg-blue-spindle"
        style={{ width: width.to((width) => `${width}%`) }}
      ></animated.div>
    </div>
  );
};

type RowProps = {
  icon: string;
  title: string;
  progress: number;
};

const Row: FC<RowProps> = ({ icon, title, progress }) => {
  return (
    <div className="flex flex-row items-start gap-x-4">
      <img className="" src={icon} alt="" />
      <div className="w-full flex flex-col justify-between">
        <ProgressBar progress={progress} />
        <div
          className="flex flex-row justify-between"
          style={{ paddingTop: "0.1875rem" }}
        >
          <p className="font-inter text-white text-lg">{title}</p>
          <p className="font-roboto text-white text-lg">
            <CountUp
              decimals={2}
              duration={0.8}
              separator=","
              end={progress * 100}
              preserveValue={true}
              suffix={"%"}
            />
          </p>
        </div>
      </div>
    </div>
  );
};

const Flippenings: FC = () => {
  const marketCaps = useMarketCaps();

  const btcProgress =
    marketCaps === undefined
      ? 0
      : marketCaps.ethMarketCap / marketCaps.btcMarketCap;

  const goldProgress =
    marketCaps === undefined
      ? 0
      : marketCaps.ethMarketCap / marketCaps.goldMarketCap;

  const usdProgress =
    marketCaps === undefined
      ? 0
      : marketCaps.ethMarketCap / marketCaps.usdM3MarketCap;

  return (
    <WidgetBackground>
      <WidgetTitle title="flippenings" />
      <div className="flex flex-col gap-y-4 mt-4">
        <Row title="bitcoin" icon="/btc-styled.svg" progress={btcProgress} />
        <Row title="gold" icon="/gold-styled.svg" progress={goldProgress} />
        <Row title="usd" icon="/usd-styled.svg" progress={usdProgress} />
      </div>
    </WidgetBackground>
  );
};

export default Flippenings;
