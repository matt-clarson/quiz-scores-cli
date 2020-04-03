import React, { useState } from "react";
import PropTypes, { InferProps } from "prop-types";
import PageContext from "./context";

const PagesProps = {
  children: PropTypes.node
};

const Pages = ({ children }: InferProps<typeof PagesProps>) => {
  const [page, setPage] = useState("");
  const [pageState, setPageState] = useState();
  return (
    <PageContext.Provider value={{ page, setPage, pageState, setPageState }}>
      {children}
    </PageContext.Provider>
  );
};

Pages.propTypes = PagesProps;

export default Pages;
