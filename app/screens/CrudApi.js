import React, { useState, useEffect, useCallback } from "react";
import methods from "../connect/index";

const deleteStory = async (id) => {
  var response = await methods.delete("blogs/" + id, {});
  //   alert("Successfully deleted");
};
export { deleteStory };
