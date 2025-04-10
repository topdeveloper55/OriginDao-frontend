import { SvgIcon, Link } from "@material-ui/core";
import { ReactComponent as GitHub } from "../../assets/icons/github.svg";
import { ReactComponent as Medium } from "../../assets/icons/medium.svg";
import { ReactComponent as Twitter } from "../../assets/icons/twitter.svg";
import { ReactComponent as Discord } from "../../assets/icons/discord.svg";
import { ReactComponent as Telegram } from "../../assets/icons/telegram.svg";

export default function Social() {
  return (
    <div className="social-row">
      <Link href="#">
        <SvgIcon color="primary" component={GitHub} />
      </Link>

      <Link href="#">
        <SvgIcon color="primary" component={Telegram} />
      </Link>

      <Link href="#">
        <SvgIcon color="primary" component={Medium} />
      </Link>

      <Link href="#">
        <SvgIcon color="primary" component={Twitter} />
      </Link>

      <Link href="#">
        <SvgIcon color="primary" component={Discord} />
      </Link>
    </div>
  );
}
