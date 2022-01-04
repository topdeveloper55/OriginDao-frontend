import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { abi as ornABI } from "../../abi/ORN.json";
import { useAddress, useWeb3Context } from "src/hooks/web3Context";
import { Box, Button, Typography, Paper, Grid, InputBase, SvgIcon, Link } from "@material-ui/core";
import { styled } from "@material-ui/core/styles";
import landTitle from "./landTitle.PNG";
import { ReactComponent as InfoIcon } from "src/assets/icons/info.svg";
import "./style.css";
import item1 from "./item1.png";
import item2 from "./item2.png";
import item3 from "./item3.png";
import item4 from "./item4.png";
import checkedPng from "./checked.png";

const ornAddress = "0x8c7ceFee41108fd2489360ed4b92623e2e0ad74b";
const ownerAddress = "0xb9e660505E8823F1c10Db4Be1D6D51953191234c";

let timeInterval;

function ConnectMenu() {
  const [selectedItem, setSelectedItem] = useState("");
  const [title, setTitle] = useState("");
  const [ornAmount, setOrnAmount] = useState(0);
  const { connect, disconnect, hasCachedProvider, provider, chainID, connected, uri } = useWeb3Context();
  const address = useAddress();
  const [pay, setPay] = useState(0);

  const handleInputChange = event => {
    if (event.target.value.length > 13) window.alert("The title length should be smaller than 14");
    else setTitle(event.target.value);
  };

  const handleCreate = async () => {
    if (title === "" || selectedItem === "") window.alert("Please enter the title and type of island");
    else {
      const ornContract = new ethers.Contract(ornAddress, ornABI, provider.getSigner());
      try {
        await ornContract.approve(ownerAddress, pay * 1000000000);
        window.alert("approve success");
      } catch (err) {
        console.log("transaction failed");
      }
    }
  };

  const app = async () => {
    const ornContract = new ethers.Contract(ornAddress, ornABI, provider.getSigner());
    try {
      let amount = Number(await ornContract.balanceOf(address))/1000000000.0;
      amount = amount.toFixed(4);
      setOrnAmount(amount);
    }
    catch(err) {
      console.err("token function call failed");
    }
  }

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
            style={{ borderTop: "3px solid yellow", paddingBottom: "30px" }}
            className="paper-container"
          >
            <Box marginTop={13}>
              <Typography variant="h6" style={{fontFamily: "cursive"}}>Your ORN: {ornAmount}</Typography>
            </Box>
            <Box marginTop={3}>
              <Typography variant="h6">Need more ORN tokens?</Typography>
              <Button
                variant="contained"
                color="success"
                style={{
                  backgroundColor: "#bbbbbb",
                  borderRadius: "16px",
                  color: "white",
                  width: "150px",
                  marginTop: "10px",
                }}
                disabled
                className="disable"
              >
                <span style={{ color: "white", fontSize: "12px" }}>Buy on spookyswap</span>
              </Button>
            </Box>
            <Box
              style={{ padding: "50px", paddingTop: "5px", paddingBottom: "5px" }}
              display="flex"
              justifyContent="space-around"
            >
              <Box
                style={{ position: "relative" }}
                onClick={() => {
                  setSelectedItem(0);
                  setPay(100);
                }}
              >
                <img src={item1} style={{ marginTop: "6px" }} className="land-item" alt="itme1" />
                {selectedItem === 0 && <img src={checkedPng} className="checked" />}
              </Box>
              <Box
                style={{ position: "relative" }}
                onClick={() => {
                  setSelectedItem(1);
                  setPay(70);
                }}
              >
                <img src={item2} className="land-item" alt="itme2" />
                {selectedItem === 1 && <img src={checkedPng} className="checked" />}
              </Box>
              <Box
                style={{ position: "relative" }}
                onClick={() => {
                  setSelectedItem(2);
                  setPay(50);
                }}
              >
                <img src={item3} className="land-item" alt="itme3" />
                {selectedItem === 2 && <img src={checkedPng} className="checked" />}
              </Box>
              <Box
                style={{ position: "relative" }}
                onClick={() => {
                  setSelectedItem(3);
                  setPay(30);
                }}
              >
                <img src={item4} className="land-item" alt="itme4" />
                {selectedItem === 3 && <img src={checkedPng} className="checked" />}
              </Box>
            </Box>
            <Box style={{ paddingLeft: "80px", paddingRight: "80px" }}>
              <Paper
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "stretch",
                  border: "2px solid #2999b1",
                }}
              >
                <InputBase
                  style={{ width: "100%", fontSize: "25px" }}
                  value={title}
                  onChange={handleInputChange}
                  placeholder="My island"
                />
                <Box display="flex" alignItems="center" style={{ width: "340px" }}>
                  <Typography style={{ color: "#aaaaaa", fontSize: "12px" }}>
                    Only letters and numbers (max 13)
                  </Typography>
                </Box>
              </Paper>
            </Box>
            <Box marginTop={2}>
              <Button
                variant="contained"
                color="success"
                style={{
                  backgroundColor: "#bbbbbb",
                  borderRadius: "16px",
                  color: "white",
                  width: "150px",
                  marginTop: "10px",
                }}
                onClick={handleCreate}
                disabled
                className="disable"
              >
                <span style={{ color: "white", fontSize: "12px" }}>Create</span>
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}

export default ConnectMenu;
