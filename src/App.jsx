import "./App.css";
import AutoComplete from "./AutoComplete";
import InfiniteScroll from "./InfiniteScroll";
import Shop from "./Shoppping/Shop";
import SelectCalling from "./Select/SelectCalling";
import Pagination from "./Pagination";
import FilesAndFolders from "./FileAndFolders";
import Folder from "./FileAndFolders/Folder";
import { useState } from "react";

import explorer from "./FileAndFolders/data.js";
import PaginationLive from "./PaginationLive";
import PromiseAll from "./PolyFills/PromiseAll";

const App = () => {
  return (
    <div className="App">
      <Pagination />
    </div>
  );
};

export default App;
