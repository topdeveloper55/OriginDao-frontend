import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { shorten, trim, prettyVestingPeriod } from "../../helpers";
import { redeemBond } from "../../slices/BondSlice";
import { info, error } from "../../slices/MessagesSlice";
import BondLogo from "../../components/BondLogo";
import { Box, Button, Link, Paper, Typography, TableRow, TableCell, SvgIcon, Slide } from "@material-ui/core";
import { ReactComponent as ArrowUp } from "../../assets/icons/arrow-up.svg";
import { NavLink } from "react-router-dom";
import "./choosebond.scss";
import { Skeleton } from "@material-ui/lab";
import { useWeb3Context, useBonds } from "src/hooks";
import { isPendingTxn, txnButtonTextGeneralPending } from "src/slices/PendingTxnsSlice";
import { hec_dai, mim4, usdc4, dai4 } from "src/helpers/AllBonds";

export function ClaimBondTableData({ userBond }) {
  const dispatch = useDispatch();
  let { bonds } = useBonds();
  bonds = bonds.concat([hec_dai, mim4, usdc4, dai4]);
  const { address, chainID, provider } = useWeb3Context();

  const bond = userBond[1];
  const bondName = bond.bond;
  let displayName = bond.displayName;
  const currentBlock = useSelector(state => {
    return state.app.currentBlock;
  });
  const vestingPeriod = () => {
    return prettyVestingPeriod(currentBlock, bond.bondMaturationBlock);
  };
  let className = "";
  let varientVal = "outlined";
  if (bond.isFour) {
    displayName += " (4, 4)";
    if (vestingPeriod() !== "Fully Vested") {
      varientVal = "contained";
      className = "claim-disable";
    }
  }
  const isAppLoading = useSelector(state => state.app.loading ?? true);

  const pendingTransactions = useSelector(state => {
    return state.pendingTransactions;
  });

  async function onRedeem({ autostake }) {
    let currentBond = bonds.find(bnd => bnd.name === bondName);
    if (currentBond.isFour && vestingPeriod() !== "Fully Vested") {
      dispatch(info("4,4 bonds can only be claimed after they are fully vested."));
    } else {
      await dispatch(redeemBond({ address, bond: currentBond, networkID: chainID, provider, autostake }));
    }
  }

  if(bond.displayName === "DAI") 
  return (
    <TableRow id={`${bondName}--claim`}>
      <TableCell align="left" className="bond-name-cell">
        <BondLogo bond={bond} />
        <div className="bond-name">
          <Typography variant="body1" style={{ fontSize: "16px" }}>
            {displayName ? trim(displayName, 4) : <Skeleton width={100} />}
          </Typography>
        </div>
      </TableCell>
      <TableCell align="center">
        {bond.pendingPayout ? trim(bond.pendingPayout, 4) : <Skeleton width={100} />}
      </TableCell>
      <TableCell align="center">{bond.interestDue ? trim(bond.interestDue, 4) : <Skeleton width={100} />}</TableCell>
      <TableCell align="right" style={{ whiteSpace: "nowrap" }}>
        {isAppLoading ? <Skeleton /> : vestingPeriod()}
      </TableCell>
      <TableCell align="right">
        <Button
          variant={varientVal}
          color="primary"
          className={className}
          disabled={isPendingTxn(pendingTransactions, "redeem_bond_" + bondName)}
          onClick={() => onRedeem({ autostake: false })}
        >
          <Typography variant="h6">
            {txnButtonTextGeneralPending(pendingTransactions, "redeem_bond_" + bondName, "Claim")}
          </Typography>
        </Button>
      </TableCell>
    </TableRow>
  );
  else return (<></>);
}

export function ClaimBondCardData({ userBond }) {
  const dispatch = useDispatch();
  let { bonds } = useBonds();
  bonds = bonds.concat([hec_dai, mim4, usdc4, dai4]);
  const { address, chainID, provider } = useWeb3Context();

  const bond = userBond[1];
  const bondName = bond.bond;

  const currentBlock = useSelector(state => {
    return state.app.currentBlock;
  });

  const pendingTransactions = useSelector(state => {
    return state.pendingTransactions;
  });
  let displayName = bond.displayName;
  let className = "";
  let varientVal = "outlined";
  const vestingPeriod = () => {
    return prettyVestingPeriod(currentBlock, bond.bondMaturationBlock);
  };
  if (bond.isFour) {
    displayName += " (4, 4)";
    if (vestingPeriod() !== "Fully Vested") {
      varientVal = "contained";
      className = "claim-disable";
    }
  }

  async function onRedeem({ autostake }) {
    let currentBond = bonds.find(bnd => bnd.name === bondName);
    if (currentBond.isFour && vestingPeriod() !== "Fully Vested") {
      dispatch(info("4,4 bonds can only be claimed after they are fully vested."));
    } else {
      await dispatch(redeemBond({ address, bond: currentBond, networkID: chainID, provider, autostake }));
    }
  }

  return (
    <Box id={`${bondName}--claim`} className="claim-bond-data-card bond-data-card" style={{ marginBottom: "30px" }}>
      <Box className="bond-pair">
        <BondLogo bond={bond} />
        <Box className="bond-name">
          <Typography>{bond.displayName ? trim(displayName, 4) : <Skeleton width={100} />}</Typography>
        </Box>
      </Box>

      <div className="data-row">
        <Typography>Claimable</Typography>
        <Typography>{bond.pendingPayout ? trim(bond.pendingPayout, 4) : <Skeleton width={100} />}</Typography>
      </div>

      <div className="data-row">
        <Typography>Pending</Typography>
        <Typography>{bond.interestDue ? trim(bond.interestDue, 4) : <Skeleton width={100} />}</Typography>
      </div>

      <div className="data-row" style={{ marginBottom: "20px" }}>
        <Typography>Fully Vested</Typography>
        <Typography>{vestingPeriod()}</Typography>
      </div>
      <Box display="flex" justifyContent="space-around" alignItems="center" className="claim-bond-card-buttons">
        <Button
          variant={varientVal}
          color="primary"
          className={className}
          disabled={isPendingTxn(pendingTransactions, "redeem_bond_" + bondName)}
          onClick={() => onRedeem({ autostake: false })}
        >
          <Typography variant="h5">
            {txnButtonTextGeneralPending(pendingTransactions, "redeem_bond_" + bondName, "Claim")}
          </Typography>
        </Button>
        {!bond.isFour && <Button variant="outlined" color="primary" onClick={() => onRedeem({ autostake: true })}>
          <Typography variant="h5">
            {txnButtonTextGeneralPending(
              pendingTransactions,
              "redeem_bond_" + bondName + "_autostake",
              "Claim and Stake",
            )}
          </Typography>
        </Button>}
      </Box>
    </Box>
  );
}
