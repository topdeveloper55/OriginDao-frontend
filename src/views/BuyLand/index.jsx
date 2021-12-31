import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { Box, Button, Typography, Paper, Grid, InputBase, SvgIcon } from "@material-ui/core";
import { styled } from "@material-ui/core/styles";
import landTitle from "./landTitle.PNG";
import { ReactComponent as InfoIcon } from "src/assets/icons/info.svg";
import "./style.css";
import item1 from "./item1.png";
import item2 from "./item2.png";
import item3 from "./item3.png";
import item4 from "./item4.png";

function ConnectMenu() {
  return (
    <>
      <Grid container justifyContent="center" alignItems="center">
        <Grid item xs={12} sm={10} style={{ textAlign: "center" }}>
          <Paper
            elevation={10}
            style={{ borderTop: "3px solid yellow", paddingBottom: "30px" }}
            className="paper-container"
          >
            <Box marginTop={15}>
              <Typography variant="h6">Need more ORN tokens?</Typography>
              <Button
                variant="contained"
                color="success"
                style={{
                  backgroundColor: "#dddddd",
                  borderRadius: "16px",
                  color: "white",
                  width: "150px",
                  marginTop: "10px",
                }}
              >
                <span style={{ color: "black", fontSize: "12px" }}>Buy on spookyswap</span>
              </Button>
            </Box>
            <Box
              style={{ padding: "50px", paddingTop: "5px", paddingBottom: "5px" }}
              display="flex"
              justifyContent="space-around"
            >
              <img src={item1} alt="itme1" />
              <img src={item2} alt="itme2" />
              <img src={item3} alt="itme3" />
              <img src={item4} alt="itme4" />
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
                <InputBase style={{ width: "100%", fontSize: "25px" }} placeholder="My island" />
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
                  backgroundColor: "#dddddd",
                  borderRadius: "16px",
                  color: "white",
                  width: "150px",
                  marginTop: "10px",
                }}
              >
                <span style={{ color: "black", fontSize: "12px" }}>Create</span>
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}

export default ConnectMenu;
