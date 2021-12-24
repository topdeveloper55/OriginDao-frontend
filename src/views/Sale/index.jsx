import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { Box, Button, Typography, Paper, Divider, Link, Grid, Input } from "@material-ui/core";
import { useAddress, useWeb3Context } from "src/hooks/web3Context";
import logo from "./logo.png";
import title from "./title.png";
import { abi as vnoSale } from "../../abi/VNOSale.json";
import { abi as usdcABI } from "../../abi/DAI.json";
import { abi as ornABI } from "../../abi/ORN.json";
import { info } from "../../slices/MessagesSlice";

const ownerAddress = "0x93B95dBFB7FDb8AE6ADa17207b595c8598497a50";
const lbeAddress = "0xd5c15ea4f57d03f9Ca4f16C023267Dd29756Ae7f";
const usdcAddress = "0x0d9A547a61C09D82387F4a8d15597f214254D9F2";
const ornAddress = "0x03b3F3bF3c0DaFEFD698C9AE1aC81312e0B55E2a";

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
  const [value, setValue] = useState(50);

  useEffect(() => {
    setConnected(connected);
  }, [connected]);

  const handleInputChange = event => {
    setValue(event.target.value === "" ? "" : Number(event.target.value));
  };

  const handleApprove = async () => {
    const usdcContract = new ethers.Contract(usdcAddress, usdcABI, provider.getSigner());
    if(value >= 30 && value <= 100) {
      try {
        await usdcContract.approve(lbeAddress, value * 10 * 1000000);
        window.alert("approve success");
      } catch (err) {
        console.log("err:", err);
      }
    }
    else window.alert("You can only buy 30-100 tokens");
  };

  const handleBuy = async () => {
    const lbeContract = new ethers.Contract(lbeAddress, vnoSale, provider.getSigner());
    try {
      await lbeContract.invest();
      window.alert("buy success");
    } catch (err) {
      console.log("err:", err);
    }
  };

  const handleStart = async () => {
    const lbeContract = new ethers.Contract(lbeAddress, vnoSale, provider.getSigner());
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
    const lbeContract = new ethers.Contract(lbeAddress, vnoSale, provider.getSigner());
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
        }, 2000);
      } else
        timeInterval = setInterval(() => {
          app();
        }, 2000);
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
        <Grid item xs={12} sm={8} md={6} style={{ textAlign: "center" }}>
          <Box marginTop={1}>
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
            <Box mb={3}>
              <Typography variant="h1" style={{ color: "black", fontWeight: "bold", fontSize: "70px" }}>
                Origin DAO
              </Typography>
            </Box>
            <Box display="flex" justifyContent="space-around" mb={1}>
              <Typography variant="h3" style={{ color: "blue" }}>
                Total Left Amount:
              </Typography>
              <Typography variant="h3" style={{ color: "blue" }}>
                {totalLeft}
              </Typography>
            </Box>
            <Box display="flex" justifyContent="space-around" mb={3}>
              <Typography variant="h3" style={{ color: "blue" }}>
                Token Price:
              </Typography>
              <Typography variant="h3" style={{ color: "blue" }}>
                10USDC/token
              </Typography>
            </Box>
            <Box mb={5}>
              <Typography style={{ color: "blue" }}>Updates will be posted in the discord group</Typography>
            </Box>
            <Box>
              <Typography style={{ color: "red", marginBottom: "10px" }} variant="h4">
                You can only buy 30-100 tokens:
              </Typography>
              <Input
                style={{
                  border: "10px",
                  backgroundColor: "#11110f8c",
                  borderRadius: "5px",
                  fontSize: "40px",
                  width: "100px",
                  height: "60px",
                }}
                value={value}
                onChange={handleInputChange}
              />
            </Box>
          </Box>
          <Box marginTop={1} display="flex" justifyContent="space-around">
            <Button
              variant="contained"
              color="success"
              disabled={approveStatus}
              style={{
                backgroundColor: approveStatus ? "#dddddd" : "#1b1bc8",
                borderRadius: "5px",
                color: "white",
                width: "150px",
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
                backgroundColor: buyStatus ? "#dddddd" : "#1b1bc8",
                borderRadius: "5px",
                color: "white",
                width: "150px",
              }}
              onClick={handleBuy}
            >
              Buy
            </Button>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default ConnectMenu;
