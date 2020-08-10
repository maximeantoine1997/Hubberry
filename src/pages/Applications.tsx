import { Grid } from "@material-ui/core";
import { motion } from "framer-motion";
import React from "react";
import { pageTransition } from "../animations/Transition";

const Applications = () => {
  return (
    <motion.div exit="out" animate="in" initial="out" variants={pageTransition}>
      <Grid
        container
        justify="center"
        alignItems="center"
        style={{ width: "100vw", height: "100vh" }}
      >
        Applications Page
      </Grid>
    </motion.div>
  );
};

export default Applications;
