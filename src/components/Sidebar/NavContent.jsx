import { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import Social from "./Social";
import LandIcon from "@material-ui/icons/Landscape";
import externalUrls from "./externalUrls";
import { ReactComponent as StakeIcon } from "../../assets/icons/stake.svg";
import { ReactComponent as BondIcon } from "../../assets/icons/bond.svg";
import { ReactComponent as GlobeIcon } from "../../assets/icons/globe.svg";
import { ReactComponent as DashboardIcon } from "../../assets/icons/dashboard.svg";
import { ReactComponent as BuyIcon } from "../../assets/icons/globe.svg";
import { ReactComponent as SaleIcon } from "../../assets/icons/arrow-up.svg";
import { ReactComponent as Stake6Icon } from "../../assets/icons/wrap.svg";
import { ReactComponent as LendIcon } from "../../assets/icons/hamburger.svg";
// import { ReactComponent as LandIcon } from "../../assets/icons/info-fill.svg";
import logo from "./logo.png";
import buyLand from "./buyLand.png";
import { trim, shorten } from "../../helpers";
import { useAddress, useWeb3Context } from "src/hooks/web3Context";
import useBonds from "../../hooks/Bonds";
import { Paper, Link, Box, Typography, SvgIcon, Button } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import "./sidebar.scss";

function NavContent() {
  const [isActive] = useState();
  const address = useAddress();
  const { bonds } = useBonds();
  const { chainID } = useWeb3Context();
  const stakingRebase = useSelector(state => {
    return state.app.stakingRebase;
  });
  const stakingRebasePercentage = stakingRebase * 1200;

  const checkPage = useCallback((match, location, page) => {
    const currentPath = location.pathname.replace("/", "");
    if (currentPath.indexOf("dashboard") >= 0 && page === "dashboard") {
      return true;
    }
    if (currentPath.indexOf("stake") >= 0 && page === "stake") {
      return true;
    }
    if (currentPath.indexOf("wrap") >= 0 && page === "wrap") {
      return true;
    }
    if (currentPath.indexOf("calculator") >= 0 && page === "calculator") {
      return true;
    }
    if ((currentPath.indexOf("bonds") >= 0 || currentPath.indexOf("choose_bond") >= 0) && page === "bonds") {
      return true;
    }
    return false;
  }, []);

  return (
    <Paper className="dapp-sidebar">
      <Box className="dapp-sidebar-inner" display="flex" justifyContent="space-between" flexDirection="column">
        <div className="dapp-menu-top">
          <Box className="branding-header">
            <Link href="#" target="_blank">
              <img src={logo} alt="Logo" style={{ minWdth: "151px", minHeight: "98px", width: "151px" }} />
              <div className="wallet-link f-32">ORIGIN</div>
            </Link>
            {address && (
              <div className="wallet-link">
                <Link href={`https://ftmscan.com/address/${address}`} target="_blank">
                  {shorten(address)}
                </Link>
              </div>
            )}
          </Box>

          <div className="dapp-menu-links">
            <div className="dapp-nav" id="navbarNav">
              <Link
                component={NavLink}
                id="dash-nav"
                to="/sale"
                isActive={(match, location) => {
                  return checkPage(match, location, "sale");
                }}
                className={`button-dapp-menu ${isActive ? "active" : ""}`}
              >
                <Typography variant="h6">
                  <SvgIcon color="primary" component={SaleIcon} />
                  Community Sale
                </Typography>
              </Link>

              <Link
                component={NavLink}
                id="dash-nav"
                to="/lands"
                isActive={(match, location) => {
                  return checkPage(match, location, "sale");
                }}
                className={`button-dapp-menu ${isActive ? "active" : ""}`}
              >
                <Typography variant="h6">
                  {/* <img src={buyLand} alt="Logo" style={{ minWdth: "20px", minHeight: "20px", width: "20px", marginRight:"11px" }} /> */}
                  <SvgIcon color="primary" component={LandIcon} />
                  Buy Lands
                </Typography>
              </Link>

              <Typography className="submenu">My lands &nbsp;&nbsp;&nbsp;<span style={{fontSize: "12px"}}> Comming soon</span></Typography>
              <Typography className="submenu">Rewards &nbsp;&nbsp;&nbsp;<span style={{fontSize: "12px"}}> Comming soon</span></Typography>

              <Link
                component={NavLink}
                id="dash-nav"
                to="/sale"
                isActive={(match, location) => {
                  return checkPage(match, location, "dashboard");
                }}
                className="disable-link"
              >
                <Typography variant="h6">
                  <SvgIcon color="primary" component={DashboardIcon} />
                  Dashboard
                </Typography>
                <Typography variant="caption" style={{ marginLeft: "8px" }}>
                  Coming soon
                </Typography>
              </Link>

              <Link
                component={NavLink}
                id="dash-nav"
                to="/sale"
                isActive={(match, location) => {
                  return checkPage(match, location, "dashboard");
                }}
                className="disable-link"
              >
                <Typography variant="h6">
                  <SvgIcon color="primary" component={BuyIcon} />
                  Buy ORN
                </Typography>
                <Typography variant="caption" style={{ marginLeft: "8px" }}>
                  Coming soon
                </Typography>
              </Link>

              <Link
                component={NavLink}
                id="stake-nav"
                to="/sale"
                isActive={(match, location) => {
                  return checkPage(match, location, "stake");
                }}
                className="disable-link"
              >
                <Typography variant="h6">
                  <SvgIcon color="primary" component={StakeIcon} />
                  Stake
                </Typography>
                <Typography variant="caption" style={{ marginLeft: "8px" }}>
                  Coming soon
                </Typography>
              </Link>

              <Link
                component={NavLink}
                id="stake-nav"
                to="/sale"
                isActive={(match, location) => {
                  return checkPage(match, location, "stake");
                }}
                className="disable-link"
              >
                <Typography variant="h6">
                  <SvgIcon color="primary" component={Stake6Icon} />
                  Stake(6,6)
                </Typography>
                <Typography variant="caption" style={{ marginLeft: "8px" }}>
                  Coming soon
                </Typography>
              </Link>

              <Link
                component={NavLink}
                id="bond-nav"
                to="/sale"
                isActive={(match, location) => {
                  return checkPage(match, location, "bonds");
                }}
                className="disable-link"
              >
                <Typography variant="h6">
                  <SvgIcon color="primary" component={BondIcon} />
                  Bond
                </Typography>
                <Typography variant="caption" style={{ marginLeft: "8px" }}>
                  Coming soon
                </Typography>
              </Link>

              <Link
                component={NavLink}
                id="bond-nav"
                to="/sale"
                isActive={(match, location) => {
                  return checkPage(match, location, "bonds");
                }}
                className="disable-link"
              >
                <Typography variant="h6">
                  <SvgIcon color="primary" component={LendIcon} />
                  Lend(9,9)
                </Typography>
                <Typography variant="caption" style={{ marginLeft: "8px" }}>
                  Coming soon
                </Typography>
              </Link>
            </div>
          </div>
        </div>
        <Box className="dapp-menu-bottom" display="flex" justifyContent="space-between" flexDirection="column">
          <div className="dapp-menu-external-links">
            {externalUrls.map(({ url, icon, title, label }, i) => {
              return (
                <Link key={i} href={url} target="_blank" className="disable-link">
                  <Typography variant="h6">{icon}</Typography>
                  <Typography variant="h6">{title}</Typography>
                  {label ? (
                    <Typography variant="caption" style={{ marginLeft: "8px" }}>
                      {label}
                    </Typography>
                  ) : null}
                </Link>
              );
            })}
          </div>
          <div className="dapp-menu-social">
            <Social />
          </div>
        </Box>
      </Box>
    </Paper>
  );
}

export default NavContent;
