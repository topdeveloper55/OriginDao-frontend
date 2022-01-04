import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { Box, Button, Typography, Paper, Grid, InputBase, SvgIcon } from "@material-ui/core";
import LinearProgress from "@material-ui/core/LinearProgress";
import { styled } from "@material-ui/core/styles";
import { useAddress, useWeb3Context } from "src/hooks/web3Context";
import sale from "./sale.png";
import { abi as ornSale } from "../../abi/ORNSale.json";
import { abi as usdcABI } from "../../abi/USDC.json";
import { abi as ornABI } from "../../abi/ORN.json";
import { ReactComponent as InfoIcon } from "src/assets/icons/info.svg";
import ProgressBar from "./progressBar";

const ownerAddress = "0xb9e660505E8823F1c10Db4Be1D6D51953191234c";
const lbeAddress = "0x47233f6a9085223C564d17516cD508349A7bb573";
const usdcAddress = "0x04068da6c83afcfa0e13ba15a6696662335d5b75";
const ornAddress = "0x8c7ceFee41108fd2489360ed4b92623e2e0ad74b";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 15,
  borderRadius: 5,
  backgroundColor: "#555555",
}));

let timeInterval;

function ConnectMenu() {
  const { connect, disconnect, hasCachedProvider, provider, chainID, connected, uri } = useWeb3Context();
  const address = useAddress();
  const [isConnected, setConnected] = useState(connected);
  const [startStatus, setStartStatus] = useState(false);
  const [approveStatus, setApproveStatus] = useState(false);
  const [buyStatus, setBuyStatus] = useState(false);
  const [totalLeft, setTotalLeft] = useState(40000);
  const [soldout, setSoldoutStatus] = useState(false);
  const [value, setValue] = useState("");

  useEffect(() => {
    setConnected(connected);
  }, [connected]);

  const handleInputChange = event => {
    setValue(event.target.value === "" ? "" : Number(event.target.value));
  };

  const handleApprove = async () => {
    const usdcContract = new ethers.Contract(usdcAddress, usdcABI, provider.getSigner());
    if (value >= 300 && value <= 1000) {
      try {
        await usdcContract.approve(lbeAddress, value * 1000000);
        window.alert("approve success");
      } catch (err) {
        console.log("err:", err);
      }
    } else window.alert("You can only input 300-1000 USDC");
  };

  const handleBuy = async () => {
    const lbeContract = new ethers.Contract(lbeAddress, ornSale, provider.getSigner());
    try {
      await lbeContract.invest();
      window.alert("buy success");
    } catch (err) {
      console.log("err:", err);
    }
  };

  const handleStart = async () => {
    const lbeContract = new ethers.Contract(lbeAddress, ornSale, provider.getSigner());
    try {
      await lbeContract.setStart();
      window.alert("Presale started");
    } catch (err) {
      console.log("err:", err);
    }
  };

  const app = async () => {
    console.log("data fetch");
    const ornContract = new ethers.Contract(ornAddress, ornABI, provider.getSigner());
    const lbeContract = new ethers.Contract(lbeAddress, ornSale, provider.getSigner());
    const usdcContract = new ethers.Contract(usdcAddress, usdcABI, provider.getSigner());
    try {
      let left = await ornContract.balanceOf(lbeAddress);
      left = Number(left) / 1000000000;
      setTotalLeft(left);
      if (left < 30) {
        setApproveStatus(true);
        setBuyStatus(true);
        setSoldoutStatus(true);
      } else {
        setSoldoutStatus(false);
        let res = await lbeContract.getStatus();
        setStartStatus(res);
        if (!res) {
          console.log("status4");
          setApproveStatus(true);
          setBuyStatus(true);
        } else {
          res = await lbeContract.getInvestStatus(address);
          console.log("res:" + res);
          if (res) {
            console.log("status3");
            setApproveStatus(true);
            setBuyStatus(true);
          } else {
            res = await usdcContract.allowance(address, lbeAddress);
            if (Number(res) > 0) {
              console.log("status2");
              setApproveStatus(true);
              setBuyStatus(false);
            } else {
              console.log("status1");
              setApproveStatus(false);
              setBuyStatus(true);
            }
          }
        }
      }
    } catch (err) {
      console.log("error: ", err);
    }
  };

  useEffect(() => {
    if (connected) {
      if (timeInterval) {
        clearInterval(timeInterval);
        timeInterval = setInterval(() => {
          app();
        }, 1000);
      } else
        timeInterval = setInterval(() => {
          app();
        }, 1000);
    } else {
      setApproveStatus(true);
      setBuyStatus(true);
    }
  }, [connected, address]);

  useEffect(() => {
    return () => {
      if (timeInterval) clearInterval(timeInterval);
    };
  }, []);

  return (
    <>
      <Grid container justifyContent="center" alignItems="center">
        <Grid item xs={12} sm={10} style={{ textAlign: "center" }}>
          <Paper
            elevation={10}
            style={{ backgroundColor: "#252C47", borderTop: "3px solid yellow", paddingBottom: "50px" }}
          >
            <Box marginTop={5}>
              {address === ownerAddress && (
                <Box>
                  <Button
                    variant="contained"
                    color="success"
                    disabled={startStatus}
                    style={{
                      backgroundColor: startStatus ? "#dddddd" : "#111111",
                      borderRadius: "5px",
                      color: "white",
                      width: "150px",
                    }}
                    onClick={handleStart}
                  >
                    Start
                  </Button>
                </Box>
              )}

              {soldout && (
                <Typography style={{ color: "red" }} variant="h1">
                  Sold Out
                </Typography>
              )}
              <Box style={{ paddingRight: "100px", paddingLeft: "100px" }}>
                <img src={sale} alt="Sale" style={{ width: "100%" }}></img>
              </Box>
              <Box mt={5} style={{ paddingRight: "130px", paddingLeft: "130px" }}>
                <Box
                  mb={1}
                  style={{ width: "270px", backgroundColor: "#747450", borderRadius: "10px", margin: "auto" }}
                >
                  <Typography>
                    {40000-totalLeft}/40000 sold: {Number((40000-totalLeft) / 400)}%
                  </Typography>
                </Box>
                <ProgressBar completed={Number((40000-totalLeft) / 400)} text={`${Number((40000-totalLeft) / 400)}%`} />
              </Box>

              <Box mt={5} style={{ paddingRight: "100px", paddingLeft: "100px" }}>
                <Paper style={{ p: "", display: "flex", alignItems: "center", justifyContent: "stretch" }}>
                  <InputBase style={{ width: "100%", fontSize: "25px" }} value={value} onChange={handleInputChange} placeholder="Enter USDC amount" />
                  <Box display="flex" alignItems="center" style={{ width: "340px" }}>
                    <SvgIcon color="secondary" component={InfoIcon} />
                    <Typography style={{ color: "#aaaaaa", fontSize: "12px" }}>
                      Min: 300 USDC | Max: 1000USDC
                    </Typography>
                  </Box>
                </Paper>
                {/* <Input
                  style={{
                    border: "10px",
                    backgroundColor: "#323A58",
                    borderRadius: "5px",
                    fontSize: "40px",
                    height: "60px",
                  }}
                  value={value}
                  onChange={handleInputChange}
                /> */}
              </Box>
            </Box>
            <Box marginTop={5} display="flex" justifyContent="center">
              <Button
                variant="contained"
                color="success"
                disabled={approveStatus}
                style={{
                  backgroundColor: approveStatus ? "#dddddd" : "#c37210",
                  borderRadius: "5px",
                  color: "white",
                  width: "150px",
                  marginRight: "30px",
                }}
                onClick={handleApprove}
              >
                Approve USDC
              </Button>
              <Button
                variant="contained"
                color="success"
                disabled={buyStatus}
                style={{
                  backgroundColor: buyStatus ? "#dddddd" : "#c37210",
                  borderRadius: "5px",
                  color: "white",
                  width: "150px",
                }}
                onClick={handleBuy}
              >
                Buy
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}

export default ConnectMenu;
